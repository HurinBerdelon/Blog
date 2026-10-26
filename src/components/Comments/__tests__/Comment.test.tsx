import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Comment as CommentType } from '@/schema/Interactions'
import { Comment } from '../Comment'

const LikeComment = vi.fn().mockResolvedValue(undefined)
const UnlikeComment = vi.fn().mockResolvedValue(undefined)
const updateComment = vi.fn().mockResolvedValue(undefined)
const deleteComment = vi.fn().mockResolvedValue(undefined)
const saveAnswer = vi.fn().mockResolvedValue(undefined)
const setIsLoginModalOpen = vi.fn()

let currentUser: { id: string } | undefined

vi.mock('@/hooks/useInteractions', () => ({
    useInteraction: () => ({ LikeComment, UnlikeComment, updateComment, deleteComment, saveAnswer }),
}))

vi.mock('@/hooks/useUser', () => ({
    useUser: () => ({ user: currentUser }),
}))

vi.mock('@/hooks/useLogin', () => ({
    useLogin: () => ({ setIsLoginModalOpen }),
}))

function makeComment(overrides: Partial<CommentType> = {}): CommentType {
    return {
        id: 'comment-1',
        content: 'Nice post!',
        createdAt: '2024-03-05T10:00:00',
        author: { id: 'author-1', name: 'Jane Doe', avatarURL: '' },
        likes: [],
        answers: [],
        ...overrides,
    }
}

describe('Comment', () => {
    beforeEach(() => {
        currentUser = undefined
        vi.clearAllMocks()
    })

    it('does not show edit/delete controls for a comment from another author', () => {
        currentUser = { id: 'someone-else' }
        render(<Comment comment={makeComment()} />)

        expect(screen.queryByText(/edit/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/delete/i)).not.toBeInTheDocument()
    })

    it('shows edit/delete controls when the current user owns the comment', () => {
        currentUser = { id: 'author-1' }
        render(<Comment comment={makeComment()} />)

        expect(screen.getByText(/edit/i)).toBeInTheDocument()
        expect(screen.getByText(/delete/i)).toBeInTheDocument()
    })

    it('calls deleteComment with the comment id', async () => {
        currentUser = { id: 'author-1' }
        const user = userEvent.setup()
        render(<Comment comment={makeComment()} />)

        await user.click(screen.getByText(/delete/i))

        expect(deleteComment).toHaveBeenCalledWith('comment-1')
    })

    it('opens the login modal instead of liking when there is no logged-in user', async () => {
        currentUser = undefined
        const user = userEvent.setup()
        render(<Comment comment={makeComment()} />)

        await user.click(screen.getByText('Like this comment'))

        expect(setIsLoginModalOpen).toHaveBeenCalledWith(true)
        expect(LikeComment).not.toHaveBeenCalled()
    })

    it('likes the comment when a logged-in user has not liked it yet', async () => {
        currentUser = { id: 'reader-1' }
        const user = userEvent.setup()
        render(<Comment comment={makeComment()} />)

        await user.click(screen.getByText('Like this comment'))

        expect(LikeComment).toHaveBeenCalledWith('comment-1')
    })

    it('unlikes the comment using the existing like id when the user already liked it', async () => {
        currentUser = { id: 'reader-1' }
        const user = userEvent.setup()
        render(
            <Comment
                comment={makeComment({ likes: [{ id: 'like-1', userId: 'reader-1' }] })}
            />
        )

        await user.click(screen.getByText('Like this comment'))

        expect(UnlikeComment).toHaveBeenCalledWith('like-1')
        expect(LikeComment).not.toHaveBeenCalled()
    })

    it('opens the login modal instead of the reply box when there is no logged-in user', async () => {
        currentUser = undefined
        const user = userEvent.setup()
        render(<Comment comment={makeComment()} />)

        await user.click(screen.getByText(/reply/i))

        expect(setIsLoginModalOpen).toHaveBeenCalledWith(true)
        expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
    })

    it('shows the reply input for a logged-in user clicking reply', async () => {
        currentUser = { id: 'reader-1' }
        const user = userEvent.setup()
        render(<Comment comment={makeComment()} />)

        await user.click(screen.getByText(/reply/i))

        expect(screen.getByRole('textbox')).toBeInTheDocument()
    })
})
