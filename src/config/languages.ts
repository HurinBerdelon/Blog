export const languages = {
    en: { code: 'en', flag: '🇺🇸', label: 'english', prismic_code: 'en-us' },
    "pt-BR": { code: 'pt-BR', flag: '🇧🇷', label: 'português', prismic_code: 'pt-br' },
}

export function localeFromPrismicCode(prismicCode: string): keyof typeof languages | undefined {
    return (Object.keys(languages) as (keyof typeof languages)[]).find(
        locale => languages[locale].prismic_code === prismicCode
    )
}