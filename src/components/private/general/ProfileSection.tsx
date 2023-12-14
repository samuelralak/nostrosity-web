import SectionContainer from "@/components/private/general/SectionContainer";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {SessionState} from "@/store/reducers/session-reducer";

const ProfileSection = () => {
    const session = useSelector((state: RootState) => state.session) as SessionState

    return (
        <SectionContainer title={'Profile'}
                          subtitle={'This information will be displayed publicly so be careful what you share.'}
        >
            <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                <div className="pt-6 sm:flex">
                    <dt className="font-medium text-slate-900 sm:w-64 sm:flex-none sm:pr-6">Username</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                        <div className="text-slate-900">
                            {/*{session.ndkProfile?.name}*/}
                            <ProfileSection />
                        </div>
                        <button type="button" className="font-semibold text-blue-600 hover:text-blue-500">
                            <PencilSquareIcon className="h-5 w-5"/>
                        </button>
                    </dd>
                </div>
                <div className="pt-6 sm:flex">
                    <dt className="font-medium text-slate-900 sm:w-64 sm:flex-none sm:pr-6">Full name</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                        <div className="text-slate-900">{session.ndkProfile?.displayName}</div>
                        <button type="button" className="font-semibold text-blue-600 hover:text-blue-500">
                            <PencilSquareIcon className="h-5 w-5"/>
                        </button>
                    </dd>
                </div>
                <div className="pt-6 sm:flex">
                    <dt className="font-medium text-slate-900 sm:w-64 sm:flex-none sm:pr-6">Lightning address</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                        <div className="text-slate-900">{session.ndkProfile?.lud16}</div>
                        <button type="button" className="font-semibold text-blue-600 hover:text-blue-500">
                            <PencilSquareIcon className="h-5 w-5"/>
                        </button>
                    </dd>
                </div>
                <div className="pt-6 sm:flex">
                    <dt className="font-medium text-slate-900 sm:w-64 sm:flex-none sm:pr-6">Website</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                        <div className="text-slate-900">{session.ndkProfile?.website}</div>
                        <button type="button" className="font-semibold text-blue-600 hover:text-blue-500">
                            <PencilSquareIcon className="h-5 w-5"/>
                        </button>
                    </dd>
                </div>
                <div className="pt-6 sm:flex">
                    <dt className="font-medium text-slate-900 sm:w-64 sm:flex-none sm:pr-6">About</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                        <p className="text-slate-900">
                            {session.ndkProfile?.about}
                        </p>
                        <button type="button" className="font-semibold text-blue-600 hover:text-blue-500">
                            <PencilSquareIcon className="h-5 w-5"/>
                        </button>
                    </dd>
                </div>
                <div className="pt-6 sm:flex">
                    <dt className="font-medium text-slate-900 sm:w-64 sm:flex-none sm:pr-6">Bio</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                        <p className="text-slate-900">
                            {session.ndkProfile?.bio}
                        </p>
                        <button type="button" className="font-semibold text-blue-600 hover:text-blue-500">
                            <PencilSquareIcon className="h-5 w-5"/>
                        </button>
                    </dd>
                </div>
            </dl>
        </SectionContainer>
    )
}

export default ProfileSection
