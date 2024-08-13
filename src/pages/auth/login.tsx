import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogIn, SquareArrowOutUpRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginFormData, loginSchema } from "@/types/auth"
import { authContext } from "@/contexts/auth-context"
import { Role } from "@/types/enums"
import { toast } from "sonner"
import { handleErrors } from "@/api/errors"

const Login = () => {
  const { signIn, getToken, decodeToken } = authContext()

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function navigateToRegisterPage() {
    navigate("/register")
  }

  async function login(data: LoginFormData) {
    try {
      await signIn(data)

      const token = getToken()

      if (token) {
        const { role } = decodeToken()

        if (role === Role.ADMIN) {
          navigate("/reservations")
        } else {
          navigate("/")
        }
      }

      toast.success("Logged in!")

      reset({
        email: "",
        password: "",
      })
    } catch (error) {
      handleErrors(error)
    }
  }

  return (
    <Card className="w-96 flex flex-col gap-3">
      <CardHeader>
        <CardTitle className="text-2xl">Login on <span className="underline">Table.dash</span></CardTitle>
        <CardDescription>Check your reservations on our placement!</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(login)} className="space-y-5">
          <div className="space-y-1">
            <Label>E-mail</Label>

            <Input type="text" {...register("email")} />

            {errors && (
              <span className="text-red-500">{errors.email?.message}</span>
            )}
          </div>

          <div className="space-y-1">
            <Label>Password</Label>

            <Input type="password" {...register("password")} />

            {errors && (
              <span className="text-red-500">{errors.password?.message}</span>
            )}
          </div>

          <Button
            loading={isSubmitting}
            disabled={isSubmitting}
            className="w-full"
            type="submit"
          >
            Sign-in <LogIn className="size-5" />
          </Button>
        </form>

        <Button
          onClick={navigateToRegisterPage}
          className="w-full mt-3"
          variant="secondary"
          disabled={isSubmitting}
        >
          Create an account <SquareArrowOutUpRight className="size-4" />
        </Button>
      </CardContent>
    </Card>
  )
}

export default Login
