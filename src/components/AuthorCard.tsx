import { AllDocumentTypesExtended } from "@/schema/AllDocumentTypesExtended"
import { formatDate } from "@/services/dayjs"

interface AuthorCardProps {
    post: AllDocumentTypesExtended
}

export function AuthorCard({ post }: AuthorCardProps): JSX.Element {
    return (
        <div className="flex gap-2 items-center">
            <div className="w-10">
                <img src="/images/logo.svg" alt="" />
            </div>
            <div className="flex flex-col">
                <span className="font-medium">{post.data.author}</span>
                <span className="italic text-sm">{formatDate(post.first_publication_date)}</span>
            </div>
        </div>
    )
}