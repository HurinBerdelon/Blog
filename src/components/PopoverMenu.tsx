import { Category } from "@/types/Category";
import { Popover } from "@headlessui/react";
import Link from "next/link";
import { List } from "phosphor-react";
import { useTranslation } from "next-i18next";

interface PopoverMenuProps {
    sortedCategories: Category[]
}

export function PopoverMenu({ sortedCategories }: PopoverMenuProps): JSX.Element {

    const { t } = useTranslation()

    return (
        <menu>
            <Popover className="relative">
                <Popover.Button className="text-3xl">
                    <List className="text-backgroundDark hover:text-greenBrandDark" />
                    <span className="sr-only">{t('common:menuButton')}</span>
                </Popover.Button>
                <Popover.Panel className="absolute right-0 rounded bg-greenBrand p-4 min-w-[120px] md:text-lg text-textLight">
                    {/* <div>
                        <div>
                        <img src="#" alt="profile" />
                        </div>
                    </div> */}
                    <nav className="flex flex-col gap-1 font-medium">
                        <Link className="hover:text-white hover:underline transition-all" href='/'>Home</Link>
                        <div className="text-sm italic mt-2 border-b-[1px]">{t('common:categories')}</div>
                        {sortedCategories.map(category => (
                            <Link key={category.tag} className="capitalize hover:text-white hover:underline transition-all" href={`/list/${category.tag}`}>{category.tag}</Link>
                        ))}
                    </nav>
                </Popover.Panel>
            </Popover>
        </menu>
    )
}