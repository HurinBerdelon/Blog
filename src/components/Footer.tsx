import { Category } from "@/types/Category";
import Link from "next/link";
import { LinkedinLogo, EnvelopeSimple } from "phosphor-react";

interface FooterProps {
    sortedCategories: Category[]
}

export function Footer({ sortedCategories }: FooterProps): JSX.Element {

    return (
        <footer className="flex justify-between p-2 bg-greenBrand justify-self-end">
            <div className="w-10">
                <img src="/images/logo.svg" alt="blog logo" className="cover" />
            </div>
            <div className="grid grid-cols-2 w-3/4">
                <div className="flex flex-col items-center">
                    <Link href={'/'}>Home</Link>
                </div>
                <div className="flex flex-col">
                    <div className="font-medium">Categories</div>
                    {sortedCategories.map(category => (
                        <Link className="capitalize italic" href={`/list/${category.tag}`} key={category.tag}>
                            {category.tag}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center text-3xl">
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