import { Soup } from "lucide-react"
import React from "react"

interface HeaderProps {
  children: React.ReactNode
}

const Header = ({ children: pagesLinks }: HeaderProps) => {
  return (
    <header className="bg-card flex items-center justify-between gap-4 border-b border-input px-6 h-12 shadow">
      <div className="flex items-center divide-x-2 divide-solid divide-input">
        <Soup className="size-10 pr-4" />

        <nav className="flex items-center gap-8 pl-6">
          { pagesLinks }
        </nav>
      </div>
    </header>
  )
}

export default Header