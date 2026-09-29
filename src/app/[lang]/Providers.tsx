'use client'
import { GoogleAnalytic } from '@/components/GoogleAnalytics'
import { LoginModal } from '@/components/LoginModal'
import { NavHintModal } from '@/components/NavHintModal'
import { InteractionProvider } from '@/hooks/useInteractions'
import { LoginProvider } from '@/hooks/useLogin'
import { useLogin } from '@/hooks/useLogin'
import { NavHintProvider } from '@/hooks/useNavHint'
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
                            <NavHintProvider>
                                <ThemeProvider>
                                    <GoogleAnalytic />
                                    {children}
                                    <LoginModalWrapper />
                                    <NavHintModal />
                                </ThemeProvider>
                            </NavHintProvider>
                        </LoginProvider>
                    </InteractionProvider>
                </UserProvider>
            </SessionProvider>
        </DictionaryProvider>
    )
}
