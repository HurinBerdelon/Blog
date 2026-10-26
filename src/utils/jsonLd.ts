import { PrismicAuthor } from '@/schema/Author'
import type { BlogPostDocument } from 'prismicio-types'

const SITE_NAME = 'HurinBlog'
const AUTHOR_NAME = 'Fernando Cardozo'
const AUTHOR_SAME_AS = ['https://www.linkedin.com/in/fernando-henrique-p-cardozo/']

function siteUrl(): string {
    return process.env.NEXT_PUBLIC_BLOG_URL ?? 'http://localhost:3000'
}

export function buildWebsiteJsonLd(): Record<string, unknown> {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: siteUrl(),
        author: {
            '@type': 'Person',
            name: AUTHOR_NAME,
            sameAs: AUTHOR_SAME_AS,
        },
    }
}

export function buildBlogPostingJsonLd({ post, url }: {
    post: BlogPostDocument
    url: string
}): Record<string, unknown> {
    const author = post.data.author as PrismicAuthor | undefined
    const authorName = author?.data?.name ?? AUTHOR_NAME

    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.data.title_of_the_post,
        description: post.data.meta_description ?? undefined,
        image: post.data.banner.url ? [post.data.banner.url] : undefined,
        datePublished: post.first_publication_date,
        dateModified: post.last_publication_date,
        author: {
            '@type': 'Person',
            name: authorName,
        },
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
        },
    }
}
