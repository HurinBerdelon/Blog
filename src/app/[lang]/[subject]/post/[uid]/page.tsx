import { BlogPostDocument } from 'prismicio-types'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Post } from '@/components/Posts/Post'
import { languages } from '@/config/languages'
import type { Subject } from '@/config/subjects'
import { getDictionary, type Locale } from '@/i18n'
import { fetchCategories } from '@/services/fetchCategories'
import { filter } from '@prismicio/client'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from 'prismicio'

export async function generateMetadata({ params }: { params: Promise<{ lang: string; subject: Subject; uid: string }> }): Promise<Metadata> {
    const { lang, subject, uid } = await params
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
                url: `/${lang}/${subject}/post/${uid}`,
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

export default async function PostPage({ params }: { params: Promise<{ lang: string; subject: Subject; uid: string }> }) {
    const { lang, subject, uid } = await params
    const client = createClient()

    let post: BlogPostDocument
    try {
        post = await client.getByUID('blog_post', uid, {
            lang: languages[lang as Locale]?.prismic_code ?? 'en-us',
            fetchLinks: ['author.authorprofileimage', 'author.name'],
        })
    } catch {
        notFound()
    }

    if (post.data.subject !== subject) notFound()

    const sortedCategories = await fetchCategories(subject)

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

export async function generateStaticParams({ params }: { params: { lang: string; subject: string } }) {
    const client = createClient()
    const posts = await client.getAllByType('blog_post', {
        filters: [filter.at('my.blog_post.subject', params.subject)],
    })
    return posts.map(post => ({ uid: post.uid }))
}
