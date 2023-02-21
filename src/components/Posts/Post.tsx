import { AllDocumentTypes } from ".slicemachine/prismicio"
import { formatDate } from "@/services/dayjs"
import { SliceZone } from "@prismicio/react"
import Link from "next/link"
import { components } from "slices"
import { Share } from "../Share"
import Image from 'next/image'
import { CommentInput } from "../Comments/CommentInput"
import { Comment } from "../Comments/Comment"
import { useTranslation } from "next-i18next"
import { useEffect } from "react"
import { useInteraction } from "@/hooks/useInteractions"
import { InteractiveLike } from "../Comments/InteractiveLike"

interface PostProps {
    post: AllDocumentTypes
}

export function Post({ post }: PostProps): JSX.Element {
    const { t } = useTranslation()
    const { interactions, getInteractions } = useInteraction()

    const numberOfComments = interactions?.comments.reduce((acc, comment) => {
        return acc + comment.answers.length + 1
    }, 0)

    useEffect(() => {
        getInteractions(post.uid)
    }, [post, getInteractions])

    return (
        <article className="flex flex-col mx-auto w-full md:w-[720px] xl:w-[1120px] text-backgroundDark dark:text-textLight">
            <div>
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
                        <div className="w-full h-60 lg:h-96 bg-gradient-to-br from-greenBrand to-textLight" />
                    )
                }
            </div >
            <h1 className="mt-6 self-center text-4xl font-medium">{post.data.title_of_the_post}</h1>

            <div className="px-4 flex gap-3 italic font-medium capitalize text-sm">
                {post.tags.map(tag => (
                    <Link key={tag} className="hover:text-greenBrandDark dark:hover:text-grayBrand" href={`/list/${tag}`}>{tag}</Link>
                ))}
            </div>

            <div className="py-2 px-4 flex gap-6 items-center mb-6">
                <span>{post.data.author}</span>
                <span className="italic text-sm">{formatDate(post.first_publication_date)}</span>
            </div>

            <div className="flex flex-col">
                <SliceZone slices={post.data.slices} components={components} />
            </div>

            <div className="self-center mt-8 w-3/4 border-b-[1px] border-double border-greenBrandDark dark:border-textLight" />

            <div className='px-4 my-8 flex justify-between'>
                <InteractiveLike className="text-xl" likes={interactions?.likes} />
                <Share postLink={`${process.env.NEXT_PUBLIC_BLOG_URL}/post/${post.uid}`} />
            </div>

            <div className="flex flex-col px-4 gap-5 mb-8">
                <div className="font-medium">
                    {t('common:comments')}
                    <span className="ml-2 text-sm">{`(${numberOfComments})`}</span>
                </div>
                <CommentInput />
                {interactions?.comments.map(comment => (
                    <Comment comment={comment} key={comment.id} />
                ))}
            </div>
        </article >
    )
}