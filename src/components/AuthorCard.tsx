import { AllDocumentTypesExtended } from "@/schema/AllDocumentTypesExtended"
import { PrismicAuthor } from "@/schema/Author"
import { formatDate } from "@/services/dayjs"
import Image from "next/image"

interface AuthorCardProps {
    post: AllDocumentTypesExtended
}

export function AuthorCard({ post }: AuthorCardProps): JSX.Element {

    const author: PrismicAuthor = post.data.author as any

    return (
        <div className="flex gap-2 items-center">
            <div className="w-10 rounded-full">
                <Image
                    width={40}
                    height={40}
                    src={author.data.authorprofileimage.url}
                    alt={author.data.authorprofileimage.alt}
                    className="rounded-full object-cover"
                />
            </div>
            <div className="flex flex-col">
                <span className="font-medium">{author.data.name}</span>
                <span className="italic text-sm">{formatDate(post.first_publication_date)}</span>
            </div>
        </div>
    )
}