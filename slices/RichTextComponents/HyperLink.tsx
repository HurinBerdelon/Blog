import { RTLinkNode } from "@prismicio/types";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
    children: ReactNode
    node: RTLinkNode
}

export function HyperLink({ children, node }: Props) {
    const url = node.data.url ?? ''
    const referenceMatch = /^#ref-(\d+)$/.exec(url)

    if (referenceMatch) {
        return (
            <a href={url} id={`cite-ref-${referenceMatch[1]}`} className="text-xs align-super no-underline hover:underline">
                {children}
            </a>
        )
    }

    return (
        <Link
            className='underline hover:text-greenBrandDark italic dark:hover:text-grayBrand'
            href={url}
        >
            {children}
        </Link>
    )
}