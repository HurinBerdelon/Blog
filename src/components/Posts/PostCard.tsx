import { PostType } from "@/types/Post"
import Link from "next/link"

interface PostCardProps {
    post: PostType
}

export function PostCard({ post }: PostCardProps): JSX.Element {

    return (
        <li className="border-[1px] border-black w-[80vw] self-center rounded">
            <Link href={`post/${post.title}`} className="flex flex-col gap-2">
                <h3 className="self-center text-xl font-semibold py-2">{post.title}</h3>
                <div className="w-full">
                    <img src={post.bannerImage.src} alt={post.bannerImage.alt} className="cover" />
                </div>
                <div className="py-2 px-3 text-justify">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam commodi, sequi consequatur neque dolorem molestiae quam harum! Non sed maxime, possimus facilis eligendi velit delectus excepturi magnam enim dolorum quis.
                </div>
                <div className="pb-2 px-3">
                    author surname
                </div>
            </Link>
        </li>
    )
}