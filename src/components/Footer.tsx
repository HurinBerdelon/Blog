import Link from "next/link";
import { LinkedinLogo, EnvelopeSimple } from "phosphor-react";

export function Footer(): JSX.Element {

    return (
        <footer className="flex justify-between p-2 bg-greenBrand justify-self-end">
            <div className="w-10">
                <img src="/images/logo.svg" alt="blog logo" className="cover" />
            </div>
            <div className="flex gap-2 items-center">
                {/* Category Links */}
                <p>Page1</p>
                <p>Page2</p>
                <p>Page3</p>
                <p>Page4</p>
            </div>
            <div className="flex gap-2 items-center text-3xl">
                <Link href='https://www.linkedin.com/in/fernando-henrique-p-cardozo/'>
                    <span className="sr-only">LinkedIn</span>
                    <LinkedinLogo />
                </Link>
                <Link href='mailto:fhpcardozo@gmail.com'>
                    <span className="sr-only">Email</span>
                    <EnvelopeSimple />
                </Link>
            </div>
        </footer>
    )
}