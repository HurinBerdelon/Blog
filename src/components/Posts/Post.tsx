import { AllDocumentTypes } from ".slicemachine/prismicio"
import { formatDate } from "@/services/dayjs"
import { SliceZone } from "@prismicio/react"
import Link from "next/link"
import { components } from "slices"
import { Share } from "../Share"
import Image from 'next/image'

interface PostProps {
    post: AllDocumentTypes
}

export function Post({ post }: PostProps): JSX.Element {

    return (
        <article className="flex flex-col mx-auto w-full md:w-[720px] xl:w-[1120px] text-backgroundDark">
            <div className="bg-zinc-200">
                {post.data.banner.url
                    ? (
                        <div className="w-full">
                            <Image
                                width={post.data.banner.dimensions.width}
                                height={post.data.banner.dimensions.height}
                                src={post.data.banner.url}
                                alt={post.data.banner.alt as string}
                                className="cover w-full"
                            />
                        </div>
                    )
                    : (
                        <div className="w-full h-60 lg:h-96 bg-gradient-to-br from-greenBrand to-zinc-200" />
                    )}
            </div>
            <h1 className="mt-6 self-center text-2xl font-medium">{post.data.title_of_the_post}</h1>

            <div className="px-4 flex gap-3 italic font-medium capitalize text-sm">
                {post.tags.map(tag => (
                    <Link key={tag} className="hover:text-greenBrandDark" href={`/list/${tag}`}>{tag}</Link>
                ))}
            </div>

            <div className="py-2 px-4 flex gap-6 items-center mb-6">
                <span>{post.data.author}</span>
                <span className="italic text-sm">{formatDate(post.first_publication_date)}</span>
            </div>

            <div className="flex flex-col">
                <SliceZone slices={post.data.slices} components={components} />
            </div>

            <div className='px-4 my-4'>
                <Share postLink={`${process.env.NEXT_PUBLIC_BLOG_URL}/post/${post.uid}`} />
            </div>
        </article>
    )
}