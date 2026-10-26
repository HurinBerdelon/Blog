import { describe, it, expect } from 'vitest'
import type { BlogPostDocument } from 'prismicio-types'
import { buildWebsiteJsonLd, buildBlogPostingJsonLd } from '../jsonLd'

function makePost(overrides: Partial<BlogPostDocument> = {}): BlogPostDocument {
    return {
        first_publication_date: '2024-03-05T10:00:00',
        last_publication_date: '2024-04-01T12:00:00',
        data: {
            title_of_the_post: 'My Post Title',
            meta_description: 'A great post about things.',
            banner: { url: 'https://example.com/banner.png' },
            author: { data: { name: 'Jane Doe' } },
        },
        ...overrides,
    } as unknown as BlogPostDocument
}

describe('buildWebsiteJsonLd', () => {
    it('returns a WebSite schema with the site name and author', () => {
        const jsonLd = buildWebsiteJsonLd()

        expect(jsonLd['@type']).toBe('WebSite')
        expect(jsonLd.name).toBe('HurinBlog')
        expect((jsonLd.author as Record<string, unknown>)['@type']).toBe('Person')
    })
})

describe('buildBlogPostingJsonLd', () => {
    it('builds a BlogPosting schema from the post data', () => {
        const jsonLd = buildBlogPostingJsonLd({
            post: makePost(),
            url: 'https://blog.example.com/en/tech/post/my-post',
        })

        expect(jsonLd).toMatchObject({
            '@type': 'BlogPosting',
            headline: 'My Post Title',
            description: 'A great post about things.',
            image: ['https://example.com/banner.png'],
            datePublished: '2024-03-05T10:00:00',
            dateModified: '2024-04-01T12:00:00',
            author: { '@type': 'Person', name: 'Jane Doe' },
            mainEntityOfPage: { '@id': 'https://blog.example.com/en/tech/post/my-post' },
        })
    })

    it('falls back to the default author name when the post has none', () => {
        const jsonLd = buildBlogPostingJsonLd({
            post: makePost({ data: { title_of_the_post: 'Untitled', banner: {} } } as unknown as Partial<BlogPostDocument>),
            url: 'https://blog.example.com/en/tech/post/my-post',
        })

        expect((jsonLd.author as Record<string, unknown>).name).toBe('Fernando Cardozo')
        expect(jsonLd.image).toBeUndefined()
    })
})
