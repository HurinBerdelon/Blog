import { ReactNode } from "react"

interface Props {
    children: ReactNode
}

export function Heading2({ children }: Props) {
    return (
        <h2 className="text-2xl">{children}</h2>
    )
}