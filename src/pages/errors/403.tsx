import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowLeftIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

const AccessDenied = () => {
  const navigate = useNavigate()

  function navigateToPreviousPage() {
    navigate(-1)
  }
  
  return (
    <div className="min-h-screen bg-muted flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col gap-4 items-center justify-center">
        <AlertCircle className="size-20" />
        
        <h1 className="text-center text-4xl font-medium">Error on loading page...</h1>

        <span className="opacity-80 text-center">
          This page you're trying to access has restricted permissions. <br />
          Please refer to your system administrator.
        </span>

        <Button onClick={navigateToPreviousPage} className="mt-7">
          <ArrowLeftIcon className="size-4" /> Go back
        </Button>
      </div>
    </div>
  )
}

export default AccessDenied