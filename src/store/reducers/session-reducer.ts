import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import constants from "@/constants";
import secureLocalStorage from "react-secure-storage";
import {AppSession} from "@/resources/session";

export interface SessionState {
    id?: string;
    pubkey?: string;
    npub?: string;
    signerMethod?: "nip07" | "nip46" | "privateKey";
    isLoggedIn: boolean;
    codeVerifier?: string;
}

const initialState: SessionState = {
    isLoggedIn: false
}

export const preloadSession = () => {
    const {user} = (secureLocalStorage.getItem(constants.STORAGE_KEY) || {}) as AppSession
    return {...initialState, ...user} as SessionState
}

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        signerMethodReceived: (state, {payload}: PayloadAction<{
            signerMethod: "nip07" | "nip46" | "privateKey",
            pubkey: string,
            npub: string
        }>) => {
            state.signerMethod = payload.signerMethod
            state.pubkey = payload.pubkey
            state.npub = payload.npub
        },
        authorizationCodeReceived: (state, {payload}: PayloadAction<string>) => {
            state.codeVerifier = payload
        },
        accessTokenReceived: (state) => {
            state.isLoggedIn = true
            state.codeVerifier = undefined
        },
        userIdReceived: (state, {payload: userId}: PayloadAction<string>) => {
            state.id = userId
        },
        userSignedOut: (_) => initialState,
        accessTokenRevoked: (_) => initialState
    }
})

export const {
    signerMethodReceived,
    authorizationCodeReceived,
    accessTokenReceived,
    userIdReceived,
    userSignedOut,
    accessTokenRevoked
} = sessionSlice.actions
export default sessionSlice.reducer


