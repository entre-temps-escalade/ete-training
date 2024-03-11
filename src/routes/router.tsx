import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Suspense, lazy } from 'react'

const Login = lazy(() => import('@/routes/login'))
const Dashboard = lazy(() => import('@/routes/dashboard'))

export default function Router() {
    const fallbackItem = <div>Chargement</div>

    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <Suspense fallback={fallbackItem}>
                    <Dashboard />
                </Suspense>
            ),
        },
        {
            path: '/login',
            element: (
                <Suspense fallback={fallbackItem}>
                    <Login />
                </Suspense>
            ),
        },
    ])

    return <RouterProvider router={router} />
}
