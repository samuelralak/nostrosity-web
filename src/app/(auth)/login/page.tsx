"use client"

import {KeyIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/navigation";
import {NDKNip07Signer, NDKPrivateKeySigner} from "@nostr-dev-kit/ndk";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store";
import {signerMethodReceived} from "@/store/reducers/session-reducer";
import {decodeNsec, generateCodeVerifier, validatePrivateKey} from "@/utils";
import sha256 from "crypto-js/sha256";
import Base64url from "crypto-js/enc-base64url"
import {FormEvent, useState} from "react";
import secureLocalStorage from "react-secure-storage";
import constants from "@/constants";
import {AppSession} from "@/resources/session";
import {nip19} from "nostr-tools";

const codeVerifier = generateCodeVerifier()
const codeChallenge = Base64url.stringify(sha256(codeVerifier))

const Page = () => {
    const dispatch = useDispatch() as AppDispatch
    const router = useRouter()
    const [privateKey, setPrivateKey] = useState<string>('')
    const fromStorage = secureLocalStorage.getItem(constants.STORAGE_KEY) as AppSession

    const onLogin = () => router.push('/general')

    const onPrivateKeyInput = (event: FormEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        setPrivateKey(target.value)
    }

    const _dispatchSignerAndProceed = (pubkey: string, npub: string, signerMethod: "nip07" | "nip46" | "privateKey") => {
        dispatch(signerMethodReceived({pubkey, npub, signerMethod}))
        router.push(`/password?codeChallenge=${codeChallenge}&codeVerifier=${codeVerifier}`)
    }

    const continueWithPrivateKey = async () => {
        const privateKeyType = validatePrivateKey(privateKey!)

        if (privateKey) {
            const decodedKey = privateKeyType === 'nsec' ? decodeNsec(privateKey as `nsec1${string}`) : privateKey
            const signer = new NDKPrivateKeySigner(decodedKey)
            const ndkUser = await signer.user()
            fromStorage.privateKeys = {privkey: decodedKey, nsec: nip19.nsecEncode(decodedKey)}

            await secureLocalStorage.setItem(constants.STORAGE_KEY, fromStorage)
            _dispatchSignerAndProceed(ndkUser.pubkey, ndkUser.npub, "privateKey")
        } else {
            // TODO: Trigger error notification with human message
        }
    }

    const continueWithNIP07Extension = async () => {
        try {
            const nip07signer = new NDKNip07Signer(3000);
            const ndkUser = await nip07signer.user()
            _dispatchSignerAndProceed(ndkUser.pubkey, ndkUser.npub, "nip07")
        } catch (e) {
            console.log({e})
            // TODO: Trigger error notification with human message
        }
    }

    return (
        <>

            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-slate-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-900">
                                    Private key
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="privateKey"
                                        name="privateKey"
                                        placeholder="hex or nsec format..."
                                        required
                                        className="block w-full rounded-lg bg-slate-50 focus:bg-white border-0 py-3.5 text-slate-900 text-sm ring-2 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                        onInput={onPrivateKeyInput}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    onClick={continueWithPrivateKey}
                                    className="flex w-full cursor-pointer justify-center rounded-lg bg-blue-600 px-3 py-3.5 text-sm font-semibold leading-6 text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>

                        <div>
                            <div className="relative mt-10">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-200"/>
                                </div>
                                <div className="relative flex justify-center text-sm font-medium leading-6">
                                    <span className="bg-white px-6 text-slate-900">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <a
                                    onClick={continueWithNIP07Extension}
                                    className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-[#24292F] px-3 py-3.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
                                >
                                    <KeyIcon className="h-5 w-5"/>
                                    <span className="text-sm font-semibold leading-6">
                                        NIP-07 Extension
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <p className="mt-10 text-center text-sm text-slate-500">
                        Not registered?{' '}
                        <a onClick={onLogin} className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                            Create a Nostr account
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Page
