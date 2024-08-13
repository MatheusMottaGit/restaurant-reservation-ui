import { ComponentProps } from "react"
import { Link, useLocation } from "react-router-dom"

export type NavLink = ComponentProps<typeof Link>

const NavLink = ({ ...props }: NavLink) => {
  const { pathname } = useLocation()
  
  return (
    <Link 
      {...props}
      data-current={pathname === props.to}
      className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-emerald-500 data-[current=true]:text-emerald-500"
    />
  )
}

export default NavLink