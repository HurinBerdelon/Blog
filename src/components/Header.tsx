import { Category } from "@/types/Category";
import Link from "next/link";
import { IdiomSwitcher } from "./IdiomSwitcher";
import { PopoverMenu } from "./PopoverMenu";

interface HeaderProps {
    sortedCategories: Category[]
}

export function Header({ sortedCategories }: HeaderProps): JSX.Element {

    return (
        <header className="flex justify-between p-2 shadow-lg">
            <Link href='/' className="w-10">
                <img src="/images/logo.svg" alt="blog logo" className="cover" />
                <span className="sr-only">Link to Home Page</span>
            </Link>
            <div className="flex items-center gap-3">
                <div className="flex gap-3">
                    {sortedCategories.slice(0, 3).map(category => (
                        <Link key={category.tag} href={`/list/${category.tag}`} className="capitalize">
                            {category.tag}
                        </Link>
                    ))}
                </div>
                <IdiomSwitcher />
                <PopoverMenu sortedCategories={sortedCategories} />
            </div>
        </header>
    )
}