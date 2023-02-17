import { ReactNode } from "react"

interface Props {
    children: ReactNode
}

export function List({ children }: Props): JSX.Element {
    return (
        <ul className="pl-8">{children}</ul>
    )
}