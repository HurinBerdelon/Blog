import { AllDocumentTypes } from ".slicemachine/prismicio"
import Link from "next/link"
import { Pagination } from "../Pagination"
import { PostCard } from "./PostCard"

interface ListOfPostsProps {
    title: string
    posts: AllDocumentTypes[]
    showPagination?: boolean
    seeAllPosts?: boolean
}

export function ListOfPosts({ posts, title, showPagination = false, seeAllPosts = false }: ListOfPostsProps): JSX.Element {

    return (
        <section className="flex flex-col my-4">
            <h2 className="text-2xl my-4 capitalize self-center font-semibold">{title}</h2>
            <ul className="list-none flex flex-col gap-4">
                {posts.map(post => (
                    <PostCard post={post} key={post.id} />
                ))}
            </ul>
            {/* {showPagination ? <Pagination /> : null} */}
            {seeAllPosts ? (
                <div className="flex justify-center mt-4">
                    <Link className="underline underline-offset-2" href="/list/all">See all posts</Link>
                </div>
            ) : null}

        </section>
    )
}