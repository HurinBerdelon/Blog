import { AllDocumentTypes } from ".slicemachine/prismicio"
import { PostType } from "@/types/Post"
import { SliceZone } from "@prismicio/react"
import { components } from "slices"
import { Share } from "../Share"

interface PostProps {
    post: AllDocumentTypes
}

export function Post({ post }: PostProps): JSX.Element {

    return (
        <article className="flex flex-col mx-auto w-full md:w-[720px] xl:w-[1120px] text-greenBrandDark">
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
            <h1 className="my-6 self-center text-2xl font-medium">{post.data.title_of_the_post}</h1>
            <div className="flex flex-col">
                <SliceZone slices={post.data.slices} components={components} />
            </div>
            <div className='px-4 my-4'>
                <Share postLink={`${process.env.NEXT_PUBLIC_BLOG_URL}/post/${post.uid}`} />
            </div>
        </article>
    )
}