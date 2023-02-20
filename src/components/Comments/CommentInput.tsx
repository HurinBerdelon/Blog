import { useState } from "react"

export function CommentInput(): JSX.Element {

    const [content, setContent] = useState('')

    function handleSubmit() {

    }

    return (
        <form onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="commentArea">Type your comment commentHeader</label>
            <textarea id="commentArea" onChange={(event) => setContent(event.target.value)} />
            <div className="buttonsSection">
                <button type="button">Cancel</button>
                <button type="submit">Save</button>
            </div>
        </form>
    )
}