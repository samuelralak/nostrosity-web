"use client"

import {createContext, ReactNode, startTransition, useEffect} from "react";
import {basicAuthToken} from "@/server/actions";
import constants from "@/constants";
import secureLocalStorage from "react-secure-storage";
import {AppSession} from "@/resources/session";

const fetchBasicAuthToken = () => startTransition(() => {
    (async () => {
        const [token, success] = await basicAuthToken(constants.CLIENT_ID)

        if (success) {
            const session: AppSession = {token: {tokenType: 'Basic', accessToken: token!}}
            await secureLocalStorage.setItem(constants.STORAGE_KEY, session)
        }
    })()
})

export const AuthContext = createContext<{} | null>(null)

const AuthProvider = ({children}: { children: ReactNode }) => {
    useEffect(() => {
        (() => {
            const sessionFromStorage = secureLocalStorage.getItem(constants.STORAGE_KEY) as AppSession

            if (!sessionFromStorage?.token) {
                fetchBasicAuthToken()
            }
        })()
    }, [])

    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
