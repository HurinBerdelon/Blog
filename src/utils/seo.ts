import { locales, defaultLocale } from '@/i18n'

export function buildAlternates(lang: string, pathAfterLang: string): {
    canonical: string
    languages: Record<string, string>
} {
    const languages: Record<string, string> = {}
    locales.forEach(locale => {
        languages[locale] = `/${locale}${pathAfterLang}`
    })
    languages['x-default'] = `/${defaultLocale}${pathAfterLang}`

    return {
        canonical: `/${lang}${pathAfterLang}`,
        languages,
    }
}
