"use client"

import {useRouter, useSearchParams} from "next/navigation";
import {useContext, useEffect, useState} from "react";
import {NDKContext} from "@/components/NDKProvider";
import {NDKUserProfile} from "@nostr-dev-kit/ndk";

const Page = () => {
    const {ndkInstance} = useContext(NDKContext) as NDKContext
    const [ndkProfile, setNDKProfile] = useState<NDKUserProfile>()
    const searchParams = useSearchParams()
    const router = useRouter()
    const pubkey = searchParams.get('key')
    const status = searchParams.get('status')

    useEffect(() => {
        if (pubkey && status) {
            (async () => {
                const user = ndkInstance().getUser({pubkey})
                await user.fetchProfile()
                setNDKProfile(user.profile)
            })()
        } else {
            router.replace('/login')
        }
    }, [])

    console.log({ndkProfile})

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="flex flex-1 flex-col p-8 justify-center">
                        {ndkProfile?.image ?
                            (
                                <img className="mx-auto h-32 w-32 flex-shrink-0 rounded-full object-cover"
                                     src={ndkProfile?.image}
                                     alt=""/>
                            ) : (
                                <span
                                    className="mx-auto inline-flex h-32 w-32 items-center justify-center rounded-full bg-gray-500"
                                >
                                    <span className="text-5xl font-medium leading-none text-white">
                                        {ndkProfile?.displayName?.slice(0, 2).toUpperCase()}
                                    </span>
                                </span>
                            )}

                        <h3 className="mt-6 text-sm font-medium text-gray-900 text-center">{ndkProfile?.displayName}</h3>
                        <dl className="mt-1 flex flex-grow flex-col justify-between mx-auto">
                            <dt className="sr-only">Title</dt>
                            <dd className="text-sm text-gray-500">
                                {ndkProfile?.nip05 ? (
                                    <>
                                        <span className="line-through">{ndkProfile?.nip05}</span>&nbsp;{ndkProfile?.name}@nostrosity.com
                                    </>
                                    ) : `${ndkProfile?.name}@nostrosity.com`}
                            </dd>
                        </dl>
                    </div>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <form className="space-y-6" action="#" method="POST">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Create password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="password"
                                        type="password"
                                        required
                                        placeholder="Type in a new password..."
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full cursor-pointer justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Confirm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page
