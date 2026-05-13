'use client'
import { useTranslation } from '@/hooks/useTranslation'
import { useUser } from '@/hooks/useUser'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export function LoginCallbackClient() {
    const { data: session } = useSession()
    const { authenticate, isAuthenticating, isAuthenticated } = useUser()
    const { t } = useTranslation()

    useEffect(() => {
        if (session && !isAuthenticating && !isAuthenticated) {
            authenticate(session)
        }
    }, [session, isAuthenticating])

    return <h1 className="m-auto text-lg">{t('common:redirecting')}</h1>
}
