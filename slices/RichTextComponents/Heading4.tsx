import { ReactNode } from "react"

interface Props {
    children: ReactNode
}

export function Heading4({ children }: Props) {
    return (
        <h4 className="text-2xl">{children}</h4>
    )
}