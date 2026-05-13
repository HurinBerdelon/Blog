'use client'
import Image from 'next/image'
import Link from 'next/link'
import { LinkedinLogo, EnvelopeSimple } from 'phosphor-react'
import { useTranslation } from '@/hooks/useTranslation'
import { useParams } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { Category } from '@/schema/Category'

interface FooterProps {
    sortedCategories: Category[]
}

export function Footer({ sortedCategories }: FooterProps): JSX.Element {
    const { t } = useTranslation()
    const { user } = useUser()
    const params = useParams()
    const lang = (params?.lang as string) ?? 'en'

    return (
        <footer className="justify-self-end bg-greenBrand text-backgroundDark dark:bg-greenBrandDark dark:text-textLight">
            <div className="flex justify-between p-2 mx-auto w-full md:w-[720px] xl:w-[1120px]">
                <div className="w-10">
                    <Image
                        width={50}
                        height={50}
                        src="/images/fernandoCardozoLogo.svg"
                        alt="blog logo"
                        className="object-cover w-full"
                        loading="eager"
                    />
                </div>
                <div className="grid grid-cols-2 w-3/4">
                    <div className="flex flex-col px-10 mt-4 items-left">
                        <Link
                            className="transition-all hover:text-greenBrandDark dark:hover:text-grayBrand hover:underline"
                            href={`/${lang}`}
                        >
                            Home
                        </Link>
                        {user ? (
                            <Link
                                className="transition-all hover:text-greenBrandDark dark:hover:text-grayBrand hover:underline"
                                href={`/${lang}/user-settings`}
                            >
                                {t('common:profile')}
                            </Link>
                        ) : null}
                    </div>
                    <div className="flex flex-col">
                        <div className="italic font-semibold capitalize">{t('common:categories')}</div>
                        <ul>
                            {sortedCategories.map(category => (
                                <li className="ml-4 list-disc" key={category.tag}>
                                    <Link
                                        className="capitalize transition-all hover:text-greenBrandDark dark:hover:text-grayBrand hover:underline"
                                        href={`/${lang}/category/${category.tag}`}
                                    >
                                        {category.tag}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col gap-2 justify-center items-center text-3xl">
                    <Link
                        className="hover:text-greenBrandDark dark:hover:text-grayBrand"
                        href="https://www.linkedin.com/in/fernando-henrique-p-cardozo/"
                        target="_blank"
                    >
                        <span className="sr-only">LinkedIn</span>
                        <LinkedinLogo />
                    </Link>
                    <Link
                        className="hover:text-greenBrandDark dark:hover:text-grayBrand"
                        href="mailto:fhpcardozo@gmail.com"
                    >
                        <span className="sr-only">Email</span>
                        <EnvelopeSimple />
                    </Link>
                </div>
            </div>
        </footer>
    )
}
