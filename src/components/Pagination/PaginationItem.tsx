interface PaginationItemProps {
    isCurrent?: boolean
    number: number
    onPageChange: (page: number) => void
}

export function PaginationItem({ number, onPageChange, isCurrent = false }: PaginationItemProps): JSX.Element {

    if (isCurrent) {
        return (
            <button className="currentPage" disabled={true}>
                {number}
            </button>
        )
    }


    return (
        <button className="pages" onClick={() => onPageChange(number)}>
            {number}
        </button>
    )
}