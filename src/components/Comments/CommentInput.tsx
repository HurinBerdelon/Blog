import { useState } from "react"

export function CommentInput(): JSX.Element {

    const [content, setContent] = useState('')

    function handleSubmit() {

    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <label className="sr-only" htmlFor="commentArea">Type your comment commentHeader</label>
            <textarea
                id="commentArea"
                onChange={(event) => setContent(event.target.value)}
                className="w-full scrollbar-light dark:scrollbar-dark p-2 text-justify overflow-auto resize-none focus:border-greenBrand focus:outline-none rounded border-2 border-grayBrand"
            />
            {content.length > 0 ? (
                <div className="self-end flex gap-4 mt-2">
                    <button
                        type="button"
                        className="underline"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 bg-greenBrand rounded text-textLight font-medium"
                    >
                        Save
                    </button>
                </div>
            ) : null}
        </form>
    )
}