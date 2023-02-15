import { motion } from "framer-motion"

interface PaginationItemProps {
    isCurrent?: boolean
    number: number
    onPageChange: (page: number) => void
}

export function PaginationItem({ number, onPageChange, isCurrent = false }: PaginationItemProps): JSX.Element {

    if (isCurrent) {
        return (
            <button className="bg-greenBrand dark:bg-greenBrandDark text-textLight min-w-[28px] font-medium py-1 px-2 rounded" disabled={true}>
                {number}
            </button>
        )
    }

    return (
        <button
            className=" py-1 px-2 rounded border-[1px] border-transparent hover:border-backgroundDark dark:hover:border-textLight"
            onClick={() => onPageChange(number)}
        >
            {number}
        </button>
    )
}