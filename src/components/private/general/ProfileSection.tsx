import SectionContainer from "@/components/private/general/SectionContainer";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {SessionState} from "@/store/reducers/session-reducer";
import {useRef, useState} from "react";
import TextInput from "@/components/forms/TextInput";
import ActionButtons from "@/components/private/general/ActionButtons";
import {NDKUserProfile} from "@nostr-dev-kit/ndk";

interface InputState {
    [key: string]: {
        value: any;
        isEditing: boolean;
    }
}

const inputToNDKReducer = (accumulator: NDKUserProfile, currentValue: [string, { value: any, isEditing: boolean }]) => {
    const key = currentValue[0]
    const value = currentValue[1].value

    if (value) {
        return {...accumulator, ...{[key]: value}}
    }

    return accumulator
}

const ProfileSection = () => {
    const [ndkInput, setNDKInput] = useState<InputState>()
    const inputRef = useRef<HTMLInputElement | null>(null)
    const session = useSelector((state: RootState) => state.session) as SessionState

    const handleNDKInput = (currentTarget: HTMLInputElement) => {
        const name = currentTarget.name
        const value = currentTarget.value
        setNDKInput({...ndkInput, ...{[name]: {...(ndkInput ?? {})[name], value: value}}})
    }

    const toggleEditing = (name: string) => {
        const input = (ndkInput ?? {})[name]
        setNDKInput({...ndkInput, ...{[name]: {...input, isEditing: !(input?.isEditing ?? false)}}})
    }

    const onDoneEditing = () => {
        const data = Object.entries(ndkInput!).reduce(inputToNDKReducer, {})
        console.log({data})
    }

    return (
        <SectionContainer title={'Profile'}
                          subtitle={'This information will be displayed publicly so be careful what you share.'}
        >
            <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                <div className="pt-6 sm:flex items-center">
                    <dt className="font-medium text-slate-900 sm:w-64 sm:flex-none sm:pr-6">Username</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                        <div className="text-slate-900 w-full">
                            {ndkInput && ndkInput['name']?.isEditing ? (
                                <TextInput
                                    name="name"
                                    onInputCallback={handleNDKInput}
                                    value={session.ndkProfile?.name}
                                    ref={inputRef}
                                />
                            ) : session.ndkProfile?.name}
                        </div>

                        <ActionButtons
                            name={'name'}
                            isEditing={ndkInput && ndkInput['name']?.isEditing}
                            toggleAction={toggleEditing}
                            submitActionHandler={onDoneEditing}
                        />
                    </dd>
                </div>
                <div className="pt-6 sm:flex items-center">
                    <dt className="font-medium text-slate-900 sm:w-64 sm:flex-none sm:pr-6">Full name</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                        <div className="text-slate-900 w-full">
                            {ndkInput && ndkInput['displayName']?.isEditing ? (
                                <TextInput
                                    name="displayName"
                                    onInputCallback={handleNDKInput}
                                    value={session.ndkProfile?.displayName}
                                    ref={inputRef}
                                />
                            ) : session.ndkProfile?.displayName}
                        </div>

                        <ActionButtons
                            name={'displayName'}
                            isEditing={ndkInput && ndkInput['displayName']?.isEditing}
                            toggleAction={toggleEditing}
                            submitActionHandler={onDoneEditing}
                        />
                    </dd>
                </div>
                <div className="pt-6 sm:flex items-center">
                    <dt className="font-medium text-slate-900 sm:w-64 sm:flex-none sm:pr-6">Lightning address</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                        <div className="text-slate-900 w-full">
                            {ndkInput && ndkInput['lud16']?.isEditing ? (
                                <TextInput
                                    name="lud16"
                                    onInputCallback={handleNDKInput}
                                    value={session.ndkProfile?.lud16}
                                    ref={inputRef}
                                />
                            ) : session.ndkProfile?.lud16}
                        </div>

                        <ActionButtons
                            name={'lud16'}
                            isEditing={ndkInput && ndkInput['lud16']?.isEditing}
                            toggleAction={toggleEditing}
                            submitActionHandler={onDoneEditing}
                        />
                    </dd>
                </div>
                <div className="pt-6 sm:flex items-center">
                    <dt className="font-medium text-slate-900 sm:w-64 sm:flex-none sm:pr-6">Website</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                        <div className="text-slate-900 w-full">
                            {ndkInput && ndkInput['website']?.isEditing ? (
                                <TextInput
                                    name="website"
                                    onInputCallback={handleNDKInput}
                                    value={session.ndkProfile?.website}
                                    ref={inputRef}
                                />
                            ) : session.ndkProfile?.website}
                        </div>

                        <ActionButtons
                            name={'website'}
                            isEditing={ndkInput && ndkInput['website']?.isEditing}
                            toggleAction={toggleEditing}
                            submitActionHandler={onDoneEditing}
                        />
                    </dd>
                </div>
                <div className="pt-6 sm:flex items-center">
                    <dt className="font-medium text-slate-900 sm:w-64 sm:flex-none sm:pr-6">About</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                        <div className="text-slate-900 w-full">
                            {ndkInput && ndkInput['about']?.isEditing ? (
                                <TextInput
                                    name="about"
                                    onInputCallback={handleNDKInput}
                                    value={session.ndkProfile?.about}
                                    ref={inputRef}
                                />
                            ) : session.ndkProfile?.about}
                        </div>

                        <ActionButtons
                            name={'about'}
                            isEditing={ndkInput && ndkInput['about']?.isEditing}
                            toggleAction={toggleEditing}
                            submitActionHandler={onDoneEditing}
                        />
                    </dd>
                </div>
                <div className="pt-6 sm:flex items-center">
                    <dt className="font-medium text-slate-900 sm:w-64 sm:flex-none sm:pr-6">Bio</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                        <div className="text-slate-900 w-full">
                            {ndkInput && ndkInput['bio']?.isEditing ? (
                                <TextInput
                                    name="bio"
                                    onInputCallback={handleNDKInput}
                                    value={session.ndkProfile?.bio}
                                    ref={inputRef}
                                />
                            ) : session.ndkProfile?.bio}
                        </div>

                        <ActionButtons
                            name={'bio'}
                            isEditing={ndkInput && ndkInput['bio']?.isEditing}
                            toggleAction={toggleEditing}
                            submitActionHandler={onDoneEditing}
                        />
                    </dd>
                </div>
            </dl>
        </SectionContainer>
    )
}

export default ProfileSection
