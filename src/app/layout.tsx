import type {Metadata} from 'next'
import {Poppins} from 'next/font/google'
import './globals.css'
import {ReactNode} from "react";
import NDKProvider from "@/components/NDKProvider";
import StoreProvider from "@/components/StoreProvider";
import AuthProvider from "@/components/AuthProvider";

const poppins = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    display: 'swap',
    subsets: ['latin-ext']
})

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

const RootLayout = ({children}: { children: ReactNode }) => {
    return (
        <html lang="en" className="h-full">
        <body className={`${poppins.className} h-full`}>
        <AuthProvider>
            <StoreProvider>
                <NDKProvider>
                    {children}
                </NDKProvider>
            </StoreProvider>
        </AuthProvider>
        </body>
        </html>
    )
}

export default RootLayout
