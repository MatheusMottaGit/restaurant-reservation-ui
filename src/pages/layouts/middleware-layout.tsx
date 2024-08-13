import { authContext } from "@/contexts/auth-context"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Role } from "@/types/enums"

interface MiddlewareProps {
  requiredRole?: Role
}

const Middleware = ({ requiredRole }: MiddlewareProps) => {
  const { decodeToken } = authContext()

  const navigate = useNavigate()
  
  useEffect(() => {
    const { role } = decodeToken()

    if (requiredRole && role !== requiredRole) {
      navigate("/forbidden")
    }
  }, [requiredRole, navigate, decodeToken])

  return (
    <Outlet />
  )
}

export default Middleware
