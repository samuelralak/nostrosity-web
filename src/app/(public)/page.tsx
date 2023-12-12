"use client"

import {
    BellIcon,
    CreditCardIcon,
    CubeIcon,
    FingerPrintIcon,
    UserCircleIcon,
    UsersIcon,
} from '@heroicons/react/24/outline'
import {Hero} from "@/components/public/Hero";
import {Speakers} from "@/components/public/Speakers";
import {Schedule} from "@/components/public/Schedule";
import {Sponsors} from "@/components/public/Sponsors";
import {Newsletter} from "@/components/public/Newsletter";

const navigation = []
const secondaryNavigation = [
    {name: 'General', href: '#', icon: UserCircleIcon, current: true},
    {name: 'Security', href: '#', icon: FingerPrintIcon, current: false},
    {name: 'Notifications', href: '#', icon: BellIcon, current: false},
    {name: 'Plan', href: '#', icon: CubeIcon, current: false},
    {name: 'Billing', href: '#', icon: CreditCardIcon, current: false},
    {name: 'Team members', href: '#', icon: UsersIcon, current: false},
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Page() {


    return (
        <>
            <Hero/>
        </>
    )
}
