'use client'
import { createContext, useContext } from 'react'
import type { Dictionary } from '@/i18n'

const DictionaryContext = createContext<Dictionary>({})

export function DictionaryProvider({ dictionary, children }: {
    dictionary: Dictionary
    children: React.ReactNode
}) {
    return (
        <DictionaryContext.Provider value={dictionary}>
            {children}
        </DictionaryContext.Provider>
    )
}

export function useTranslation() {
    const dict = useContext(DictionaryContext)
    function t(key: string): string {
        const cleanKey = key.includes(':') ? key.split(':')[1] : key
        return dict[cleanKey] ?? key
    }
    return { t }
}
