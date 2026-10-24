import type { PrismicDocument, Query } from '@prismicio/types'
import { languages } from '@/config/languages'
import { locales, defaultLocale, type Locale } from '@/i18n'

export async function fetchWithLocaleFallback<T extends PrismicDocument>(
    lang: string,
    fetchFn: (prismicLang: string) => Promise<Query<T>>
): Promise<{ data: Query<T>; resolvedLang: Locale; usedFallback: boolean }> {
    const currentLocale = (locales.includes(lang as Locale) ? lang : defaultLocale) as Locale
    const primaryCode = languages[currentLocale]?.prismic_code ?? 'en-us'

    const data = await fetchFn(primaryCode)
    if (data.results.length > 0) {
        return { data, resolvedLang: currentLocale, usedFallback: false }
    }

    const fallbackLocale = locales.find(locale => locale !== currentLocale) ?? currentLocale
    if (fallbackLocale === currentLocale) {
        return { data, resolvedLang: currentLocale, usedFallback: false }
    }

    const fallbackCode = languages[fallbackLocale]?.prismic_code ?? 'en-us'
    const fallbackData = await fetchFn(fallbackCode)
    return {
        data: fallbackData,
        resolvedLang: fallbackLocale,
        usedFallback: fallbackData.results.length > 0,
    }
}
