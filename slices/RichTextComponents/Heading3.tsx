import { ReactNode } from "react"

interface Props {
    children: ReactNode
}

export function Heading3({ children }: Props) {
    return (
        <h3 className="text-3xl">{children}</h3>
    )
}