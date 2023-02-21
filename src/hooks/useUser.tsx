
import { Session } from "next-auth"
import { signOut } from "next-auth/react"
import { useRouter } from "next/router"
import { destroyCookie, parseCookies, setCookie } from "nookies"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { appKeys } from "../config/AppKeys"
import { UserResponseProps } from "../schema/UserSchema"
import { api } from "../services/api"

interface UserProviderProps {
    children: ReactNode
}

interface UserContextData {
    user: UserResponseProps | undefined
    isAuthenticated: boolean
    isAuthenticating: boolean
    authenticate: (session: Session) => void
    revokeAuthentication: () => void
    updateUserImage: (values: any) => void //TODO: remove any
    deleteUserAccount: () => void
    setPath: () => void
}

const userContext = createContext<UserContextData>({} as UserContextData)

export function UserProvider({ children }: UserProviderProps): JSX.Element {

    const [user, setUser] = useState<UserResponseProps | undefined>()
    const isAuthenticated = !!user
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const cookies = parseCookies()
        const accessToken = cookies[appKeys.accessTokenKey]
        if (accessToken) {
            api.get('/user/me')
                .then(response => {
                    setUser(response.data)
                })
        }
    }, [])

    function setPath() {
        localStorage.setItem(appKeys.currentPath, router.asPath)
    }

    function authenticate(session: Session) {
        setIsAuthenticating(true)
        api.post('session', {
            name: session.user.name,
            providerId: session.user.providerId,
            imageUrl: session.user.image
        }).then(response => {
            setCookie(undefined, appKeys.accessTokenKey, response.data.accessToken, {
                maxAge: 60 * 60 * 24 * 7, // 7 days
                path: '/'
            })

            setCookie(undefined, appKeys.refreshTokenKey, response.data.refreshToken.value, {
                maxAge: 60 * 60 * 24 * 7, // 7 days
                path: '/'
            })

            api.defaults.headers['Authorization'] = `Bearer ${response.data.accessToken}`

            setUser(response.data.user)
            router.push(localStorage.getItem(appKeys.currentPath) || '/')
        }).catch(error => {
            console.log(error)
            router.push(localStorage.getItem(appKeys.currentPath) || '/')
        }).finally(() => setIsAuthenticating(false))
    }

    function revokeAuthentication() {
        setUser(undefined)
        destroyCookie(undefined, appKeys.refreshTokenKey, { path: '/' })
        destroyCookie(undefined, appKeys.accessTokenKey, { path: '/' })
        signOut()
    }

    async function updateUserImage(values: any) { //TODO: remove any
        try {

            await api.patch('user/update-avatar', { avatar: values.avatar },
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })

            const response = await api.get('/user/me')
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteUserAccount() {
        try {
            await api.delete('user/delete')
            revokeAuthentication()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <userContext.Provider value={{
            user,
            isAuthenticated,
            isAuthenticating,
            authenticate,
            revokeAuthentication,
            updateUserImage,
            deleteUserAccount,
            setPath
        }}
        >
            {children}
        </userContext.Provider>
    )
}

export function useUser() {
    return useContext(userContext)
}