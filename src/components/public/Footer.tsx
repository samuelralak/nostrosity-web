import {Container} from "@/components/public/Container";
import {Logo} from "@/components/public/Logo";


export function Footer() {
  return (
    <footer className="flex-none py-16">
      <Container className="flex flex-col items-center justify-between md:flex-row">
        <Logo className="h-12 w-auto text-slate-900" />
        <p className="mt-6 text-base text-slate-500 md:mt-0">
          Copyright &copy; {new Date().getFullYear()}. All
          rights reserved.
        </p>
      </Container>
    </footer>
  )
}
