import { Comment, Like } from "@/schema/Interactions"
import { formatDate } from "@/services/dayjs"
import { useEffect, useState } from "react"
import { useTranslation } from "next-i18next"
import { Answer } from "./Answer"
import { useUser } from "@/hooks/useUser"
import { useInteraction } from "@/hooks/useInteractions"
import { CommentInput } from "./CommentInput"
import { LikeIcon } from "./LikeIcon"
import { useLogin } from "@/hooks/useLogin"
import { Spinner } from "phosphor-react"

interface CommentProps {
    comment: Comment
}

export function Comment({ comment }: CommentProps): JSX.Element {

    const { LikeComment, UnlikeComment, updateComment, deleteComment, saveAnswer } = useInteraction()
    const [showAnswerInput, setShowAnswerInput] = useState(false)
    const [userLike, setUserLike] = useState<Like>(null)
    const [showAnswer, setShowAnswer] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { setIsLoginModalOpen } = useLogin()
    const { t } = useTranslation()
    const { user } = useUser()

    useEffect(() => {
        const like = comment.likes.find(like => like.userId === user?.id)
        setUserLike(like)
    }, [comment])

    async function handleLike() {
        if (!user) {
            setIsLoginModalOpen(true)
            return
        }
        if (userLike) {
            setIsLoading(true)
            await UnlikeComment(userLike.id)
            setIsLoading(false)
        }
        else {
            setIsLoading(true)
            await LikeComment(comment.id)
            setIsLoading(false)
        }
    }

    function handleReplyComment() {
        if (!user) {
            setIsLoginModalOpen(true)
            return
        }
        setShowAnswerInput(state => !state)
    }

    return (
        <div>

            <div className="border-2 border-grayBrand relative rounded p-2 pb-6 dark:border-greenBrandDark">
                <div className="flex gap-2 items-center">
                    <span className="font-medium">{comment.author.name}</span>
                    <span>-</span>
                    <span className=" italic text-sm">{formatDate(comment.createdAt)}</span>
                </div>
                {isUpdating ? (
                    <CommentInput
                        commentId={comment.id}
                        defaultComment={comment.content}
                        update={updateComment}
                        setIsUpdating={setIsUpdating}
                    />
                ) : (
                    <p className="text-justify mt-2">
                        {comment.content}
                    </p>
                )}
                <div className="flex gap-2 items-center absolute right-2 bg-textLight dark:bg-backgroundDark z-10 -bottom-2 px-2 rounded border-2 border-grayBrand dark:border-greenBrandDark">
                    {comment.author.id === user?.id ? (
                        <>
                            <button
                                className="text-sm mx-1 hover:underline"
                                onClick={() => setIsUpdating(true)}
                            >
                                {t('common:edit')}
                            </button>
                            <button
                                className="text-sm mx-1 hover:underline"
                                onClick={() => deleteComment(comment.id)}
                            >
                                {t('common:delete')}
                            </button>
                        </>
                    ) : null}
                    <button
                        className="text-sm mx-1 hover:underline"
                        onClick={handleReplyComment}
                    >
                        {t('common:reply')}
                    </button>
                    <button
                        className={`flex gap-1 items-center text-lg ${isLoading ? 'cursor-default' : ''}`}
                        disabled={isLoading}
                        onClick={handleLike}
                    >
                        <span className="sr-only">Like this comment</span>
                        {isLoading
                            ? <Spinner className="animate-spin text-backgroundDark dark:text-textLight" />
                            : <LikeIcon isLiked={userLike ? true : false} />
                        }
                        <span>{comment.likes.length}</span>
                    </button>
                </div>
            </div>
            <div className="mt-2 flex flex-col gap-3 items-start pl-12">
                {comment.answers.length > 0 ? (
                    <>
                        <button
                            className="hover:underline text-sm"
                            onClick={() => setShowAnswer(state => !state)}
                        >
                            {showAnswer
                                ? `${t('common:hideAnswer')} (${comment.answers.length})`
                                : `${t('common:showAnswer')} (${comment.answers.length})`}
                        </button>
                        {showAnswer ? (
                            <>
                                {comment.answers.map(answer => (
                                    <Answer key={answer.id} answer={answer} />
                                ))}
                            </>

                        ) : null}
                    </>
                ) : null}
                {showAnswerInput ? (
                    <CommentInput
                        commentId={comment.id}
                        saveAnswer={saveAnswer}
                        setShowAnswerInput={setShowAnswerInput}
                    />
                ) : null}
            </div>
        </div >
    )
}