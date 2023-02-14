import Link from "next/link";
import { IdiomSwitcher } from "./IdiomSwitcher";
import { PopoverMenu } from "./PopoverMenu";

export function Header(): JSX.Element {

    return (
        <header className="flex justify-between p-2">
            <Link href='/' className="w-10">
                <img src="/images/logo.svg" alt="blog logo" className="cover" />
                <span className="sr-only">Link to Home Page</span>
            </Link>
            <div className="flex items-center gap-3">
                <IdiomSwitcher />
                <PopoverMenu />
            </div>
        </header>
    )
}