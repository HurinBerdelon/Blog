import { PostType } from "@/types/Post"
import { Share } from "../Share"

interface PostProps {
    post: PostType
}

export function Post({ post }: PostProps): JSX.Element {

    return (
        <>
            <h1>{post.title}</h1>
            <div>
                <img src={post.bannerImage.src} alt={post.bannerImage.alt} />
            </div>
            <div>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore corrupti, minima mollitia veritatis sed nam dicta amet fugiat numquam repellat ea quibusdam! Delectus minima nulla laboriosam! Reiciendis corporis vero dolorum.
                </p>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore corrupti, minima mollitia veritatis sed nam dicta amet fugiat numquam repellat ea quibusdam! Delectus minima nulla laboriosam! Reiciendis corporis vero dolorum.
                </p>
            </div>
            <div>
                <Share postLink={`${process.env.NEXT_PUBLIC_BLOG_URL}/post/${post.slug}`} />
            </div>
        </>
    )
}