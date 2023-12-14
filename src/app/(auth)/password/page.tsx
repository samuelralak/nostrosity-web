"use client"

import {useCreateUserMutation, useQueryUserQuery, useSigInUserMutation} from "@/api/user";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store";
import {authorizationCodeReceived, SessionState, userIdReceived} from "@/store/reducers/session-reducer";
import {ReactNode, useContext, useEffect, useState} from "react";
import {QueryStatus} from "@reduxjs/toolkit/query";
import {useRouter, useSearchParams} from "next/navigation";
import {NDKUserProfile} from "@nostr-dev-kit/ndk";
import {NDKContext} from "@/components/NDKProvider";
import {UserPayload} from "@/resources/user";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {PasswordSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import AlertModal from "@/components/AlertModal";
import {useCreateAuthorizationCodeMutation} from "@/api/base";
import {fetchBasicAuthToken} from "@/components/AuthProvider";
import Loader from "@/components/Loader";

const Page = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const dispatch = useDispatch() as AppDispatch
    const currentSession = useSelector((state: RootState) => state.session) as SessionState
    const {data: userExists, isLoading, status} = useQueryUserQuery(currentSession.pubkey!)
    const [createAuthorizationCode] = useCreateAuthorizationCodeMutation()
    const {ndkInstance, setNDKSigner, publishEvent} = useContext(NDKContext) as NDKContext
    const [ndkProfile, setNDKProfile] = useState<NDKUserProfile>()
    const [openAlert, setOpenAlert] = useState<boolean>(false)
    const [userPayload, setUserPayload] = useState<UserPayload | null>()
    const [createUser] = useCreateUserMutation()
    const [signInUser] = useSigInUserMutation()
    const {
        register,
        handleSubmit,
        formState: {errors, isDirty, isValid, isSubmitting}
    } = useForm({resolver: zodResolver(PasswordSchema)})

    const onPasswordSubmit: SubmitHandler<FieldValues> = async ({password}) => {
        const user = ndkInstance().getUser({pubkey: currentSession.pubkey!})
        const identifierName = ndkProfile?.name?.toLowerCase()!
        const payload = {
            user: {
                password,
                npub: user.npub,
                pubkey: user.pubkey,
                identifiers_attributes: [{name: identifierName}]
            }
        }

        if (ndkProfile?.nip05 === `${identifierName}@nostrosity.com`) {
            await onCreateUser(false, payload)
        } else {
            setUserPayload(payload)
            setOpenAlert(true)
        }
    }

    const onCreateUser = async (changeNip05 = false, payload: UserPayload | undefined = undefined) => {
        (payload ?? userPayload)!.user.identifiers_attributes[0].default = changeNip05!
        const params = (payload ?? userPayload)!
        const pubkey = params.user.pubkey!
        const password = params.user.password!
        const response = userExists ? await signInUser({pubkey, password}) : await createUser(params)

        if (('data' in response)) {
            dispatch(userIdReceived(response.data.id))
            await fetchBasicAuthToken()
            const codeChallenge = searchParams.get('codeChallenge')
            const codeVerifier = searchParams.get('codeVerifier')
            const authData = await createAuthorizationCode({codeChallenge, userId: response.data.id})

            if (('data' in authData)) {
                if (changeNip05) {
                    setNDKSigner()
                    const nip05 = params.user.identifiers_attributes[0].name + '@nostrosity.com'
                    await publishEvent(0, {...ndkProfile, ...{nip05}})
                }

                setOpenAlert(false)
                dispatch(authorizationCodeReceived(codeVerifier!))
                router.push(authData.data.redirect_uri, {absolute: true})
            }
        }
    }

    useEffect(() => {
        if (!isLoading && status === QueryStatus.fulfilled) {
            if (!currentSession.pubkey) {
                router.replace('/login')
            } else {
                (async () => {
                    const user = ndkInstance().getUser({pubkey: currentSession.pubkey})
                    await user.fetchProfile()
                    setNDKProfile(user.profile)
                })()
            }
        }
    }, [isLoading, status])

    if (isLoading) {
        return <Loader/>
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="flex flex-1 flex-col p-8 justify-center">
                        {ndkProfile?.image ?
                            (
                                <img
                                    className="mx-auto h-32 w-32 flex-shrink-0 rounded-full object-cover ring-2 ring-slate-300"
                                    src={ndkProfile?.image}
                                    alt="image"
                                />
                            ) : (
                                <span
                                    className="mx-auto inline-flex h-32 w-32 items-center justify-center rounded-full bg-gray-500"
                                >
                                    <span className="text-5xl font-medium leading-none text-white">
                                        {ndkProfile?.displayName?.slice(0, 2).toUpperCase()}
                                    </span>
                                </span>
                            )}

                        <h3 className="mt-6 text-sm font-medium text-slate-900 text-center">{ndkProfile?.displayName}</h3>
                        <dl className="mt-1 flex flex-grow flex-col justify-between mx-auto">
                            <dd className="text-sm text-slate-500 text-center">
                                {ndkProfile?.nip05}

                                {(ndkProfile?.nip05 !== `${ndkProfile?.name}@nostrosity.com`) && (
                                    <p className={'text-center mt-2'}>
                                        <span
                                            className="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                            {ndkProfile?.name}@nostrosity.com
                                        </span>
                                    </p>
                                )}
                            </dd>
                        </dl>
                    </div>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-900">
                                    {userExists ? 'Enter' : 'Create'} password
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...register('password')}
                                        type="password"
                                        placeholder={`Type in ${userExists ? 'your' : 'a new'} password...`}
                                        className="block w-full rounded-lg bg-slate-50 focus:bg-white border-0 py-3.5 text-slate-900 text-sm ring-2 ring-inset ring-gray-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.password && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.password.message as ReactNode}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <button
                                    type="button"
                                    onClick={handleSubmit(onPasswordSubmit)}
                                    className="flex w-full cursor-pointer justify-center rounded-lg bg-blue-600 px-3 py-3.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    {userExists ? 'Sign in' : 'Confirm'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AlertModal title={"Change NIP-05 identifier"}
                        confirm={() => onCreateUser(true)}
                        dismiss={() => onCreateUser()}
                        dismissButtonText={'Not now'}
                        open={openAlert}
            >
                <p className="text-sm text-slate-500">
                    Would you like to set your default NIP-05 identifier to <span
                    className="font-semibold">{ndkProfile?.name}@nostrosity.com</span>?
                </p>
            </AlertModal>
        </>
    )
}

export default Page
