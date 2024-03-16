import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Loader from '@/components/Loader'
import { t } from '@/utils/translate'

const Login = lazy(() => import('@/routes/login'))
const ForgotPassword = lazy(() => import('@/routes/forgot_password'))
const Dashboard = lazy(() => import('@/routes/dashboard'))

export default function Router() {
    const fallbackItem = (
        <section className="bg-gray-50 dark:bg-gray-900">
            <Loader animate className="h-screen">
                {t('loading').capitalize()}...
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
