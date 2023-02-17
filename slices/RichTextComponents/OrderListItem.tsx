import { ReactNode } from "react"

interface Props {
    children: ReactNode
}

export function OrderListItem({ children }: Props): JSX.Element {
    return (
        <li className="ml-4 list-decimal">{children}</li>
    )
}