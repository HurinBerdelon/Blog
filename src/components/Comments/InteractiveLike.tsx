'use client'
import { useInteraction } from "@/hooks/useInteractions"
import { useLogin } from "@/hooks/useLogin"
import { useUser } from "@/hooks/useUser"
import { Like } from "@/schema/Interactions"
import { useTranslation } from '@/hooks/useTranslation'
import { Spinner } from "phosphor-react"
import { useState, type JSX } from "react"
import { LikeIcon } from "./LikeIcon"

interface InteractiveLikeProps {
    likes: Like[]
    className?: string
}

export function InteractiveLike({ likes, className = '' }: InteractiveLikeProps): JSX.Element {

    const [isLoading, setIsLoading] = useState(false)
    const { likePost, unlikePost } = useInteraction()
    const { setIsLoginModalOpen } = useLogin()
    const { t } = useTranslation()
    const { user } = useUser()

    const userLike = likes?.find(like => like.userId === user?.id) ?? null

    async function handleLike() {
        if (!user) {
            setIsLoginModalOpen(true)
            return
        }
        if (userLike) {
            setIsLoading(true)
            await unlikePost(userLike.id)
            setIsLoading(false)
        }
        else {
            setIsLoading(true)
            await likePost()
            setIsLoading(false)
        }
    }

    return (
        <div className={`flex gap-2 items-center ${className}`}>
            <button
                className={`flex flex-col items-center gap-1 ${isLoading ? 'cursor-default' : ''}`}
                disabled={isLoading}
                onClick={handleLike}
            >
                <span className="sr-only">{t('common:numberOfLikes')}</span>
                {isLoading
                    ? <Spinner className="animate-spin text-backgroundDark dark:text-textLight" />
                    : <LikeIcon isLiked={userLike ? true : false} />
                }
                <span className="text-base">
                    {likes ? likes.length : <Spinner className="animate-spin" />}
                </span>
            </button>
        </div>
    )
}