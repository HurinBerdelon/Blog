import { Heart, Chats } from "phosphor-react"

interface AnswerProps {
}

export function Answer({ }: AnswerProps): JSX.Element {
    return (
        <div className="border-2 border-grayBrand relative rounded p-2 pb-6">
            <div className="flex gap-2 items-center">
                <span className="font-medium">Name</span>
                <span>-</span>
                <span className=" italic text-sm">01/02/2023</span>
            </div>
            <div className="text-justify mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo eum molestiae cupiditate saepe. Eaque assumenda odio vero unde, pariatur doloremque, consequuntur in eveniet modi quod adipisci fugiat quas temporibus repudiandae.
                hasudhausdhhas
            </div>
            <div className="flex gap-2 items-center absolute right-2 bg-textLight z-10 -bottom-2 px-2 rounded border-2 border-grayBrand">
                <button className="flex gap-1 items-center text-lg">
                    <span className="sr-only">Like this comment</span>
                    <Heart />
                    <span>30</span>
                </button>
            </div>
        </div>
    )
}