import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
    return (
        <main className="flex flex-col flex-1 gap-10 justify-center items-center my-8">
            <Image
                src="/images/404_notFound.png"
                alt="404 not found"
                width={640}
                height={640}
                loading="eager"
            />
            <Link
                href="/"
                className="px-4 text-center hover:underline text-backgroundDark dark:text-textLight"
            >
                Page not Found! Would like to see all posts?
            </Link>
        </main>
    )
}
