"use client"

import {useRouter, useSearchParams} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store";
import {accessTokenReceived, SessionState} from "@/store/reducers/session-reducer";
import {useEffect} from "react";
import {useCreateAccessTokenMutation} from "@/api/base";
import secureLocalStorage from "react-secure-storage";
import constants from "@/constants";

const Page = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const dispatch = useDispatch() as AppDispatch
    const session = useSelector((state: RootState) => state.session) as SessionState
    const [createAccessToken] = useCreateAccessTokenMutation()
    const code = searchParams.get('code')

    useEffect(() => {
        if (!code || !session.codeVerifier) {
            router.replace('/login')
        } else {
            (async () => {
                const response = await createAccessToken({code, codeVerifier: session.codeVerifier!})

                if (('data' in response)) {
                    const tokenResponse = response.data
                    await secureLocalStorage.setItem(constants.STORAGE_KEY, {
                        user: {...session, isLoggedIn: true},
                        token: {
                            accessToken: tokenResponse.access_token,
                            tokenType: tokenResponse.token_type,
                            expiresIn: tokenResponse.expires_in,
                            refreshToken: tokenResponse.refresh_token,
                        }
                    })

                    dispatch(accessTokenReceived())
                    router.replace('/general')
                }
            })()
        }
    }, [])

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px] flex justify-center items-center gap-2">
                <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center">
                    <div className="py-2 px-5 rounded-lg flex items-center flex-col">
                        <div className="loader-dots block relative w-20 h-5 mt-2">
                            <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"></div>
                            <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"></div>
                            <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"></div>
                            <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"></div>
                        </div>
                        <div className="text-slate-500 mt-2 text-center">
                            Authorizing...
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
