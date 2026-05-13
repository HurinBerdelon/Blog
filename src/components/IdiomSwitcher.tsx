'use client'
import { Popover } from '@headlessui/react'
import { languages } from '@/config/languages'
import { locales } from '@/i18n'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { Globe } from 'phosphor-react'

export function IdiomSwitcher(): JSX.Element {
    const params = useParams()
    const pathname = usePathname()
    const currentLang = (params?.lang as string) ?? 'en'

    function getLocaleHref(targetLocale: string): string {
        return (pathname ?? '/').replace(`/${currentLang}`, `/${targetLocale}`)
    }

    return (
        <Popover className="relative flex">
            <Popover.Button className="text-3xl">
                <Globe className="text-backgroundDark hover:text-greenBrandDark dark:text-textLight dark:hover:text-grayBrand" />
            </Popover.Button>
            <Popover.Panel className="absolute right-0 top-10 rounded bg-greenBrand p-4 md:text-lg dark:bg-greenBrandDark">
                <ul className="flex flex-col text-textLight font-medium gap-1">
                    {locales.map(locale => (
                        <li key={locale}>
                            <Link
                                className="flex gap-2 capitalize items-center hover:text-white transition-all dark:hover:text-grayBrand"
                                href={getLocaleHref(locale)}
                            >
                                <span className={currentLang === locale ? 'cursor-default' : ''}>
                                    {languages[locale].flag}
                                </span>
                                <span className={currentLang === locale ? 'cursor-default' : 'hover:underline'}>
                                    {languages[locale].label}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Popover.Panel>
        </Popover>
    )
}
