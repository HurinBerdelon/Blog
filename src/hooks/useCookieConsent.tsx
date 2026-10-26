'use client'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

export type ConsentStatus = 'pending' | 'accepted' | 'declined'

interface CookieConsentContextData {
    consent: ConsentStatus
    acceptCookies: () => void
    declineCookies: () => void
    resetConsent: () => void
}

const STORAGE_KEY = 'hurinBlog-cookie-consent'

const CookieConsentContext = createContext<CookieConsentContextData>({} as CookieConsentContextData)

export function CookieConsentProvider({ children }: { children: ReactNode }) {
    const [consent, setConsent] = useState<ConsentStatus>('pending')

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored === 'accepted' || stored === 'declined') {
            setConsent(stored)
        }
    }, [])

    function acceptCookies() {
        localStorage.setItem(STORAGE_KEY, 'accepted')
        setConsent('accepted')
    }

    function declineCookies() {
        localStorage.setItem(STORAGE_KEY, 'declined')
        setConsent('declined')
    }

    function resetConsent() {
        localStorage.removeItem(STORAGE_KEY)
        setConsent('pending')
    }

    return (
        <CookieConsentContext.Provider value={{ consent, acceptCookies, declineCookies, resetConsent }}>
            {children}
        </CookieConsentContext.Provider>
    )
}

export function useCookieConsent() {
    return useContext(CookieConsentContext)
}
