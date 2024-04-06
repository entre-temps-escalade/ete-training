import { PropsWithChildren } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

function Shell({ children }: PropsWithChildren) {
    return (
        <>
            <Sidebar />
            <section className="ml-64 min-h-screen block bg-gray-50 dark:bg-gray-900">
                <Header />
                {children}
            </section>
        </>
    )
}

export default Shell
