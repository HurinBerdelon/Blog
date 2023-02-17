import { ReactNode } from "react"

interface Props {
    children: ReactNode
}

export function OrderList({ children }: Props): JSX.Element {
    return (
        <ol className="pl-8">{children}</ol>
    )
}