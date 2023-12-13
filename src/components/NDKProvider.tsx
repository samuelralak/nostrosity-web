"use client"

import NDK, {NDKEvent, NDKNip07Signer, NDKPrivateKeySigner, NDKSigner} from "@nostr-dev-kit/ndk";
import {createContext, ReactNode, useEffect, useRef, useState} from "react";
import Loader from "@/components/Loader";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {SessionState} from "@/store/reducers/session-reducer";
import secureLocalStorage from "react-secure-storage";
import constants from "@/constants";
import {AppSession} from "@/resources/session";

export interface NDKContext {
    ndkConnected: boolean,
    ndkInstance: () => NDK,
    setNDKSigner: (signer?: NDKSigner) => void,
    removeNDKSigner: () => void,
    publishEvent: (kind: number, content: Record<string, any> | string) => Promise<void>
}

export const NDKContext = createContext<NDKContext | null>(null)

const NDKProvider = ({children}: { children: ReactNode }) => {
    const session = useSelector((state: RootState) => state.session) as SessionState
    const ndk = useRef<NDK | undefined>()
    const [ndkConnected, setNDKConnected] = useState<boolean>(false)

    const connectNDK = async () => {
        try {
            ndk.current = new NDK({explicitRelayUrls: ['wss://nos.lol', 'wss://nostr.688.org']});
            ndk.current.connect(3000)
            setNDKConnected(true)
        } catch (e) {
            setNDKConnected(false)
        }
    }

    const publishEvent = async (kind: number, content: Record<string, any> | string) => {
        const ndkEvent = new NDKEvent(ndk.current)
        ndkEvent.kind = kind
        ndkEvent.content = typeof content === 'object' ? JSON.stringify(content) : content
        await ndkEvent.publish()
    }

    const ndkInstance = (): NDK => ndk.current!
    const removeNDKSigner = () => setNDKSigner(undefined)

    const setNDKSigner = (signer?: NDKSigner | undefined) => {
        if (signer) {
            ndk.current!.signer = signer
        } else {
            switch (session.signerMethod) {
                case "nip07":
                    const nipO7Singer = new NDKNip07Signer(3000)
                    setNDKSigner(nipO7Singer)
                    break;
                case "nip46":
                    // TODO: Handle nip46 signer here
                    break;
                case "privateKey":
                    const fromStorage = secureLocalStorage.getItem(constants.STORAGE_KEY) as AppSession
                    const privateKeySigner = new NDKPrivateKeySigner(fromStorage.privateKeys?.privkey!)
                    setNDKSigner(privateKeySigner)
                    break;
                default:
                    ndk.current!.signer = undefined
            }
        }
    }

    useEffect(() => {
        connectNDK().catch(console.error)
    }, [])

    if (!ndkConnected) {
        return <Loader loadingText={'Connecting'}/>
    }

    return (
        <NDKContext.Provider value={{ndkConnected, ndkInstance, setNDKSigner, removeNDKSigner, publishEvent}}>
            {children}
        </NDKContext.Provider>
    )
}

export default NDKProvider
