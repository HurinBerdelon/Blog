import { useInteraction } from "@/hooks/useInteractions"
import { useState } from "react"

interface CommentInputProps {
    defaultComment?: string
    commentId?: string
    update?: (content: string, id: string) => void
    setIsUpdating?: (isUpdating: boolean) => void
}

export function CommentInput({ defaultComment = '', update = null, commentId = '', setIsUpdating = null }: CommentInputProps): JSX.Element {

    const [content, setContent] = useState(defaultComment)
    const { saveComment } = useInteraction()

    async function handleSubmit() {
        if (content) {
            if (update) await update(content, commentId)
            else saveComment(content)
        }
        setIsUpdating(false)
    }

    function handleCancel() {
        setContent('')
        if (setIsUpdating) setIsUpdating(false)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            {update
                ? <label htmlFor="commentArea" className="sr-only">Update Your Comment</label>
                : <label htmlFor="commentArea">Give a comment</label>
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