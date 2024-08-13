import { toast } from "sonner";

export function handleErrors(error: any): void {
  if (error.response) {
    toast.error(`Ops! ${error}`)
  } else if (error.request) {
    toast.error(`Ops! ${error.request}`)
  } else {
    toast.error(`Ops! ${error}`)
  }
}