import { createBrowserRouter } from 'react-router-dom'
import Login from '../pages/auth/login'
import AuthLayout from '../pages/layouts/auth-layout'
import Register from '../pages/auth/register'
import MiddlewareLayout from '../pages/layouts/middleware-layout'
import { Role } from '@/types/enums'
import AccessDenied from '@/pages/errors/403'
import AdminLayout from '@/pages/layouts/admin-layout'
import AppLayout from '@/pages/layouts/app-layout'
import ReservationsDashboardPage from '../pages/app/admin/reservations'
import TablesDashboardPage from '@/pages/app/admin/tables/tables'

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      {
        element: <MiddlewareLayout requiredRole={Role.ADMIN} />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              {
                path: '/reservations',
                element: <ReservationsDashboardPage />,
              },
              {
                path: '/tables',
                element: <TablesDashboardPage />
              }
            ],
          },
        ],
      },
    ]
  },
  {
    path: '/forbidden',
    element: <AccessDenied />,
  },
])
