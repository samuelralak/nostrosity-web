import {PublicLayout} from '@/components/PublicLayout'
import {ReactNode} from "react";

const Layout = ({children}: { children: ReactNode }) => {
    return <PublicLayout>{children}</PublicLayout>
}

export default Layout
