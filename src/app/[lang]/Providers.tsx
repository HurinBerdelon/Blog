'use client'
import { GoogleAnalytic } from '@/components/GoogleAnalytics'
import { LoginModal } from '@/components/LoginModal'
import { InteractionProvider } from '@/hooks/useInteractions'
import { LoginProvider } from '@/hooks/useLogin'
import { useLogin } from '@/hooks/useLogin'
import { ThemeProvider } from '@/hooks/useTheme'
import { UserProvider } from '@/hooks/useUser'
import { DictionaryProvider } from '@/hooks/useTranslation'
import { SessionProvider } from 'next-auth/react'
import type { Dictionary } from '@/i18n'

function LoginModalWrapper() {
    const { isLoginModalOpen, setIsLoginModalOpen } = useLogin()
    return (
        <LoginModal
            isOpen={isLoginModalOpen}
            onRequestClose={() => setIsLoginModalOpen(false)}
        />
    )
}

export function Providers({ children, dictionary }: {
    children: React.ReactNode
    dictionary: Dictionary
}) {
    return (
        <DictionaryProvider dictionary={dictionary}>
            <SessionProvider>
                <UserProvider>
                    <InteractionProvider>
                        <LoginProvider>
                            <ThemeProvider>
                                <GoogleAnalytic />
                                {children}
                                <LoginModalWrapper />
                            </ThemeProvider>
                        </LoginProvider>
                    </InteractionProvider>
                </UserProvider>
            </SessionProvider>
        </DictionaryProvider>
    )
}
