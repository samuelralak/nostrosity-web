"use client"

import * as React from 'react'
import {Fragment, ReactNode, useRef} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {CheckIcon, ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon} from '@heroicons/react/24/outline'

export enum AlertType {
    Info = "info",
    Error = "error",
    Warning = "warning",
    Success = "success"
}

interface Props {
    title: string;
    children: ReactNode;
    dismiss: () => void;
    dismissButtonText?: string;
    confirm: () => void;
    confirmButtonText?: string;
    type?: AlertType;
    open?: boolean
}

const alertColor: Record<AlertType, {
    text: string,
    background: { normal: string; light: string, extraLight: string }
}> = {
    [AlertType.Info]: {
        text: 'text-blue-600',
        background: {
            normal: 'bg-blue-600',
            light: 'bg-blue-500',
            extraLight: 'bg-blue-100',
        }
    },
    [AlertType.Error]: {
        text: 'text-red-600',
        background: {
            normal: 'bg-red-600',
            light: 'bg-red-500',
            extraLight: 'bg-red-100',
        }
    },
    [AlertType.Warning]: {
        text: 'text-yellow-600',
        background: {
            normal: 'bg-yellow-600',
            light: 'bg-yellow-500',
            extraLight: 'bg-yellow-100',
        }
    },
    [AlertType.Success]: {
        text: 'text-green-600',
        background: {
            normal: 'bg-green-600',
            light: 'bg-green-500',
            extraLight: 'bg-green-100',
        }
    },
}

const alertIcon: Record<AlertType, React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
    title?: string,
    titleId?: string
} & React.RefAttributes<SVGSVGElement>>> = {
    [AlertType.Info]: InformationCircleIcon,
    [AlertType.Error]: XCircleIcon,
    [AlertType.Warning]: ExclamationTriangleIcon,
    [AlertType.Success]: CheckIcon,
}

const AlertModal = ({
                        open = false,
                        type = AlertType.Info,
                        confirmButtonText = "Confirm",
                        dismissButtonText = "Cancel",
                        ...props
                    }: Props) => {
    const cancelButtonRef = useRef(null)
    const Icon = alertIcon[type]

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" static initialFocus={cancelButtonRef} onClose={() => {
            }}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div
                                            className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${alertColor[type].background.extraLight} sm:mx-0 sm:h-10 sm:w-10`}>
                                            <Icon className={`h-6 w-6 ${alertColor[type].text}`} aria-hidden="true"/>
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title as="h3"
                                                          className="text-base font-semibold leading-6 text-gray-900">
                                                {props.title}
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                {props.children}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className={`inline-flex w-full justify-center rounded-md ${alertColor[type].background.normal} px-3 py-2 text-sm font-semibold text-white shadow-sm hover:${alertColor[type].background.light} sm:ml-3 sm:w-auto`}
                                        onClick={props.confirm}
                                    >
                                        {confirmButtonText}
                                    </button>
                                    <button
                                        type="button"
                                        className={`mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto`}
                                        onClick={props.dismiss}
                                        ref={cancelButtonRef}
                                    >
                                        {dismissButtonText}
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default AlertModal
