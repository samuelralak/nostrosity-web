"use client"

import * as React from "react";
import {Fragment, ReactNode, useEffect, useState} from "react";
import {
    BellIcon,
    BuildingLibraryIcon,
    Cog6ToothIcon,
    GlobeEuropeAfricaIcon,
    UserCircleIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";
import {Bars3Icon, ChevronDownIcon} from "@heroicons/react/20/solid";
import {Dialog, Menu, Transition} from "@headlessui/react";
import {classNames} from "@/utils";
import {useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {accessTokenRevoked, SessionState, userSignedOut} from "@/store/reducers/session-reducer";
import secureLocalStorage from "react-secure-storage";
import constants from "@/constants";
import {AppSession} from "@/resources/session";
import {useRevokeTokenMutation} from "@/api/base";
import {Logo} from "@/components/public/Logo";
import NDKSubscriptionProvider from "@/components/private/NDKSubscriptionProvider";
import {fetchBasicAuthToken} from "@/components/AuthProvider";
import Loader from "@/components/Loader";

interface INavigation {
    name: string;
    href: string;
    icon: React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
        title?: string,
        titleId?: string
    } & React.RefAttributes<SVGSVGElement>>;
    current: boolean;
}

const navigation: INavigation[] = [
    {name: 'General', href: '#', icon: UserCircleIcon, current: true},
    {name: 'Wallet', href: '#', icon: BuildingLibraryIcon, current: false},
    {name: 'Discover', href: '#', icon: GlobeEuropeAfricaIcon, current: false},
    {name: 'Notifications', href: '#', icon: BellIcon, current: false},
    // {name: 'Plan', href: '#', icon: CubeIcon, current: false},
    // {name: 'Billing', href: '#', icon: CreditCardIcon, current: false},
    // {name: 'Team members', href: '#', icon: UsersIcon, current: false},
]

const Layout = ({children}: { children: ReactNode }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const router = useRouter()
    const session = useSelector((state: RootState) => state.session) as SessionState
    const dispatch = useDispatch()
    const [revokeToken] = useRevokeTokenMutation()

    const onSignOut = async () => {
        const token = (secureLocalStorage.getItem(constants.STORAGE_KEY) as AppSession).token
        await secureLocalStorage.removeItem(constants.STORAGE_KEY)
        await fetchBasicAuthToken()
        dispatch(userSignedOut())

        const timeout = setTimeout(async () => {
            await revokeToken({accessToken: token?.accessToken})
            dispatch(accessTokenRevoked())
            window.location.reload()
            clearTimeout(timeout)
        }, 500)
    }

    useEffect(() => {
        if (!session.isLoggedIn) {
            router.replace('/login')
        }
    }, [session.isLoggedIn])

    if (session.isLoggingOut) {
        return (<Loader loadingText={'Signing out'} />)
    }

    return (
        <NDKSubscriptionProvider>
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-slate-900/80"/>
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button type="button" className="-m-2.5 p-2.5"
                                                    onClick={() => setSidebarOpen(false)}>
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true"/>
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    {/* Sidebar component, swap this element with another sidebar if you like */}
                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                                        <div className="flex h-16 shrink-0 items-center">
                                            <Logo/>
                                        </div>
                                        <nav className="flex flex-1 flex-col">
                                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                                <li>
                                                    <ul role="list" className="-mx-2 space-y-1">
                                                        {navigation.map((item) => (
                                                            <li key={item.name}>
                                                                <a
                                                                    href={item.href}
                                                                    className={classNames(
                                                                        item.current
                                                                            ? 'bg-slate-50 text-blue-600'
                                                                            : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50',
                                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                                    )}
                                                                >
                                                                    <item.icon
                                                                        className={classNames(
                                                                            item.current ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-600',
                                                                            'h-6 w-6 shrink-0'
                                                                        )}
                                                                        aria-hidden="true"
                                                                    />
                                                                    {item.name}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>

                                                <li className="mt-auto">
                                                    <a
                                                        href="#"
                                                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                                                    >
                                                        <Cog6ToothIcon
                                                            className="h-6 w-6 shrink-0 text-slate-400 group-hover:text-blue-600"
                                                            aria-hidden="true"
                                                        />
                                                        Settings
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div
                        className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-slate-200 bg-white px-6 pb-4">
                        <div className="flex h-16 shrink-0 items-center">
                            <Logo/>
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-slate-50 text-blue-600'
                                                            : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                    )}
                                                >
                                                    <item.icon
                                                        className={classNames(
                                                            item.current ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-600',
                                                            'h-6 w-6 shrink-0'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>

                                <li className="mt-auto">
                                    <a
                                        href="#"
                                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                                    >
                                        <Cog6ToothIcon
                                            className="h-6 w-6 shrink-0 text-slate-400 group-hover:text-blue-600"
                                            aria-hidden="true"
                                        />
                                        Settings
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="lg:pl-72">
                    <div className="sticky top-0 z-40 lg:mx-auto lg:max-w-7xl lg:px-8">
                        <div
                            className="flex h-16 items-center gap-x-4 border-b border-slate-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
                            <button
                                type="button"
                                className="-m-2.5 p-2.5 text-slate-700 lg:hidden"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <span className="sr-only">Open sidebar</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                            </button>

                            {/* Separator */}
                            <div className="h-6 w-px bg-slate-200 lg:hidden" aria-hidden="true"/>

                            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                                <div className="relative flex flex-1"></div>
                                <div className="flex items-center gap-x-4 lg:gap-x-6">
                                    <button type="button" className="-m-2.5 p-2.5 text-slate-400 hover:text-slate-500">
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-6" aria-hidden="true"/>
                                    </button>

                                    {/* Separator */}
                                    <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-slate-200" aria-hidden="true"/>

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative">
                                        <Menu.Button className="-m-1.5 flex items-center p-1.5">
                                            <span className="sr-only">Open user menu</span>
                                            {session.ndkProfile?.image ? (<img
                                                className="h-8 w-8 object-cover rounded-full bg-slate-50"
                                                src={session.ndkProfile.image}
                                                alt=""
                                            />) : (
                                                <span className="h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                                                    <svg className="h-full w-full text-gray-300" fill="currentColor"
                                                         viewBox="0 0 24 24">
                                                        <path
                                                            d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
                                                    </svg>
                                                </span>
                                            )}
                                            <span className="hidden lg:flex lg:items-center">
                                                <span className="ml-4 text-sm font-semibold leading-6 text-slate-900"
                                                      aria-hidden="true">
                                                    {session.ndkProfile?.displayName ?? session.ndkProfile?.username}
                                                </span>
                                                <ChevronDownIcon className="ml-2 h-5 w-5 text-slate-400"
                                                                 aria-hidden="true"/>
                                            </span>
                                        </Menu.Button>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items
                                                className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-slate-900/5 focus:outline-none">
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <a
                                                            onClick={onSignOut}
                                                            className={classNames(
                                                                active ? 'bg-slate-50' : '',
                                                                'block px-3 py-1 text-sm leading-6 text-slate-900'
                                                            )}
                                                        >
                                                            Sign out
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </div>

                    <main className="py-10">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
                    </main>
                </div>
            </div>
        </NDKSubscriptionProvider>
    )
}

export default Layout
