import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { AllDocumentTypesExtended } from '@/schema/AllDocumentTypesExtended'
import { PostCard } from '../PostCard'

const mockParams = vi.fn()

vi.mock('next/navigation', () => ({
    useParams: () => mockParams(),
}))

vi.mock('next/image', () => ({
    default: (props: Record<string, unknown>) => <img alt={props.alt as string} src={props.src as string} />,
}))

vi.mock('../../AuthorCard', () => ({
    AuthorCard: () => <div>author-card</div>,
}))

vi.mock('../../Likes', () => ({
    Likes: () => <div>likes</div>,
}))

function textBlock(text: string, type = 'paragraph') {
    return { type, text }
}

function makePost(overrides: Partial<AllDocumentTypesExtended> = {}): AllDocumentTypesExtended {
    return {
        id: 'post-1',
        uid: 'my-post',
        lang: 'en-us',
        tags: ['react'],
        first_publication_date: '2024-03-05T10:00:00',
        data: {
            title_of_the_post: 'My Post Title',
            banner: { url: 'https://example.com/banner.png', alt: 'banner alt' },
            slices: [
                { primary: { text_content: [textBlock('Hello world.')] } },
            ],
        },
        ...overrides,
    } as unknown as AllDocumentTypesExtended
}

describe('PostCard', () => {
    it('builds the post link using the page lang and subject params', () => {
        mockParams.mockReturnValue({ lang: 'en', subject: 'tech' })
        render(<PostCard post={makePost()} />)

        expect(screen.getByRole('link')).toHaveAttribute('href', '/en/tech/post/my-post')
    })

    it('prefers the locale resolved from the post over the page lang', () => {
        mockParams.mockReturnValue({ lang: 'en', subject: 'tech' })
        render(<PostCard post={makePost({ lang: 'pt-br' })} />)

        expect(screen.getByRole('link')).toHaveAttribute('href', '/pt-BR/tech/post/my-post')
    })

    it('renders the title, tags, and banner image', () => {
        mockParams.mockReturnValue({ lang: 'en', subject: 'tech' })
        render(<PostCard post={makePost()} />)

        expect(screen.getByText('My Post Title')).toBeInTheDocument()
        expect(screen.getByText('react')).toBeInTheDocument()
        expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/banner.png')
    })

    it('builds a text preview, skipping a leading heading block', () => {
        mockParams.mockReturnValue({ lang: 'en', subject: 'tech' })
        const post = makePost({
            data: {
                title_of_the_post: 'My Post Title',
                banner: { url: 'https://example.com/banner.png', alt: 'banner alt' },
                slices: [
                    {
                        primary: {
                            text_content: [textBlock('A heading', 'heading2'), textBlock('First real paragraph.')],
                        },
                    },
                ],
            },
        } as unknown as Partial<AllDocumentTypesExtended>)

        render(<PostCard post={post} />)

        expect(screen.queryByText('A heading')).not.toBeInTheDocument()
        expect(screen.getByText('First real paragraph.')).toBeInTheDocument()
    })

    it('truncates the preview to 150 characters with an ellipsis', () => {
        mockParams.mockReturnValue({ lang: 'en', subject: 'tech' })
        const longText = 'a'.repeat(200)
        const post = makePost({
            data: {
                title_of_the_post: 'My Post Title',
                banner: { url: 'https://example.com/banner.png', alt: 'banner alt' },
                slices: [{ primary: { text_content: [textBlock(longText)] } }],
            },
        } as unknown as Partial<AllDocumentTypesExtended>)

        render(<PostCard post={post} />)

        expect(screen.getByText(`${'a'.repeat(145)}...`)).toBeInTheDocument()
    })
})
