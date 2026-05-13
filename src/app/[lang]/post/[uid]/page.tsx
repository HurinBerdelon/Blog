import { BlogPostDocument } from '.slicemachine/prismicio'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Post } from '@/components/Posts/Post'
import { languages } from '@/config/languages'
import { getDictionary, type Locale } from '@/i18n'
import { fetchCategories } from '@/services/fetchCategories'
import type { Metadata } from 'next'
import { createClient } from 'prismicio'

export async function generateMetadata({ params }: { params: Promise<{ lang: string; uid: string }> }): Promise<Metadata> {
    const { lang, uid } = await params
    const client = createClient()
    try {
        const post = await client.getByUID('blog_post', uid, {
            lang: languages[lang as Locale]?.prismic_code ?? 'en-us',
        })
        const title = post.data.title_of_the_post as string
        const description = (post.data.meta_description as string) ?? undefined
        return {
            title,
            description,
            openGraph: {
                title,
                description,
                url: `/${lang}/post/${uid}`,
                type: 'article',
                images: post.data.banner.url ? [{ url: post.data.banner.url }] : [],
            },
            twitter: {
                card: 'summary_large_image',
                title,
                images: post.data.banner.url ? [post.data.banner.url] : [],
            },
        }
    } catch {
        return { title: 'Post' }
    }
}

export default async function PostPage({ params }: { params: Promise<{ lang: string; uid: string }> }) {
    const { lang, uid } = await params
    const client = createClient()

    let post: BlogPostDocument
    try {
        post = await client.getByUID('blog_post', uid, {
            lang: languages[lang as Locale]?.prismic_code ?? 'en-us',
            fetchLinks: ['author.authorprofileimage', 'author.name'],
        })
    } catch {
        const { notFound } = await import('next/navigation')
        notFound()
        return // notFound() throws, but TypeScript needs this for the type narrowing
    }

    const sortedCategories = await fetchCategories()

    return (
        <>
            <Header sortedCategories={sortedCategories} />
            <main className="flex-1">
                <Post post={post} />
            </main>
            <Footer sortedCategories={sortedCategories} />
        </>
    )
}

export async function generateStaticParams() {
    const client = createClient()
    const posts = await client.getAllByType('blog_post')
    return posts.map(post => ({ uid: post.uid }))
}
