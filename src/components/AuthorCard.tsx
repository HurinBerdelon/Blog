import { formatDate } from "@/services/dayjs"

interface AuthorCardProps {
    author: any // TODO: remove this any
}

export function AuthorCard({ author }: AuthorCardProps): JSX.Element {
    return (
        <div className="flex gap-2 items-center">
            <div className="w-10">
                <img src="/images/logo.svg" alt="" />
            </div>
            <div className="flex flex-col">
                <span className="font-medium">{author.data.author}</span>
                <span className="italic text-sm">{formatDate(author.first_publication_date)}</span>
            </div>
        </div>
    )
}