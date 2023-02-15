import { Popover } from '@headlessui/react';
// import { i18n } from '../../../next-i18next.config'
// import { languages } from '../../config/languages';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Globe } from 'phosphor-react';

export function IdiomSwitcher(): JSX.Element {

    const router = useRouter()

    return (
        <Popover className="relative">
            <Popover.Button className="text-3xl">
                <Globe className='text-backgroundDark hover:text-greenBrandDark' />
            </Popover.Button>
            <Popover.Panel className="absolute right-0 rounded bg-greenBrand p-4 md:text-lg">
                <ul className="flex flex-col text-textLight font-medium gap-1 ">
                    {/* {i18n.locales.map(locale => (
                        <li key={locale}>
                            <Link href={router.asPath} locale={locale}>
                                    <span className={router.locale === locale ? '' : 'deactivated'}>
                                        {languages[locale].flag}
                                    </span>
                                    <span className={router.locale === locale ? '' : 'deactivated'}>
                                        {languages[locale].label}
                                    </span>
                            </Link>
                        </li>
                    ))} */}
                    <Link href={router.asPath} locale={'en'}>
                        English
                    </Link>
                    <Link href={router.asPath} locale={'pt-BR'}>
                        Português
                    </Link>
                </ul>
            </Popover.Panel>
        </Popover>
    )
}