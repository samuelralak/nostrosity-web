"use client"

import ProfileSection from "@/components/private/general/ProfileSection";
import IdentifierSection from "@/components/private/general/IdentifierSection";

const Page = () => {
    return (
        <div className="flex flex-col gap-y-16">
            <ProfileSection/>
            <IdentifierSection/>
        </div>
    )
}

export default Page
