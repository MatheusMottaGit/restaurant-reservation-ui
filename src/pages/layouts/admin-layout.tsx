import Header from "@/components/header"
import NavLink from "@/components/nav-link"
import { HandPlatter, Settings, Utensils } from "lucide-react"
import { Outlet } from "react-router-dom"

const AdminLayout = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header>
        <NavLink to="/reservations">
          <HandPlatter className="size-5" /> Reservations
        </NavLink>

        <NavLink to="/tables">
          <Utensils className="size-5" /> Tables
        </NavLink>

        <NavLink to="/settings">
          <Settings className="size-5" /> Settings
        </NavLink>
      </Header>

      <main className="flex-1 p-6 flex flex-col gap-7">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
