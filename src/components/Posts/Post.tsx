import { BlogPostDocument } from ".slicemachine/prismicio"
import { SliceZone } from "@prismicio/react"
import Link from "next/link"
import { components } from "slices"
import { Share } from "../Share"
import Image from 'next/image'
import { CommentInput } from "../Comments/CommentInput"
import { Comment } from "../Comments/Comment"
import { useTranslation } from "next-i18next"
import { useEffect, useState } from "react"
import { useInteraction } from "@/hooks/useInteractions"
import { InteractiveLike } from "../Comments/InteractiveLike"
import { useUser } from "@/hooks/useUser"
import { useLogin } from "@/hooks/useLogin"
import { AuthorCard } from "../AuthorCard"
import { AllDocumentTypesExtended } from "@/schema/AllDocumentTypesExtended"
import { useRouter } from "next/router"

interface PostProps {
    post: BlogPostDocument
}

export function Post({ post }: PostProps): JSX.Element {
    const { interactions, getInteractions } = useInteraction()
    const [numberOfComments, setNumberOfComments] = useState(0)
    const { setIsLoginModalOpen } = useLogin()
    const { t } = useTranslation()
    const { user } = useUser()
    const router = useRouter()

    useEffect(() => {
        setNumberOfComments(
            interactions?.comments.reduce((acc, comment) => {
                return acc + comment.answers.length + 1
            }, 0)
        )
    }, [interactions])

    useEffect(() => {
        getInteractions(post.uid)
    }, [post])

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
                                className="object-cover w-full"
                            />
                        </div>
                    )
                    : (
                        <div className="w-full h-60 lg:h-96 bg-gradient-to-br from-greenBrand to-textLight" />
                    )
                }
            </div >
            <h1 className="mt-6 self-center px-4 text-center text-4xl font-medium">{post.data.title_of_the_post}</h1>

            <div className="px-4 flex gap-3 italic font-medium capitalize text-sm">
                {post.tags.map(tag => (
                    <Link key={tag} className="hover:text-greenBrandDark dark:hover:text-grayBrand" href={`/list/${tag}`}>{tag}</Link>
                ))}
            </div>

            <div className="py-2 px-4 flex gap-6 items-center mb-6">
                <AuthorCard post={post as AllDocumentTypesExtended} />
            </div>

            <div className="flex flex-col">
                <SliceZone slices={post.data.slices} components={components} />
            </div>

            <div className="self-center mt-8 w-3/4 border-b-[1px] border-double border-greenBrandDark dark:border-textLight" />

            <div className='px-4 my-8 flex justify-between'>
                <InteractiveLike className="text-xl" likes={interactions?.likes} />
                <Share
                    title={post.data.title_of_the_post}
                    postLink={`${process.env.NEXT_PUBLIC_BLOG_URL}/${router.locale}/post/${post.uid}`}
                />
            </div>

            <div className="flex flex-col px-4 gap-5 mb-8">
                <div className="font-medium">
                    {t('common:comments')}
                    <span className="ml-2 text-sm">{`(${numberOfComments})`}</span>
                </div>
                {user ? <CommentInput /> : (
                    <button
                        onClick={() => setIsLoginModalOpen(true)}
                        className="hover:underline w-fit"
                    >
                        {t('common:signInToCommnet')}
                    </button>
                )}
                {interactions?.comments.map(comment => (
                    <Comment comment={comment} key={comment.id} />
                ))}
            </div>
        </article >
    )
}