import { AllDocumentTypes } from ".slicemachine/prismicio"
import { Query } from "@prismicio/types"
import Link from "next/link"
import { useRouter } from "next/router"
import { Pagination } from "../Pagination"
import { PostCard } from "./PostCard"

interface ListOfPostsProps {
    title: string
    posts: Query<AllDocumentTypes>
    showPagination?: boolean
    seeAllPosts?: boolean
}

export function ListOfPosts({ posts, title, showPagination = false, seeAllPosts = false }: ListOfPostsProps): JSX.Element {

    const router = useRouter()

    function onPageChange(page: number) {
        const path = router.asPath.split('?')[0]
        router.push(`${path}?page=${page}`)
    }

    return (
        <section className="flex flex-col my-4 mx-auto w-full md:w-[720px] xl:w-[1120px] text-backgroundDark">
            <h2 className="text-2xl my-4 capitalize self-center font-semibold">{title}</h2>
            {posts.results.length > 0 ? (
                <>
                    <ul className="list-none flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-8 md:justify-center flex-1">
                        {posts.results.map(post => (
                            <PostCard post={post} key={post.id} />
                        ))}
                    </ul>
                    {showPagination ? (
                        <div className="mt-6 flex flex-col items-center justify-self-end">
                            <Pagination totalCountOfRegisters={posts.total_results_size} currentPage={posts.page} onPageChange={onPageChange} />
                        </div>
                    ) : null}
                    {seeAllPosts ? (
                        <div className="flex justify-center mt-4">
                            <Link className="underline underline-offset-2 hover:text-greenBrandDark" href="/list/all">See all posts</Link>
                        </div>
                    ) : null}
                </>
            ) : <div className="self-center justify-self-center">No Posts Here.</div>
            }
        </section>
    )
}