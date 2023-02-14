import { AllDocumentTypes } from ".slicemachine/prismicio"
import { PostType } from "@/types/Post"
import { Share } from "../Share"

interface PostProps {
    post: AllDocumentTypes
}

export function Post({ post }: PostProps): JSX.Element {

    return (
        <section className="flex flex-col">
            <div className="bg-zinc-200">
                {post.data.banner.url
                    ? (
                        <div className="w-full">
                            <img src={post.data.banner.url} alt={post.data.banner.alt as string} className="cover" />
                        </div>
                    )
                    : (
                        <div className="w-full h-60 lg:h-96 bg-gradient-to-br from-greenBrand to-zinc-200" />
                    )}
            </div>
            <h1 className="my-2 self-center text-2xl font-medium">{post.data.title_of_the_post}</h1>
            <div className="my-2 px-4 flex flex-col gap-2">
                <p className="text-justify">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore corrupti, minima mollitia veritatis sed nam dicta amet fugiat numquam repellat ea quibusdam! Delectus minima nulla laboriosam! Reiciendis corporis vero dolorum.
                </p>
                <p className="text-justify">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore corrupti, minima mollitia veritatis sed nam dicta amet fugiat numquam repellat ea quibusdam! Delectus minima nulla laboriosam! Reiciendis corporis vero dolorum.
                </p>
            </div>
            <div className='px-4 my-4'>
                <Share postLink={`${process.env.NEXT_PUBLIC_BLOG_URL}/post/${post.uid}`} />
            </div>
        </section>
    )
}