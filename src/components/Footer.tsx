import Link from "next/link";

export function Footer(): JSX.Element {

    return (
        <footer>
            <div>
                <img src="/images/logo.svg" alt="blog logo" />
            </div>
            <div className="siteMap">
                <Link href='#'>Link 1</Link>
                <Link href='#'>Link 2</Link>
                <Link href='#'>Link 3</Link>
            </div>
        </footer>
    )
}