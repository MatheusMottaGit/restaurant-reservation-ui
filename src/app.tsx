import { QueryClientProvider } from "react-query"
import { queryClient } from "./utils/tanstack"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes/routes"
import { Toaster } from "sonner"
import { AuthContextProvider } from "./contexts/auth-context"

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
        <Toaster richColors position="top-center"/>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}

export default App
