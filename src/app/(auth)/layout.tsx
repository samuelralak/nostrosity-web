import {ReactNode} from "react";

const Layout = ({ children }: {children: ReactNode}) => {
    return (
        <div className="h-full bg-gray-50">
            {children}
        </div>
    )
}

export default Layout