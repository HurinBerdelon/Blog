import { Heart, Chat } from "phosphor-react"

interface Likes {
    className?: string
    showComments?: boolean
}

export function Likes({ className = '', showComments = false }: Likes): JSX.Element {
    return (
        <div className={`flex gap-2 items-center ${className}`}>
            <div className="flex flex-col items-center gap-1">
                <span className="sr-only">Number of Likes</span>
                <Heart weight="bold" />
                <span className="text-base">3000</span>
            </div>
            {showComments ? (
                <div className="flex flex-col items-center gap-1">
                    <span className="sr-only">Number of Comments</span>
                    <Chat weight="bold" />
                    <span className="text-base">2355</span>
                </div>
            ) : null}
        </div>
    )
}