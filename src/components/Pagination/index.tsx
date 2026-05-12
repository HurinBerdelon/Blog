import { pageSize } from "@/config/pageSize";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { PaginationItem } from "./PaginationItem";
// import { PaginationItem } from "../PaginationItem";

interface PaginationProps {
    totalCountOfRegisters: number
    registerPerPage?: number
    currentPage?: number
    onPageChange: (page: number) => void
}

const siblingsCount = 2

function generatePagesArray(from: number, to: number) {
    return [...new Array(to - from)].map((_, index) => {
        return from + index + 1
    }).filter(page => page > 0)
}

export function Pagination({
    totalCountOfRegisters,
    onPageChange,
    currentPage = 1,
    registerPerPage = pageSize,
}: PaginationProps): JSX.Element {

    const { t } = useTranslation()

    const [showing, _] = useState({
        from: (currentPage - 1) * registerPerPage + 1,
        to: Math.min(currentPage * registerPerPage, totalCountOfRegisters),
        total: totalCountOfRegisters
    })

    const lastPage = Math.ceil(totalCountOfRegisters / registerPerPage)

    const previousPages = currentPage > 1
        ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
        : []

    const nextPages = currentPage < lastPage
        ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
        : []

    return (
        <>
            <div className="italic text-backgroundDark dark:text-textLight">
                {t('common:showing')} <strong>{showing.from}</strong> - <strong> {showing.to} </strong> {t('common:of')} <strong> {showing.total} </strong>
            </div>

            <div className="flex gap-2 mt-2">
                {currentPage > (1 + siblingsCount)
                    && <>
                        <PaginationItem number={1} onPageChange={onPageChange} />
                        {currentPage > (2 + siblingsCount)
                            && <span className="threePoints">...</span>
                        }
                    </>
                }

                {previousPages.length > 0 && previousPages.map(page => (
                    <PaginationItem number={page} key={page} onPageChange={onPageChange} />
                ))}

                <PaginationItem number={currentPage} isCurrent={true} onPageChange={onPageChange} />

                {nextPages.length > 0 && nextPages.map(page => (
                    <PaginationItem number={page} key={page} onPageChange={onPageChange} />
                ))}

                {currentPage + siblingsCount < lastPage
                    && <>
                        {currentPage + 1 + siblingsCount < lastPage
                            && <span className="threePoints">...</span>
                        }
                        <PaginationItem number={lastPage} onPageChange={onPageChange} />
                    </>
                }
            </div>
        </>
    )
}