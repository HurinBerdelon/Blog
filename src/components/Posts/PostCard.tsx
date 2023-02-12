import { PostType } from "@/types/Post"
import Link from "next/link"

interface PostCardProps {
    post: PostType
}

export function PostCard({ post }: PostCardProps): JSX.Element {

    return (
        <li>
            <Link href={`post/${post.title}`}>
                <h3>{post.title}</h3>
                <div>
                    <img src={post.bannerImage.src} alt={post.bannerImage.alt} />
                </div>
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam commodi, sequi consequatur neque dolorem molestiae quam harum! Non sed maxime, possimus facilis eligendi velit delectus excepturi magnam enim dolorum quis.
                </div>
                <div>
                    author surname
                </div>
            </Link>
        </li>
    )
}