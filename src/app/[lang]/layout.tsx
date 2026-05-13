import { getDictionary, locales, type Locale } from '@/i18n'
import { Providers } from './Providers'

export function generateStaticParams() {
    return locales.map(lang => ({ lang }))
}

export default async function LangLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ lang: string }>
}) {
    const { lang } = await params
    const dictionary = await getDictionary(lang as Locale)

    return (
        <Providers dictionary={dictionary}>
            <div className="min-h-screen flex flex-col bg-textLight dark:bg-backgroundDark">
                {children}
            </div>
        </Providers>
    )
}
