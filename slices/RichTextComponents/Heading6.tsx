import { ReactNode } from "react"

interface Props {
    children: ReactNode
}

export function Heading6({ children }: Props) {
    return (
        <h6 className="text-xl">{children}</h6>
    )
}