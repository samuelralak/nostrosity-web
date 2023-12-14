import {ReactNode} from "react";

const SectionContainer = ({title, subtitle, children}: { title: string, subtitle?: string, children: ReactNode }) => {
    return (
        <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">{title}</h2>
            {subtitle && (
                <p className="mt-1 text-sm leading-6 text-slate-500">Connect bank accounts to your account.</p>
            )}

            {children}
        </div>
    )
}

export default SectionContainer
