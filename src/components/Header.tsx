import Link from "next/link";
import { IdiomSwitcher } from "./IdiomSwitcher";
import { PopoverMenu } from "./PopoverMenu";

export function Header(): JSX.Element {

    return (
        <header>
            <div className="logoContainer">
                <Link href='/'>
                    <img src="/images/logo.svg" alt="blog logo" />
                    <span className="sr-only">Link to Home Page</span>
                </Link>
                <IdiomSwitcher />
                <PopoverMenu />
            </div>
        </header>
    )
}