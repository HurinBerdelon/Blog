import { PostType } from "@/types/Post"
import { Pagination } from "../Pagination"
import { PostCard } from "./PostCard"

interface ListOfPostsProps {
    title: string
    posts: PostType[]
    showPagination?: boolean
}

export function ListOfPosts({ posts, title, showPagination = false }: ListOfPostsProps): JSX.Element {

    return (
        <section className="flex flex-col my-4">
            <h2 className="text-2xl my-4 self-center font-semibold">{title}</h2>
            <ul className="list-none flex flex-col gap-4">
                {posts.map(post => (
                    <PostCard post={post} key={post.title} />
                ))}
            </ul>
            {/* {showPagination ? <Pagination /> : null} */}

        </section>
    )
}