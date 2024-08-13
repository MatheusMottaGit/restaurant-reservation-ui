import { authContext } from "@/contexts/auth-context"
import { useEffect } from "react"
import { useNavigate, Outlet } from "react-router-dom"

const AppLayout = () => {
  const { getToken } = authContext()

  const navigate = useNavigate()
  
  const token = getToken()

  useEffect(() => {
    if (!token) {
      navigate("/")
    }

    navigate("/reservations")
  }, [navigate, token])

  return (
    <Outlet />
  )
}

export default AppLayout