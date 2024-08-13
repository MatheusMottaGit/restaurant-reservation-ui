import { handleErrors } from "@/api/errors"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authContext } from "@/contexts/auth-context"
import { RegisterFormData, registerSchema } from "@/types/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleCheckBig, SquareArrowOutUpRight } from "lucide-react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const Register = () => {
  const { signUp } = authContext()

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function registerUser(data: RegisterFormData) {
    try {
      await signUp(data)

      reset({
        name: "",
        email: "",
        password: "",
      })

      toast.success("Registered!")

      navigate("/login")
    } catch (error) {
      handleErrors(error)
    }
  }

  const navigate = useNavigate()

  function navigateToLoginPage() {
    navigate("/login")
  }

  return (
    <Card className="w-96 flex flex-col gap-3 shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl">Register on <span className="underline">Table.dash</span></CardTitle>
        <CardDescription>Check your reservations on our placement!</CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(registerUser)} className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1 col-span-2">
              <Label>Name</Label>

              <Input type="text" {...register("name")} />

              {errors && (
                <span className="text-red-500">{errors.name?.message}</span>
              )}
            </div>

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
          </div>

          <Button
            loading={isSubmitting}
            disabled={isSubmitting}
            className="w-full"
            type="submit"
          >
            Create account <CircleCheckBig className="size-4" />
          </Button>
        </form>

        <Button
          onClick={navigateToLoginPage}
          className="w-full mt-3"
          variant="secondary"
          disabled={isSubmitting}
        >
          Already have an account <SquareArrowOutUpRight className="size-4" />
        </Button>
      </CardContent>
    </Card>
  )
}

export default Register
