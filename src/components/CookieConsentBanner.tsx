'use client'
import type { JSX } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { useCookieConsent } from '@/hooks/useCookieConsent'

export function CookieConsentBanner(): JSX.Element | null {
    const { t } = useTranslation()
    const { consent, acceptCookies, declineCookies } = useCookieConsent()

    if (consent !== 'pending') return null

    return (
        <div className="flex fixed inset-x-0 bottom-0 z-30 flex-col gap-3 p-4 text-sm border-t sm:flex-row sm:items-center sm:justify-between bg-white border-greenBrand text-backgroundDark dark:bg-backgroundDark dark:border-greenBrandDark dark:text-textLight">
            <p className="flex-1">{t('common:cookieConsentMessage')}</p>
            <div className="flex gap-2 shrink-0">
                <button
                    className="px-4 py-1 font-medium rounded border border-greenBrand hover:brightness-90 dark:border-greenBrandDark"
                    onClick={declineCookies}
                >
                    {t('common:declineCookies')}
                </button>
                <button
                    className="px-4 py-1 font-medium rounded bg-greenBrand dark:bg-greenBrandDark text-textLight hover:brightness-90"
                    onClick={acceptCookies}
                >
                    {t('common:acceptCookies')}
                </button>
            </div>
        </div>
    )
}
