import {Header} from "@/components/public/Header";
import {Footer} from "@/components/public/Footer";


export function PublicLayout({
  children,
  showFooter = true,
}: {
  children: React.ReactNode
  showFooter?: boolean
}) {
  return (
    <>
      <Header />
      <main className="flex-auto">{children}</main>
      {showFooter && <Footer />}
    </>
  )
}
