interface PaginationItemProps {
    isCurrent?: boolean
    number: number
    onPageChange: (page: number) => void
}

export function PaginationItem({ number, onPageChange, isCurrent = false }: PaginationItemProps): JSX.Element {

    if (isCurrent) {
        return (
            <button className="bg-greenBrand text-white font-medium py-1 px-2 rounded" disabled={true}>
                {number}
            </button>
        )
    }

    return (
        <button className=" py-1 px-2 rounded" onClick={() => onPageChange(number)}>
            {number}
        </button>
    )
}