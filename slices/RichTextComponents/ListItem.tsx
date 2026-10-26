import { ReactNode, type JSX } from "react"

interface Props {
    children: ReactNode
}

export function ListItem({ children }: Props): JSX.Element {
    return (
        <li className="ml-4 list-disc">{children}</li>
    )
}