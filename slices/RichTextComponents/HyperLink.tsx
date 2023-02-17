import { RTLinkNode } from "@prismicio/types";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
    children: ReactNode
    node: RTLinkNode
}

export function HyperLink({ children, node }: Props) {
    return (
        <Link
            className='underline hover:text-greenBrandDark italic dark:hover:text-grayBrand'
            href={node.data.url}
        >
            {children}
        </Link>
    )
}