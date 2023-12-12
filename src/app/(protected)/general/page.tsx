import {DocumentDuplicateIcon} from "@heroicons/react/24/outline";
import FormContainerModal from "@/components/FormContainerModal";

const Page = () => {
    return (
        <>
            <div>
                <div className="flex justify-between">
                    <h2 className="text-base font-semibold leading-7 text-slate-900">Profile</h2>
                    <button type="button" className="font-semibold text-blue-600 hover:text-blue-500 text-sm">
                        Update
                    </button>
                </div>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                    This information will be displayed publicly so be careful what you share.
                </p>

                <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                    <div className="pt-6 sm:flex">
                        <dt className="font-medium text-slate-900 sm:w-64 sm:flex-none sm:pr-6">Username</dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-slate-900">samuelralak</div>
                            <button type="button" className="font-semibold text-blue-600 hover:text-blue-500">
                                <DocumentDuplicateIcon className="h-5 w-5"/>
                            </button>
                        </dd>
                    </div>
                    <div className="pt-6 sm:flex">
                        <dt className="font-medium text-slate-900 sm:w-64 sm:flex-none sm:pr-6">Full name</dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-slate-900">Samuel Ralak</div>
                            <button type="button" className="font-semibold text-blue-600 hover:text-blue-500">
                                <DocumentDuplicateIcon className="h-5 w-5"/>
                            </button>
                        </dd>
                    </div>
                    <div className="pt-6 sm:flex">
                        <dt className="font-medium text-slate-900 sm:w-64 sm:flex-none sm:pr-6">Lightning address</dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-slate-900">samuelralak@getalby.com</div>
                            <button type="button" className="font-semibold text-blue-600 hover:text-blue-500">
                                <DocumentDuplicateIcon className="h-5 w-5"/>
                            </button>
                        </dd>
                    </div>
                    <div className="pt-6 sm:flex">
                        <dt className="font-medium text-slate-900 sm:w-64 sm:flex-none sm:pr-6">Website</dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-slate-900">samuelralak.com</div>
                            <button type="button" className="font-semibold text-blue-600 hover:text-blue-500">
                                <DocumentDuplicateIcon className="h-5 w-5"/>
                            </button>
                        </dd>
                    </div>
                    <div className="pt-6 sm:flex">
                        <dt className="font-medium text-slate-900 sm:w-64 sm:flex-none sm:pr-6">About</dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-slate-900">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque molestie orci et tellus ullamcorper tempus. Vivamus pellentesque porta placerat</div>
                            <button type="button" className="font-semibold text-blue-600 hover:text-blue-500">
                                <DocumentDuplicateIcon className="h-5 w-5"/>
                            </button>
                        </dd>
                    </div>
                </dl>
            </div>

            <div>
                <h2 className="text-base font-semibold leading-7 text-slate-900">NIP-05 Identifiers</h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">Connect bank accounts to your account.</p>

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
                        <span aria-hidden="true">+</span> Add nip-05 identifier
                    </button>
                </div>
            </div>

            <div>
                <h2 className="text-base font-semibold leading-7 text-slate-900">Personal relays</h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">Connect bank accounts to your account.</p>

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
            </div>


            <FormContainerModal />
        </>
    )
}

export default Page
