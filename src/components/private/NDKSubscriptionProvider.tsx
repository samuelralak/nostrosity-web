"use client"

import {createContext, ReactNode, useContext, useEffect, useRef} from "react";
import {NDKSubscription, NDKUserProfile} from "@nostr-dev-kit/ndk";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store";
import {SessionState, updateProfile} from "@/store/reducers/session-reducer";
import {NDKContext} from "@/components/NDKProvider";

export const NDKSubscriptionContext = createContext<{} | null>(null)

const NDKSubscriptionProvider = ({children}: { children: ReactNode }) => {
    const currentSession = useSelector((state: RootState) => state.session) as SessionState
    const {ndkInstance, setNDKSigner, publishEvent} = useContext(NDKContext) as NDKContext
    const ndkSubscription = useRef<NDKSubscription>()
    const dispatch = useDispatch<AppDispatch>()

    const subscribe = async () => {
        ndkSubscription.current = await ndkInstance().subscribe({kinds: [0], authors: [currentSession.pubkey!]})

        ndkSubscription.current.on("event", (event) => {
            switch (event.kind) {
                case 0:
                    const ndkProfile = JSON.parse(event.content) as NDKUserProfile
                    dispatch(updateProfile(ndkProfile))
                    break;
                default:
                // TODO: Handle unsupported kinds
            }
        });

        ndkSubscription.current?.start()
    }

    useEffect(() => {
        (async () => subscribe())()
        return () => ndkSubscription.current?.stop()
    }, [])

    return (
        <NDKSubscriptionContext.Provider value={{}}>
            {children}
        </NDKSubscriptionContext.Provider>
    )
}

export default NDKSubscriptionProvider
