import { Query } from "@prismicio/types"
import Link from "next/link"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { Pagination } from "../Pagination"
import { PostCard } from "./PostCard"
import { AllDocumentTypesExtended } from "@/schema/AllDocumentTypesExtended"
import { useEffect, useState } from "react"
import { fetchLikesAndComments } from "@/services/fetchLikesAndComments"

interface ListOfPostsProps {
    title: string
    posts: Query<AllDocumentTypesExtended>
    showPagination?: boolean
    seeAllPosts?: boolean
}

export function ListOfPosts({ posts, title, showPagination = false, seeAllPosts = false }: ListOfPostsProps): JSX.Element {

    const [recentPosts, setRecentPosts] = useState<Query<AllDocumentTypesExtended>>(posts)
    const router = useRouter()
    const { t } = useTranslation()

    useEffect(() => {
        fetchLikesAndComments(posts).then(response => setRecentPosts(response))
    }, [posts])

    function onPageChange(page: number) {
        const path = router.asPath.split('?')[0]
        router.push(`${path}?page=${page}`)
    }

    return (
        <section className="flex flex-col my-4 mx-auto w-full md:w-[720px] xl:w-[1120px] text-backgroundDark dark:text-textLight">
            <h2 className="text-2xl my-4 capitalize self-center font-semibold">{title}</h2>
            {recentPosts.results.length > 0 ? (
                <>
                    <ul className="list-none flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-16 md:justify-center flex-1">
                        {recentPosts.results.map(post => (
                            <PostCard post={post} key={post.id} />
                        ))}
                    </ul>
                    {showPagination ? (
                        <div className="mt-6 flex flex-col items-center justify-self-end">
                            <Pagination totalCountOfRegisters={recentPosts.total_results_size} currentPage={recentPosts.page} onPageChange={onPageChange} />
                        </div>
                    ) : null}
                    {seeAllPosts ? (
                        <div className="flex justify-center mt-4">
                            <Link className="underline underline-offset-2 hover:text-greenBrandDark dark:hover:text-grayBrand" href="/category/all">{t('common:seeAllPosts')}</Link>
                        </div>
                    ) : null}
                </>
            ) : <div className="self-center justify-self-center">{t('common:noPostsHere')}</div>
            }
        </section>
    )
}