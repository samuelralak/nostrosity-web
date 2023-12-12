"use client"

import {BackgroundImage} from "@/components/public/BackgroundImage";
import {Container} from "@/components/public/Container";
import {Button} from "@/components/public/Button";
import {useRouter} from "next/navigation";

export function Hero() {
    const router = useRouter()

    return (
        <div className="relative py-20 sm:pb-24 sm:pt-36">
            <BackgroundImage className="-bottom-14 -top-36"/>
            <Container className="relative">
                <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
                    <h1 className="font-display text-4xl font-bold tracking-tighter text-blue-600 sm:text-7xl mb-10">
                        A seamless NOSTR journey.
                    </h1>
                    <div className="mt-6 space-y-6 font-display text-2xl tracking-tight text-blue-900">
                        <p>
                            <span className="text-slate-900 font-bold">[Nostrosity]</span> offers a straightforward solution for users entering the NOSTR network. You receive a verified NIP05 identifier with an option for a custom domain, establishing a clear and personalized identity in the decentralized environment.
                        </p>
                        <p>
                            <span className="text-slate-900 font-bold">[Nostrosity]</span>’s integration of a Lightning wallet facilitates direct financial transactions, simplifying your active participation in the NOSTR ecosystem.
                        </p>
                        <p>
                            <span className="text-slate-900 font-bold">[Nostrosity]</span> includes a discovery page for exploring and reviewing NOSTR clients, fostering user knowledge and community interaction. It also enables easy management of your NOSTR profile and connected relays.
                        </p>
                        <p>
                            With the addition of email forwarding for NIP05 identifiers, <span className="text-slate-900 font-bold">[Nostrosity]</span> focuses on delivering a practical and user-friendly experience for anyone navigating the NOSTR network.
                        </p>
                    </div>
                    <Button onClick={() => router.push('/login')} className="mt-10 w-full sm:hidden">
                        Get started
                    </Button>
                </div>
            </Container>
        </div>
    )
}
