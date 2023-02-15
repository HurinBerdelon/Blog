import { AllDocumentTypes } from ".slicemachine/prismicio"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"

interface PostCardProps {
    post: AllDocumentTypes
}

export function PostCard({ post }: PostCardProps): JSX.Element {

    const [textPreview] = useState(() => {
        const textPreview = post.data.slices[0]?.primary.text_content[0]?.text as string
        if (textPreview?.length > 150) return `${textPreview.slice(0, 150)}...`
        return textPreview
    })

    return (
        <motion.li
            className="border-[1px] border-backgroundDark w-[80vw] self-center rounded max-w-xs hover:border-greenBrandDark hover:text-greenBrandDark"
            whileHover={{
                scale: 1.025
            }}
        >
            <Link href={`/post/${post.uid}`} className="flex flex-col gap-2">
                <h3 className="self-center text-xl font-semibold py-2">{post.data.title_of_the_post}</h3>
                <div className="w-full">
                    <img src={post.data.banner.url as string} alt={post.data.banner.alt as string} className="cover" />
                </div>
                <div className="py-2 px-3 text-justify">
                    {textPreview}
                </div>
                <div className="pb-2 px-3">
                    {post.data.author}
                </div>
            </Link>
        </motion.li>
    )
}