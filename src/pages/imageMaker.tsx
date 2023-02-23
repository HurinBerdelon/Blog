import { ThumbsDown, ThumbsUp } from 'phosphor-react'

export default function Test() {

    return (
        <div className='m-auto bg-white w-full h-screen pt-80'>
            <div className="relative w-[1120px] h-96 border-4 border-black rounded-3xl m-auto">
                <div className="w-[1120px] h-96 bg-gradient-to-r from-sky-800 absolute to-sky-900 m-auto rounded-3xl  -top-8 -left-8" />
                <ThumbsDown className='z-10 absolute text-9xl text-[#12ccb6] bottom-12 right-12' weight='fill' />
                <ThumbsUp className='z-10 absolute text-9xl text-[#1da6bb]' weight='fill' />
                <div className='z-10 absolute flex items-center gap-4 top-1/2 left-1/2 translate-x-[-75%] translate-y-[-75%]'>
                    <img src="/tailwind.png" alt="alt" width={180} className='object-cover' />
                    <span className='text-white text-8xl font-medium'>
                        tailwindcss
                    </span>
                </div>
            </div>
        </div>
    )
}