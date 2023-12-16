"use client"

import {DocumentDuplicateIcon} from "@heroicons/react/24/outline";
import ProfileSection from "@/components/private/general/ProfileSection";
import SectionContainer from "@/components/private/general/SectionContainer";
import IdentifierSection from "@/components/private/general/IdentifierSection";
import {Suspense} from "react";

const Page = () => {
    return (
        <div className="flex flex-col gap-y-16">
            <ProfileSection/>
            <IdentifierSection />

            <SectionContainer title={'Personal relays'} subtitle={'Connect bank accounts to your account.'}>
                <ul role="list" className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                    <li className="flex justify-between gap-x-6 py-6">
                        <div className="font-medium text-slate-900">sam@nostrosity.com</div>
                        <button type="button" className="font-semibold text-blue-600 hover:text-blue-500">
                            <DocumentDuplicateIcon className="h-5 w-5"/>
                        </button>
                    </li>
                    <li className="flex justify-between gap-x-6 py-6">
                        <div className="font-medium text-slate-900">ralak@nostrosity.com</div>
                        <button type="button" className="font-semibold text-blue-600 hover:text-blue-500">
                            <DocumentDuplicateIcon className="h-5 w-5"/>
                        </button>
                    </li>
                </ul>

                <div className="flex border-t border-gray-100 pt-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-500">
                        <span aria-hidden="true">+</span> Add a relay
                    </button>
                </div>
            </SectionContainer>
        </div>
    )
}

export default Page
