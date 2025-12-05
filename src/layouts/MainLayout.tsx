import type { ReactNode } from "react"
import { Navbar } from "../components/Common/Navbar/Navbar"

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout = ({children}: MainLayoutProps) => {
  return (
    <div className="flex h-auto bg-slate-50 overflow-hidden">
      <Navbar />
      <main className="flex-1 w-full relative mt-10">
        <div className="p-4 md:p-8">
            {children}
        </div>
      </main>
    </div>
  )
}