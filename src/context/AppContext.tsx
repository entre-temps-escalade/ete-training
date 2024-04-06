import { createContext, useEffect, useState } from 'react'

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

export type Language = 'fr' | 'en'
export type Theme = 'dark' | 'light'

interface IAppContext {
    theme: Theme
    language: Language

    changeTheme(theme: Theme | 'system'): void
    changeLanguage(language: Language): void
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

    function changeTheme(theme: Theme | 'system') {
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

    function changeLanguage(language: Language) {
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
