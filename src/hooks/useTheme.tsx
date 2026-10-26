'use client'
import { createContext, ReactNode, useContext, useEffect, useSyncExternalStore } from "react";

interface ThemeContextData {
    theme: string
    setTheme(theme: string): void
}

interface ThemeProviderProps {
    children: ReactNode
}

const THEME_STORAGE_KEY = 'hurinBlog-theme'
const THEME_CHANGE_EVENT = 'hurinBlog-theme-change'

function subscribe(callback: () => void) {
    window.addEventListener(THEME_CHANGE_EVENT, callback)
    return () => window.removeEventListener(THEME_CHANGE_EVENT, callback)
}

function getSnapshot(): string {
    return localStorage.getItem(THEME_STORAGE_KEY) || 'dark'
}

function getServerSnapshot(): string {
    return 'dark'
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData)

export function ThemeProvider({ children }: ThemeProviderProps) {

    const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

    function setTheme(nextTheme: string) {
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
        window.dispatchEvent(new Event(THEME_CHANGE_EVENT))
    }

    useEffect(() => {

        const root = window.document.documentElement

        localStorage.setItem(THEME_STORAGE_KEY, theme)
        if (theme === 'dark') {
            root.classList.add(theme)
        } else {
            root.classList.remove('dark')
        }


    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}