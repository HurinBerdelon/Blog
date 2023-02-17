import { ReactNode } from "react"

interface Props {
    children: ReactNode
}

export function Heading5({ children }: Props) {
    return (
        <h5 className="text-xl">{children}</h5>
    )
}