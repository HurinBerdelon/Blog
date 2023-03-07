import { ListChecks, PencilSimple, TrashSimple, } from 'phosphor-react'

export default function ImageMaker() {
    return (
        <div className="h-screen w-full flex items-center justify-center">
            <div
                className="w-[1120px] h-[420px] border-4 border-black absolute rounded-3xl top-1/2 left-1/2 -translate-x-[47%] -translate-y-[42%]"
            />
            <div className="w-[1120px] h-[420px] bg-gradient-to-r from-[#494949] to-[#212121] rounded-3xl z-10 flex items-center justify-center relative">
                <span className="text-9xl text-textLight">
                    TodoList
                </span>
                <ListChecks className='absolute z-10 text-9xl text-textLight top-3 left-3' />
                <PencilSimple className='absolute z-10 text-9xl text-textLight top-10 right-10' />
                <TrashSimple className='absolute z-10 text-9xl text-textLight bottom-3 left-28' />
            </div>
        </div>
    )
}