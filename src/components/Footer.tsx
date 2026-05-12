import Image from "next/image";
import Link from "next/link";
import { LinkedinLogo, EnvelopeSimple } from "phosphor-react";
import { useTranslation } from "next-i18next";
import { Category } from "@/schema/Category";
import { useUser } from "@/hooks/useUser";

interface FooterProps {
    sortedCategories: Category[]
}

export function Footer({ sortedCategories }: FooterProps): JSX.Element {

    const { t } = useTranslation()
    const { user } = useUser()

    return (
        <footer className="bg-greenBrand justify-self-end text-backgroundDark dark:bg-greenBrandDark dark:text-textLight">
            <div className="flex justify-between p-2 mx-auto w-full md:w-[720px] xl:w-[1120px]">
                <div className="w-10">
                    <Image width={50} height={50} src="/images/fernandoCardozoLogo.svg" alt="blog logo" className="object-cover w-full" />
                </div>
                <div className="grid grid-cols-2 w-3/4">
                    <div className="flex flex-col items-left px-10 mt-4">
                        <Link className="hover:text-greenBrandDark dark:hover:text-grayBrand hover:underline transition-all" href={'/'}>Home</Link>
                        {user ? (
                            <Link className="hover:text-greenBrandDark dark:hover:text-grayBrand hover:underline transition-all" href={'/user-settings'}>{t('common:profile')}</Link>
                        ) : null}
                    </div>
                    <div className="flex flex-col">
                        <div className="font-semibold capitalize italic">{t('common:categories')}</div>
                        <ul>
                            {sortedCategories.map(category => (
                                <li className="list-disc ml-4" key={category.tag}>
                                    <Link
                                        className="capitalize hover:text-greenBrandDark dark:hover:text-grayBrand hover:underline transition-all"
                                        href={`/category/${category.tag}`}
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
                        href='https://www.linkedin.com/in/fernando-henrique-p-cardozo/'
                        target="_blank"
                    >
                        <span className="sr-only">LinkedIn</span>
                        <LinkedinLogo />
                    </Link>
                    <Link
                        className="hover:text-greenBrandDark dark:hover:text-grayBrand"
                        href='mailto:fhpcardozo@gmail.com'
                    >
                        <span className="sr-only">Email</span>
                        <EnvelopeSimple />
                    </Link>
                </div>
            </div>
        </footer>
    )
}