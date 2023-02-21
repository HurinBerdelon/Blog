import { Heart, Chat, Spinner } from "phosphor-react"

interface LikesProps {
    interactions: { likes: number, comments: number }
    className?: string
    showComments?: boolean
}

export function Likes({ interactions, className = '', showComments = false }: LikesProps): JSX.Element {
    return (
        <div className={`flex gap-2 items-center ${className}`}>
            <div className="flex flex-col items-center gap-1">
                <span className="sr-only">Number of Likes</span>
                <Heart weight="bold" />
                <span className="text-base">
                    {interactions ? interactions?.likes : <Spinner className="animate-spin" />}
                </span>
            </div>
            {showComments ? (
                <div className="flex flex-col items-center gap-1">
                    <span className="sr-only">Number of Comments</span>
                    <Chat weight="bold" />
                    <span className="text-base">
                        {interactions ? interactions?.comments : <Spinner className="animate-spin" />}
                    </span>
                </div>
            ) : null}
        </div>
    )
}