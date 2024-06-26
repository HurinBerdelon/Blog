import { Popover } from "@headlessui/react";
import Link from "next/link";
import { List } from "phosphor-react";
import { useTranslation } from "next-i18next";
import { LoginModal } from "./LoginModal";
import { useState } from "react";
import { Category } from "@/schema/Category";
import { Profile } from "./Profile";
import { useUser } from "@/hooks/useUser";
import { useLogin } from "@/hooks/useLogin";

interface PopoverMenuProps {
    sortedCategories: Category[]
}

export function PopoverMenu({ sortedCategories }: PopoverMenuProps): JSX.Element {

    const { t } = useTranslation()
    const { setIsLoginModalOpen } = useLogin()
    const { revokeAuthentication, user } = useUser()

    return (
        <menu>
            <Popover className="relative flex">
                <Popover.Button className="text-3xl">
                    <List className="text-backgroundDark hover:text-greenBrandDark dark:text-textLight dark:hover:text-grayBrand" />
                    <span className="sr-only">{t('common:menuButton')}</span>
                </Popover.Button>
                <Popover.Panel className="absolute top-10 right-0 rounded bg-greenBrand dark:bg-greenBrandDark p-4 min-w-[160px] md:text-lg text-textLight z-10">
                    <div className="pb-2 mb-2 border-b-[1px] border-textLight flex flex-col items-center">
                        <Profile />
                    </div>
                    <nav className="flex flex-col gap-1 pl-1 font-medium">
                        <Link
                            className="hover:text-white hover:underline transition-all dark:hover:text-grayBrand"
                            href='/'
                        >
                            Home
                        </Link>
                        <div className="text-sm italic pl-2 capitalize">{t('common:categories')}</div>
                        {sortedCategories.map(category => (
                            <Link
                                key={category.tag}
                                className="capitalize hover:text-white dark:hover:text-grayBrand hover:underline transition-all"
                                href={`/category/${category.tag}`}
                            >
                                {category.tag}
                            </Link>
                        ))}
                        <Link
                            className="capitalize hover:text-white dark:hover:text-grayBrand hover:underline transition-all"
                            href={`/category/all`}
                        >
                            {t('common:all')}
                        </Link>
                    </nav>
                    <div className="border-t-[1px] border-textLight mt-2 pt-2 flex justify-center">
                        {user ? (
                            <button
                                onClick={() => revokeAuthentication()}
                                className="bg-greenBrandDark dark:bg-greenBrand hover:brightness-90 font-medium rounded py-[2px] px-3"
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsLoginModalOpen(true)}
                                className="bg-greenBrandDark dark:bg-greenBrand hover:brightness-90 font-medium rounded py-[2px] px-3"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </Popover.Panel>
            </Popover>
        </menu>
    )
}