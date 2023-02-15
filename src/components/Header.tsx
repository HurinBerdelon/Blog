import { Category } from "@/types/Category";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { IdiomSwitcher } from "./IdiomSwitcher";
import { PopoverMenu } from "./PopoverMenu";

interface HeaderProps {
    sortedCategories: Category[]
}

export function Header({ sortedCategories }: HeaderProps): JSX.Element {

    const { t } = useTranslation()

    return (
        <header className="shadow-lg text-backgroundDark">
            <div className="flex justify-between p-2 mx-auto w-full md:w-[720px] xl:w-[1120px]">
                <Link href='/' className="w-10">
                    <Image width={50} height={50} src="/images/logo.svg" alt="blog logo" className="cover w-full" />
                    <span className="sr-only">{t('common:homeLink')}</span>
                </Link>
                <div className="flex items-center gap-3">
                    <div className="flex gap-3">
                        {sortedCategories.slice(0, 3).map(category => (
                            <Link
                                key={category.tag}
                                href={`/list/${category.tag}`}
                                className="capitalize hover:text-greenBrandDark hover:underline transition-all"
                            >
                                {category.tag}
                            </Link>
                        ))}
                    </div>
                    <IdiomSwitcher />
                    <PopoverMenu sortedCategories={sortedCategories} />
                </div>
            </div>
        </header>
    )
}