import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Loader from '@/components/Loader'
import useTranslate from '@/hooks/useTranslate'

const Login = lazy(() => import('@/routes/login'))
const ForgotPassword = lazy(() => import('@/routes/forgot_password'))
const Dashboard = lazy(() => import('@/routes/dashboard'))

function Router() {
    const fallbackItem = (
        <section className="bg-gray-50 dark:bg-gray-900">
            <Loader animate className="h-screen">
                {useTranslate('loading')}...
            </Loader>
        </section>
    )

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
        {
            path: '/forgot-password',
            element: (
                <Suspense fallback={fallbackItem}>
                    <ForgotPassword />
                </Suspense>
            ),
        },
    ])

    return <RouterProvider router={router} />
}

export default Router
