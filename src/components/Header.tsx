import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { IdiomSwitcher } from "./IdiomSwitcher";
import { PopoverMenu } from "./PopoverMenu";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Category } from "@/schema/Category";

interface HeaderProps {
    sortedCategories: Category[]
}

export function Header({ sortedCategories }: HeaderProps): JSX.Element {

    const { t } = useTranslation()

    return (
        <header className="shadow-lg text-backgroundDark dark:text-textLight">
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
                                href={`/category/${category.tag}`}
                                className="capitalize hover:text-greenBrandDark hover:underline transition-all dark:hover:text-grayBrand"
                            >
                                {category.tag}
                            </Link>
                        ))}
                    </div>
                    <ThemeSwitcher />
                    <IdiomSwitcher />
                    <PopoverMenu sortedCategories={sortedCategories} />
                </div>
            </div>
        </header>
    )
}