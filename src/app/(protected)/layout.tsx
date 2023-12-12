"use client"

import * as React from "react";
import {Fragment, ReactNode, useEffect, useState} from "react";
import {
    BellIcon,
    BuildingLibraryIcon,
    GlobeEuropeAfricaIcon,
    UserCircleIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";
import {Bars3Icon} from "@heroicons/react/20/solid";
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
    {name: 'Discover', href: '#', icon: GlobeEuropeAfricaIcon, current: false},
    {name: 'Wallet', href: '#', icon: BuildingLibraryIcon, current: false},
    // {name: 'Plan', href: '#', icon: CubeIcon, current: false},
    // {name: 'Billing', href: '#', icon: CreditCardIcon, current: false},
    // {name: 'Team members', href: '#', icon: UsersIcon, current: false},
]

const Layout = ({children}: { children: ReactNode }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const router = useRouter()
    const session = useSelector((state: RootState) => state.session) as SessionState
    const dispatch = useDispatch()
    const [revokeToken] = useRevokeTokenMutation()

    const onSignOut = () => {
        const token = (secureLocalStorage.getItem(constants.STORAGE_KEY) as AppSession).token
        dispatch(userSignedOut())

        const timeout = setTimeout(async () => {
            await revokeToken({accessToken: token?.accessToken})
            dispatch(accessTokenRevoked())
            clearTimeout(timeout)
        }, 1000)
    }

    useEffect(() => {
        if (!session.isLoggedIn) {
            router.replace('/login')
        }
    }, [session.isLoggedIn])

    return (
        <>
            <header className="absolute inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10">
                <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-1 items-center gap-x-6">
                        <button type="button" className="-m-3 p-3 md:hidden" onClick={() => setMobileMenuOpen(true)}>
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-5 w-5 text-slate-900" aria-hidden="true"/>
                        </button>
                        <img
                            className="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-x-8">
                        <button type="button" className="-m-2.5 p-2.5 text-slate-400 hover:text-slate-500">
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true"/>
                        </button>

                        <Menu as="div" className="relative ml-3">
                            <div>
                                <Menu.Button
                                    className="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <span className="absolute -inset-1.5"/>
                                    <span className="sr-only">Open user menu</span>
                                    <img className="h-8 w-8 rounded-full"
                                         src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                         alt=""/>
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Menu.Item>
                                        {({active}) => (
                                            <a
                                                onClick={onSignOut}
                                                className={classNames(
                                                    active ? 'bg-gray-100' : '',
                                                    'block px-4 py-2 text-sm text-slate-700'
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
                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 z-50"/>
                    <Dialog.Panel
                        className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-4 pb-6 sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-gray-900/10">
                        <div className="-ml-0.5 flex h-16 items-center gap-x-6">
                            <button type="button" className="-m-2.5 p-2.5 text-slate-700"
                                    onClick={() => setMobileMenuOpen(false)}>
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                            </button>
                            <div className="-ml-0.5">
                                <a href="#" className="-m-1.5 block p-1.5">
                                    <span className="sr-only">Your Company</span>
                                    <img
                                        className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                        alt=""
                                    />
                                </a>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>

            <div className="mx-auto max-w-7xl pt-16 lg:flex lg:gap-x-16 lg:px-8">
                <aside
                    className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
                    <nav className="flex-none px-4 sm:px-6 lg:px-0">
                        <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        className={classNames(
                                            item.current
                                                ? 'bg-gray-50 text-blue-600'
                                                : 'text-slate-700 hover:text-blue-600 hover:bg-gray-50',
                                            'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold'
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
                    </nav>
                </aside>

                <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
                    <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                        {children}
                    </div>
                </main>
            </div>
        </>
    )
}

export default Layout
