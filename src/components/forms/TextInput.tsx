"use client"

import {forwardRef, HTMLProps, useEffect} from "react";

interface Props {
    onInputCallback?: (target: HTMLInputElement) => void
}

const TextInput = forwardRef<HTMLInputElement, Props & HTMLProps<HTMLInputElement>>(({name, value, onInputCallback}, ref) => {
    useEffect(() => {
        if (ref && 'current' in ref) {
            ref?.current?.addEventListener('input', function (event) {
                const currentTarget = event.target as HTMLInputElement

                if (onInputCallback) {
                    onInputCallback(currentTarget)
                }
            }, false)
        }
    }, [])

    return (
        <input
            id={name}
            name={name}
            defaultValue={value}
            type="text"
            className="block w-full sm:w-3/4 rounded-lg bg-slate-50 focus:bg-white text-sm border-0 py-4 text-slate-900 ring-2 ring-inset ring-gray-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            ref={ref}
        />
    )
})

TextInput.displayName = 'TextInput'
export default TextInput
