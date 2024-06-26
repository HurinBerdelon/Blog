import { AllDocumentTypesExtended } from "@/schema/AllDocumentTypesExtended"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { AuthorCard } from "../AuthorCard"
import { Likes } from "../Likes"

interface PostCardProps {
    post: AllDocumentTypesExtended
}

export function PostCard({ post }: PostCardProps): JSX.Element {

    const [textPreview] = useState(() => {
        const textPreview = post.data.slices[0]?.primary.text_content[0]?.text as string
        if (textPreview?.length > 150) return `${textPreview.slice(0, 145)}...`
        return textPreview
    })

    return (
        <motion.li
            className="border-[1px] h-[480px] border-backgroundDark dark:border-textLight w-[80vw] self-center rounded max-w-xs hover:border-greenBrandDark hover:text-greenBrandDark dark:hover:text-grayBrand dark:hover:border-grayBrand"
            whileHover={{
                scale: 1.025
            }}
        >
            <Link href={`/post/${post.uid}`} className="flex flex-col gap-2 flex-1 h-full justify-between">
                <h3 className="self-center text-xl text-center px-2 font-semibold py-2">{post.data.title_of_the_post}</h3>
                <div className="w-full flex items-center">
                    <Image
                        width={post.data.banner.dimensions?.width}
                        height={post.data.banner.dimensions?.height}
                        src={post.data.banner.url as string}
                        alt={post.data.banner.alt as string}
                        className="object-cover w-full flex-1"
                    />
                </div>
                <div className="px-3 flex gap-3 italic font-medium capitalize text-sm">
                    {post.tags.map(tag => (
                        <span key={tag}>{tag || null}</span>
                    ))}
                </div>
                <div className="py-2 px-3 text-justify">
                    {textPreview}
                </div>
                <div className="px-2 pb-2 flex justify-between">
                    <AuthorCard post={post} />
                    <Likes showComments={true} interactions={{ likes: post.likes, comments: post.comments }} />
                </div>
            </Link>
        </motion.li>
    )
}