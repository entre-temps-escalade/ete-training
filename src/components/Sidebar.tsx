import useAppContext from '@/hooks/useAppContext'
import useTranslate from '@/hooks/useTranslate'
import { Link, useLocation } from 'react-router-dom'
import Icon from './icons/Icon'
import { twMerge } from 'tailwind-merge'
import Menu from './Menu/Menu'
import Button from './Button'

function Sidebar() {
    const { theme, language } = useAppContext()
    const { pathname } = useLocation()

    function SidebarLink({
        path,
        children,
    }: React.PropsWithChildren<{ path: string }>) {
        return (
            <Link
                to={path}
                className={twMerge(
                    'flex items-center px-5 py-3 text-gray-900 dark:text-gray-50 hover:bg-primary-600 rounded-r-full transition-colors',
                    pathname === path && 'bg-primary-600',
                )}
            >
                {children}
            </Link>
        )
    }

    return (
        <nav className="flex flex-col fixed h-screen max-h-screen bg-white border-r w-64 dark:bg-gray-800 dark:border-gray-700 py-5">
            <Link to="/" className="flex flex-col items-center">
                <img
                    className="w-20 h-20"
                    src={theme === 'dark' ? '/ete.png' : '/ete-dark.png'}
                    alt="logo"
                />
                <h1 className="text-2xl dark:text-white font-bold mt-1">
                    ETE Training
                </h1>
            </Link>
            <div className=" mt-6 font-medium grow">
                <SidebarLink path="/">
                    <Icon.Home className="mr-3" />
                    {useTranslate('dashboard')}
                </SidebarLink>
            </div>
            <footer className="mb-3 flex items-center justify-center">
                <Menu>
                    <Menu.Target>
                        <Button className="bg-transparent dark:bg-transparent focus:ring-0 text-lg py-1">
                            <Icon.User className="mr-2" />
                            {useTranslate('account.profile')}
                        </Button>
                    </Menu.Target>
                    <Menu.Dropdown position="top">
                        <div className="bg-white border border-gray-200 rounded-md p-1 min-w-36">
                            <Button className="bg-transparent dark:bg-transparent text-gray-900 text-left justify-start p-2 w-full hover:bg-gray-200 dark:hover:bg-gray-200 focus:ring-0">
                                {useTranslate('account.myProfile')}
                            </Button>
                            <hr className="my-1" />
                            <h3 className="px-2 py-1 text-xs font-bold text-gray-500">
                                {useTranslate('language.language')}
                            </h3>
                            <Button
                                className={twMerge(
                                    'bg-transparent dark:bg-transparent text-gray-900 text-left justify-start p-2 w-full hover:bg-gray-200 dark:hover:bg-gray-200 focus:ring-0',
                                    language === 'fr' && 'font-bold',
                                )}
                            >
                                {useTranslate('language.french')}
                            </Button>
                            <Button
                                className={twMerge(
                                    'bg-transparent dark:bg-transparent text-gray-900 text-left justify-start p-2 w-full hover:bg-gray-200 dark:hover:bg-gray-200 focus:ring-0',
                                    language === 'en' && 'font-bold',
                                )}
                            >
                                {useTranslate('language.english')}
                            </Button>
                            <hr className="my-1" />
                            <Button
                                className={twMerge(
                                    'bg-transparent dark:bg-transparent text-gray-900 p-2 w-full hover:bg-gray-200 dark:hover:bg-gray-200 focus:ring-0',
                                )}
                            >
                                {useTranslate('account.logout')}
                            </Button>
                        </div>
                    </Menu.Dropdown>
                </Menu>
            </footer>
        </nav>
    )
}

export default Sidebar
