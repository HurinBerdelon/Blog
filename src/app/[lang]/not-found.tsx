import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { fetchCategories } from '@/services/fetchCategories'
import Image from 'next/image'
import Link from 'next/link'

export default async function NotFound() {
    const sortedCategories = await fetchCategories()

    return (
        <>
            <Header sortedCategories={sortedCategories} />
            <main className="flex flex-col flex-1 gap-10 justify-center items-center my-8">
                <Image
                    src="/images/404_notFound.png"
                    alt="404 not found"
                    width={640}
                    height={640}
                    loading="eager"
                />
                <Link
                    href="/category/all"
                    className="px-4 text-center hover:underline text-backgroundDark dark:text-textLight"
                >
                    Page not Found! Would like to see all posts?
                </Link>
            </main>
            <Footer sortedCategories={sortedCategories} />
        </>
    )
}
