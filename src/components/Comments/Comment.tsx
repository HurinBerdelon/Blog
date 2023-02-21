import { Heart, Chats } from "phosphor-react"
import { useState } from "react"
import { Answer } from "./Answer"

interface CommentProps {

}

export function Comment({ }: CommentProps): JSX.Element {
    const [showAnswer, setShowAnswer] = useState(false)
    return (
        <div>

            <div className="border-2 border-grayBrand relative rounded p-2 pb-6 dark:border-greenBrandDark">
                <div className="flex gap-2 items-center">
                    <span className="font-medium">Name</span>
                    <span>-</span>
                    <span className=" italic text-sm">01/02/2023</span>
                </div>
                <p className="text-justify mt-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo eum molestiae cupiditate saepe. Eaque assumenda odio vero unde, pariatur doloremque, consequuntur in eveniet modi quod adipisci fugiat quas temporibus repudiandae.
                    hasudhausdhhas
                </p>
                <div className="flex gap-2 items-center absolute right-2 bg-textLight dark:bg-backgroundDark z-10 -bottom-2 px-2 rounded border-2 border-grayBrand dark:border-greenBrandDark">
                    <button className="flex gap-1 items-center text-lg">
                        <span className="sr-only">Like this comment</span>
                        <Heart />
                        <span>30</span>
                    </button>
                </div>
            </div>
            <div className="mt-2 flex flex-col gap-3 items-start pl-12">
                <button
                    className="hover:underline text-sm"
                    onClick={() => setShowAnswer(state => !state)}
                >
                    {showAnswer ? 'Hide Answers (12)' : 'Show Answers (12)'}
                </button>
                {showAnswer ? (
                    <>
                        <Answer />
                        <Answer />
                    </>
                ) : null}
            </div>
        </div>
    )
}