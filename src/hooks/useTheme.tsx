import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface ThemeContextData {
    theme: string
    setTheme(theme: string): void
}

interface ThemeProviderProps {
    children: ReactNode
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData)

export function ThemeProvider({ children }: ThemeProviderProps) {

    const [theme, setTheme] = useState<string>()

    useEffect(() => {
        setTheme(localStorage.getItem('hurinBlog-theme') || 'dark')
    }, [])

    useEffect(() => {

        const root = window.document.documentElement

        localStorage.setItem('hurinBlog-theme', theme)
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