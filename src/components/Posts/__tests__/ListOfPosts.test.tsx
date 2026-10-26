import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { AllDocumentTypesExtended } from '@/schema/AllDocumentTypesExtended'
import type { Query } from '@prismicio/types'
import { ListOfPosts } from '../ListOfPosts'

const push = vi.fn()
const mockPathname = vi.fn()
const mockParams = vi.fn()

vi.mock('next/navigation', () => ({
    useRouter: () => ({ push }),
    usePathname: () => mockPathname(),
    useParams: () => mockParams(),
}))

const fetchLikesAndComments = vi.fn()

vi.mock('@/services/fetchLikesAndComments', () => ({
    fetchLikesAndComments: (...args: unknown[]) => fetchLikesAndComments(...args),
}))

vi.mock('../PostCard', () => ({
    PostCard: ({ post }: { post: AllDocumentTypesExtended }) => <li>{post.uid}</li>,
}))

function makeQuery(uids: string[], overrides: Partial<Query<AllDocumentTypesExtended>> = {}): Query<AllDocumentTypesExtended> {
    return {
        page: 1,
        results_per_page: 10,
        results_size: uids.length,
        total_results_size: uids.length,
        total_pages: 1,
        next_page: null,
        prev_page: null,
        results: uids.map(uid => ({ id: uid, uid } as unknown as AllDocumentTypesExtended)),
        ...overrides,
    }
}

describe('ListOfPosts', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        mockParams.mockReturnValue({ lang: 'en', subject: 'tech' })
        mockPathname.mockReturnValue('/en/tech')
        fetchLikesAndComments.mockImplementation(posts => Promise.resolve(posts))
    })

    it('shows the "no posts" message when there are no results', () => {
        render(<ListOfPosts title="Recent posts" posts={makeQuery([])} />)

        expect(screen.getByText(/noPostsHere/i)).toBeInTheDocument()
    })

    it('renders a PostCard for each result', async () => {
        render(<ListOfPosts title="Recent posts" posts={makeQuery(['post-1', 'post-2'])} />)

        await waitFor(() => expect(fetchLikesAndComments).toHaveBeenCalled())
        expect(screen.getByText('post-1')).toBeInTheDocument()
        expect(screen.getByText('post-2')).toBeInTheDocument()
    })

    it('shows the fallback notice when provided', async () => {
        render(
            <ListOfPosts
                title="Recent posts"
                posts={makeQuery(['post-1'])}
                fallbackNotice="Showing posts in English"
            />
        )

        await waitFor(() => expect(fetchLikesAndComments).toHaveBeenCalled())
        expect(screen.getByText('Showing posts in English')).toBeInTheDocument()
    })

    it('shows a "see all posts" link scoped to the current lang/subject when enabled', async () => {
        render(<ListOfPosts title="Recent posts" posts={makeQuery(['post-1'])} seeAllPosts />)

        await waitFor(() => expect(fetchLikesAndComments).toHaveBeenCalled())
        expect(screen.getByRole('link')).toHaveAttribute('href', '/en/tech/category/all')
    })

    it('navigates with an updated page query when pagination changes page', async () => {
        const user = userEvent.setup()
        render(
            <ListOfPosts
                title="Recent posts"
                posts={makeQuery(['post-1'], { total_results_size: 30 })}
                showPagination
            />
        )
        await waitFor(() => expect(fetchLikesAndComments).toHaveBeenCalled())

        await user.click(screen.getByRole('button', { name: '2' }))

        expect(push).toHaveBeenCalledWith('/en/tech?page=2')
    })
})
