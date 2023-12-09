import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BaseQueryApi} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import constants from "@/constants";
import secureLocalStorage from "react-secure-storage";
import {AppSession} from "@/resources/session";
import {Mutex} from "async-mutex";
import {Token} from "@/resources/token";

const mutex = new Mutex()

const tokenRequest = (tokenData: Token) => {
    const request = {
        url: '/oauth/token',
        method: 'POST',
        body: {
            grant_type: 'client_credentials',
            scope: 'app'
        }
    }

    if (tokenData.refreshToken) {
        return {
            ...request,
            ...{
                ...request.body,
                refresh_token: tokenData.refreshToken,
                grant_type: 'refresh_token',
                scope: 'user'
            }
        }
    }

    return request
}

const prepareHeaders = (headers: Headers, _queryApi: Pick<BaseQueryApi, 'getState' | 'extra' | 'endpoint' | 'type' | 'forced'>) => {
    const session = <AppSession>secureLocalStorage.getItem(constants.STORAGE_KEY)
    const {tokenType, accessToken} = session.token!

    headers.set('Authorization', `${tokenType} ${accessToken}`)
    headers.set('Accept', `application/json`)
    headers.set('Content-Type', `application/json`)
    return headers
}

const baseQuery = fetchBaseQuery({
    baseUrl: constants.API_BASE_URL,
    prepareHeaders
})

// @ts-ignore
const baseQueryWithReauth = async (args, api, extraOptions) => {
    await mutex.waitForUnlock()

    const session = <AppSession>secureLocalStorage.getItem(constants.STORAGE_KEY)
    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()

            try {
                const requestAccessToken = await baseQuery(tokenRequest(session.token!), api, extraOptions)

                if (requestAccessToken.data) {
                    const tokenResponse = <{
                        access_token: string,
                        token_type: string,
                        expires_in: number;
                        refresh_token: string
                    }>requestAccessToken.data

                    await secureLocalStorage.setItem(constants.STORAGE_KEY, {
                        ...session, ...{
                            token: {
                                ...session.token,
                                accessToken: tokenResponse.access_token,
                                tokenType: tokenResponse.token_type,
                                expiresIn: tokenResponse.expires_in,
                                refreshToken: tokenResponse.refresh_token,
                            }
                        }
                    })

                    result = await baseQuery(args, api, extraOptions)
                } else {
                    secureLocalStorage.removeItem(constants.STORAGE_KEY)
                }
            } finally {
                // release must be called once the mutex should be released again.
                release()
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
    }
    return result
}

const baseApi = createApi({
    reducerPath: 'baseApi',
    tagTypes: ['User', 'Identifier'],
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({}),
})

export default baseApi
