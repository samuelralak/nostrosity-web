"use client"

import {useRouter, useSearchParams} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store";
import {accessTokenReceived, SessionState} from "@/store/reducers/session-reducer";
import {useEffect} from "react";
import {useCreateAccessTokenMutation} from "@/api/base";
import secureLocalStorage from "react-secure-storage";
import constants from "@/constants";
import Loader from "@/components/Loader";
import {AppSession} from "@/resources/session";

const Page = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const dispatch = useDispatch() as AppDispatch
    const session = useSelector((state: RootState) => state.session) as SessionState
    const [createAccessToken] = useCreateAccessTokenMutation()
    const code = searchParams.get('code')

    useEffect(() => {
        if (!session.isLoggedIn && (code && session.codeVerifier)) {
            (async () => {
                const response = await createAccessToken({code, codeVerifier: session.codeVerifier!})

                if (('data' in response)) {
                    const tokenResponse = response.data
                    const fromStorage = secureLocalStorage.getItem(constants.STORAGE_KEY) as AppSession
                    await secureLocalStorage.setItem(constants.STORAGE_KEY, {
                        ...fromStorage, ...{
                            user: {...session, isLoggedIn: true},
                            token: {
                                accessToken: tokenResponse.access_token,
                                tokenType: tokenResponse.token_type,
                                expiresIn: tokenResponse.expires_in,
                                refreshToken: tokenResponse.refresh_token,
                            }
                        }
                    })

                    const timeout = setTimeout(() => {
                        dispatch(accessTokenReceived())
                        router.replace('/general')
                        clearTimeout(timeout)
                    }, 1000)
                }
            })()
        } else {
            router.replace('/login')
        }
    }, [code, session.codeVerifier, session.isLoggedIn])

    return <Loader loadingText={'Authorizing'}/>
}

export default Page
