import { useInteraction } from "@/hooks/useInteractions"
import { useTranslation } from "next-i18next"
import { useState } from "react"

interface CommentInputProps {
    defaultComment?: string
    commentId?: string
    update?: (content: string, id: string) => Promise<void>
    setIsUpdating?: (isUpdating: boolean) => void
    saveAnswer?: (content: string, commentId: string) => Promise<void>
    setShowAnswerInput?: (showAnswer: boolean) => void
}

export function CommentInput({
    defaultComment = '',
    commentId = '',
    update = null,
    setIsUpdating = null,
    saveAnswer = null,
    setShowAnswerInput = null
}: CommentInputProps): JSX.Element {

    const [content, setContent] = useState(defaultComment)
    const { saveComment } = useInteraction()
    const { t } = useTranslation()

    async function handleSubmit() {
        if (content) {
            if (update) {
                await update(content, commentId)
                setContent('')
                setIsUpdating(false)
            }
            else if (saveAnswer) {
                await saveAnswer(content, commentId)
                setContent('')
                setShowAnswerInput(false)
            }
            else saveComment(content)
        }
    }

    function handleCancel() {
        setContent('')
        if (setIsUpdating) setIsUpdating(false)
        if (setShowAnswerInput) setShowAnswerInput(false)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
            {update || saveAnswer
                ? <label htmlFor="commentArea" className="sr-only">{t('common:updateYourContent')}</label>
                : <label htmlFor="commentArea">{t('common:giveAComment')}</label>
            }
            <textarea
                id="commentArea"
                onChange={(event) => setContent(event.target.value)}
                value={content}
                className="w-full scrollbar-light dark:scrollbar-dark p-2 text-justify overflow-auto resize-none focus:border-greenBrand focus:outline-none rounded border-2 border-grayBrand dark:bg-black dark:border-greenBrandDark"
            />
            {content.length > 0 ? (
                <div className={`self-end flex gap-4 mt-2 ${update ? 'mb-2' : ''}`}>
                    <button
                        type="button"
                        className="underline"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 bg-greenBrand rounded text-textLight font-medium dark:bg-greenBrandDark"
                    >
                        Save
                    </button>
                </div>
            ) : null}
        </form>
    )
}