import { Popover } from '@headlessui/react';
import { i18n } from '../../next-i18next.config'
import { languages } from '../config/languages';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Globe } from 'phosphor-react';

export function IdiomSwitcher(): JSX.Element {

    const router = useRouter()

    return (
        <Popover className="relative flex">
            <Popover.Button className="text-3xl">
                <Globe className='text-backgroundDark hover:text-greenBrandDark dark:text-textLight dark:hover:text-grayBrand' />
            </Popover.Button>
            <Popover.Panel className="absolute right-0 top-10 rounded bg-greenBrand p-4 md:text-lg dark:bg-greenBrandDark">
                <ul className="flex flex-col text-textLight font-medium gap-1 ">
                    {i18n.locales.map(locale => (
                        <li key={locale}>
                            <Link className='flex gap-2 capitalize items-center hover:text-white transition-all dark:hover:text-grayBrand' href={router.asPath} locale={locale}>
                                <span className={router.locale === locale ? 'cursor-default ' : ''}>
                                    {languages[locale].flag}
                                </span>
                                <span className={router.locale === locale ? 'cursor-default ' : 'hover:underline'}>
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