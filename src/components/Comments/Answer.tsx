import { Answer, Like } from "@/schema/Interactions"
import { formatDate } from "@/services/dayjs"
import { useTranslation } from "next-i18next"
import { useUser } from "@/hooks/useUser"
import { useEffect, useState } from "react"
import { useInteraction } from "@/hooks/useInteractions"
import { CommentInput } from "./CommentInput"
import { LikeIcon } from "./LikeIcon"
import { useLogin } from "@/hooks/useLogin"
import { Spinner } from "phosphor-react"

interface AnswerProps {
    answer: Answer
}

export function Answer({ answer }: AnswerProps): JSX.Element {

    const { LikeAnswer, UnlikeAnswer, updateAnswer, deleteAnswer } = useInteraction()
    const [userLike, setUserLike] = useState<Like>(null)
    const [isUpdating, setIsUpdating] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { setIsLoginModalOpen } = useLogin()
    const { t } = useTranslation()
    const { user } = useUser()

    useEffect(() => {
        const like = answer.likes.find(like => like.userId === user?.id)
        setUserLike(like)
    }, [answer])

    async function handleLike() {
        if (!user) {
            setIsLoginModalOpen(true)
            return
        }
        if (userLike) {
            setIsLoading(true)
            await UnlikeAnswer(userLike.id)
            setIsLoading(false)
        }
        else {
            setIsLoading(true)
            await LikeAnswer(answer.id)
            setIsLoading(false)
        }
    }

    return (
        <div className="border-2 min-w-full border-grayBrand relative rounded p-2 pb-6 dark:border-greenBrandDark">
            <div className="flex gap-2 items-center">
                <span className="font-medium">{answer.author.name}</span>
                <span>-</span>
                <span className=" italic text-sm">{formatDate(answer.createdAt)}</span>
            </div>
            {isUpdating ? (
                <CommentInput
                    commentId={answer.id}
                    defaultComment={answer.content}
                    update={updateAnswer}
                    setIsUpdating={setIsUpdating}
                />
            ) : (
                <div className="text-justify mt-2">
                    {answer.content}
                </div>
            )}

            <div className="flex gap-2 items-center absolute right-2 dark:border-greenBrandDark bg-textLight dark:bg-backgroundDark z-10 -bottom-2 px-2 rounded border-2 border-grayBrand">
                {answer.author.id === user?.id ? (
                    <>
                        <button
                            className="text-sm mx-1 hover:underline"
                            onClick={() => setIsUpdating(true)}
                        >
                            {t('common:edit')}
                        </button>
                        <button
                            className="text-sm mx-1 hover:underline"
                            onClick={() => deleteAnswer(answer.id)}
                        >
                            {t('common:delete')}
                        </button>
                    </>
                ) : null}
                <button
                    onClick={handleLike}
                    className={`flex gap-1 items-center text-lg ${isLoading ? 'cursor-default' : ''}`}
                    disabled={isLoading}
                >
                    <span className="sr-only">{t('common:likeThisComment')}</span>
                    {isLoading
                        ? <Spinner className="animate-spin text-backgroundDark dark:text-textLight" />
                        : <LikeIcon isLiked={userLike ? true : false} />
                    }
                    <span>{answer.likes.length}</span>
                </button>
            </div>
        </div>
    )
}