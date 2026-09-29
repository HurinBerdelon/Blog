'use client'
import { createContext, ReactNode, useContext, useState } from "react"

interface NavHintProviderProps {
    children: ReactNode
}

interface NavHintContextData {
    isNavHintOpen: boolean
    setIsNavHintOpen: (isNavHintOpen: boolean) => void
}

const NavHintContext = createContext<NavHintContextData>({} as NavHintContextData)

export function NavHintProvider({ children }: NavHintProviderProps): JSX.Element {
    const [isNavHintOpen, setIsNavHintOpen] = useState(false)

    return (
        <NavHintContext.Provider value={{
            isNavHintOpen,
            setIsNavHintOpen
        }}
        >
            {children}
        </NavHintContext.Provider>
    )
}

export function useNavHint() {
    return useContext(NavHintContext)
}
