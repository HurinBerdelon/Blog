import { createContext, ReactNode, useContext, useState } from "react"

interface LoginProviderProps {
    children: ReactNode
}

interface LoginContextData {
    isLoginModalOpen: boolean
    setIsLoginModalOpen: (isLoginModalOpen: boolean) => void
}

const LoginContext = createContext<LoginContextData>({} as LoginContextData)

export function LoginProvider({ children }: LoginProviderProps): JSX.Element {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

    return (
        <LoginContext.Provider value={{
            isLoginModalOpen,
            setIsLoginModalOpen
        }}
        >
            {children}
        </LoginContext.Provider>
    )
}

export function useLogin() {
    return useContext(LoginContext)
}