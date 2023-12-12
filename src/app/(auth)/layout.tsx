"use client"

import {ReactNode, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store";
import {SessionState} from "@/store/reducers/session-reducer";
import {useRouter, useSearchParams} from "next/navigation";

const Layout = ({ children }: {children: ReactNode}) => {
    const router = useRouter()
    const dispatch = useDispatch() as AppDispatch
    const session = useSelector((state: RootState) => state.session) as SessionState

    useEffect(() => {
        if (session.isLoggedIn) {
            router.replace('/general')
        }
    }, [session.isLoggedIn])

    return (
        <div className="h-full bg-blue-50">
            {children}
        </div>
    )
}

export default Layout
