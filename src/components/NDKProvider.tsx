"use client"

import NDK, {NDKEvent, NDKSigner} from "@nostr-dev-kit/ndk";
import {createContext, ReactNode, useEffect, useRef, useState} from "react";
import {WifiIcon} from "@heroicons/react/24/outline";

export interface NDKContext {
    ndkConnected: boolean,
    ndkInstance: () => NDK,
    setNDKSigner: (signer: NDKSigner) => void,
    removeNDKSigner: () => void,
    publishEvent: (kind: number, content: Record<string, any> | string) => Promise<void>
}

export const NDKContext = createContext<NDKContext | null>(null)

const NDKProvider = ({children}: { children: ReactNode }) => {
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
    const setNDKSigner = (signer: NDKSigner | undefined) => ndk.current!.signer = signer
    const removeNDKSigner = () => setNDKSigner(undefined)


    useEffect(() => {
        connectNDK().catch(console.error)
    }, [])

    if (!ndkConnected) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <div className="flex justify-center items-center space-x-1 text-sm text-slate-700">
                    <WifiIcon className="animate-ping h-12 w-12 text-slate-500"/>
                </div>
            </div>
        )
    }

    return (
        <NDKContext.Provider value={{ndkConnected, ndkInstance, setNDKSigner, removeNDKSigner, publishEvent}}>
            {children}
        </NDKContext.Provider>
    )
}

export default NDKProvider
