import { createContext, useContext, useEffect, useState } from 'react'

function getDefaultTheme() {
    if (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
        return 'dark'
    } else {
        return 'light'
    }
}

function getDefaultLanguage() {
    if (
        localStorage.lang === 'en' ||
        (!('lang' in localStorage) && navigator.language === 'en')
    ) {
        return 'en'
    } else {
        return 'fr'
    }
}

interface IAppContext {
    theme: 'dark' | 'light'
    language: 'fr' | 'en'

    changeTheme(theme: 'dark' | 'light' | 'system'): void
    changeLanguage(language: 'fr' | 'en'): void
}

const defaultState: IAppContext = {
    theme: getDefaultTheme(),
    language: getDefaultLanguage(),

    changeTheme: () => {},
    changeLanguage: () => {},
}

export const AppContext = createContext(defaultState)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [theme, setTheme] = useState(defaultState.theme)
    const [language, setLanguage] = useState(defaultState.language)

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme])

    useEffect(() => {
        localStorage.lang = language
        document.documentElement.lang = language
    }, [language])

    function changeTheme(theme: 'dark' | 'light' | 'system') {
        if (theme === 'dark') {
            localStorage.theme = 'dark'
            setTheme('dark')
        }

        if (theme === 'light') {
            localStorage.theme = 'light'
            setTheme('light')
        }

        if (theme === 'system') {
            localStorage.removeItem('theme')

            setTheme(
                window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light',
            )
        }
    }

    function changeLanguage(language: 'fr' | 'en') {
        setLanguage(language)
    }

    return (
        <AppContext.Provider
            value={{ theme, language, changeTheme, changeLanguage }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}
