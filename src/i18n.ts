export type Locale = 'en' | 'pt-BR'

export const defaultLocale: Locale = 'en'
export const locales: Locale[] = ['en', 'pt-BR']

export type Dictionary = Record<string, string>

export async function getDictionary(locale: string): Promise<Dictionary> {
    if (locale === 'pt-BR') {
        return (await import('../public/locales/pt-BR/common.json')).default as unknown as Dictionary
    }
    return (await import('../public/locales/en/common.json')).default as unknown as Dictionary
}
