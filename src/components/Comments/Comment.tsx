import { Comment, Like } from "@/schema/Interactions"
import { formatDate } from "@/services/dayjs"
import { Heart } from "phosphor-react"
import { useEffect, useState } from "react"
import { useTranslation } from "next-i18next"
import { Answer } from "./Answer"
import { useUser } from "@/hooks/useUser"
import { useInteraction } from "@/hooks/useInteractions"
import { CommentInput } from "./CommentInput"

interface CommentProps {
    comment: Comment
}

export function Comment({ comment }: CommentProps): JSX.Element {
    const { LikeComment, UnlikeComment, updateComment, deleteComment, saveAnswer } = useInteraction()
    const [userLike, setUserLike] = useState<Like>(null)
    const [showAnswer, setShowAnswer] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [showAnswerInput, setShowAnswerInput] = useState(false)
    const { t } = useTranslation()
    const { user } = useUser()

    useEffect(() => {
        const like = comment.likes.find(like => like.userId === user?.id)
        setUserLike(like)
    }, [comment])

    function handleLike() {
        if (!user) return
        if (userLike) UnlikeComment(userLike.id)
        else LikeComment(comment.id)
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
                                Edit
                            </button>
                            <button
                                className="text-sm mx-1 hover:underline"
                                onClick={() => deleteComment(comment.id)}
                            >
                                Delete
                            </button>
                        </>
                    ) : null}
                    <button
                        className="text-sm mx-1 hover:underline"
                        onClick={() => setShowAnswerInput(state => !state)}
                    >
                        Reply
                    </button>
                    <button
                        className="flex gap-1 items-center text-lg"
                        onClick={handleLike}
                    >
                        <span className="sr-only">Like this comment</span>
                        <Heart weight={`${userLike ? 'fill' : 'bold'}`} className={`hover:brightness-90 ${userLike ? 'text-red-700' : ''}`} />
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