import { useInteraction } from "@/hooks/useInteractions"
import { useUser } from "@/hooks/useUser"
import { Like } from "@/schema/Interactions"
import { useTranslation } from "next-i18next"
import { Heart, Spinner } from "phosphor-react"
import { useEffect, useState } from "react"

interface InteractiveLikeProps {
    likes: Like[]
    className?: string
}

export function InteractiveLike({ likes, className = '' }: InteractiveLikeProps): JSX.Element {
    const { likePost, unlikePost } = useInteraction()
    const { t } = useTranslation()
    const [userLike, setUserLike] = useState<Like>(null)
    const { user } = useUser()

    useEffect(() => {
        const like = likes?.find(like => like.userId === user.id)
        setUserLike(like)
    }, [likes])

    function handleLike() {
        if (!user) return
        if (userLike) unlikePost(userLike.id)
        else likePost()
    }

    return (
        <div className={`flex gap-2 items-center ${className}`}>
            <button
                className="flex flex-col items-center gap-1"
                onClick={handleLike}
            >
                <span className="sr-only">{t('common:numberOfLikes')}</span>
                <Heart weight={`${userLike ? 'fill' : 'bold'}`} className={`hover:brightness-90 ${userLike ? 'text-red-700' : ''}`} />
                <span className="text-base">
                    {likes ? likes.length : <Spinner className="animate-spin" />}
                </span>
            </button>
        </div>
    )
}