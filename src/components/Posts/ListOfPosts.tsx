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
        <section>
            <h2>{title}</h2>
            <ul className="list-none">
                {posts.map(post => (
                    <PostCard post={post} key={post.title} />
                ))}
            </ul>
            {/* {showPagination ? <Pagination /> : null} */}

        </section>
    )
}