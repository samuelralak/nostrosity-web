import {createListenerMiddleware, isAnyOf} from "@reduxjs/toolkit";
import {RootState} from "@/store";
import secureLocalStorage from "react-secure-storage";
import constants from "@/constants";
import {
    accessTokenReceived,
    accessTokenRevoked,
    signerMethodReceived,
    userIdReceived, userSignedOut
} from "@/store/reducers/session-reducer";
import {AppSession} from "@/resources/session";
import {fetchBasicAuthToken} from "@/components/AuthProvider";

export const sessionListenerMiddleware = createListenerMiddleware()

sessionListenerMiddleware.startListening({
    matcher: isAnyOf(signerMethodReceived, accessTokenReceived, userIdReceived, userSignedOut, accessTokenRevoked),
    effect: async (action, listenerApi) => {
        const actionTypes = [signerMethodReceived, accessTokenReceived, userIdReceived].map((action) => action.type)
        const sessionFromStorage = secureLocalStorage.getItem(constants.STORAGE_KEY) as AppSession

        if (actionTypes.includes(action.type)) {
            const {session} = listenerApi.getState() as RootState
            await secureLocalStorage.setItem(constants.STORAGE_KEY, {
                ...sessionFromStorage, ...{user: session}
            })
        }

        // if (action.type === userSignedOut.type) {
        //     await secureLocalStorage.removeItem(constants.STORAGE_KEY)
        //     await fetchBasicAuthToken()
        // }
    },
})
