import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Answer as AnswerType } from '@/schema/Interactions'
import { Answer } from '../Answer'

const LikeAnswer = vi.fn().mockResolvedValue(undefined)
const UnlikeAnswer = vi.fn().mockResolvedValue(undefined)
const updateAnswer = vi.fn().mockResolvedValue(undefined)
const deleteAnswer = vi.fn().mockResolvedValue(undefined)
const setIsLoginModalOpen = vi.fn()

let currentUser: { id: string } | undefined

vi.mock('@/hooks/useInteractions', () => ({
    useInteraction: () => ({ LikeAnswer, UnlikeAnswer, updateAnswer, deleteAnswer }),
}))

vi.mock('@/hooks/useUser', () => ({
    useUser: () => ({ user: currentUser }),
}))

vi.mock('@/hooks/useLogin', () => ({
    useLogin: () => ({ setIsLoginModalOpen }),
}))

function makeAnswer(overrides: Partial<AnswerType> = {}): AnswerType {
    return {
        id: 'answer-1',
        content: 'Thanks!',
        createdAt: '2024-03-05T10:00:00',
        author: { id: 'author-1', name: 'Jane Doe', avatarURL: '' },
        likes: [],
        ...overrides,
    }
}

describe('Answer', () => {
    beforeEach(() => {
        currentUser = undefined
        vi.clearAllMocks()
    })

    it('does not show edit/delete controls for an answer from another author', () => {
        currentUser = { id: 'someone-else' }
        render(<Answer answer={makeAnswer()} />)

        expect(screen.queryByText(/edit/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/delete/i)).not.toBeInTheDocument()
    })

    it('shows edit/delete controls when the current user owns the answer', () => {
        currentUser = { id: 'author-1' }
        render(<Answer answer={makeAnswer()} />)

        expect(screen.getByText(/edit/i)).toBeInTheDocument()
        expect(screen.getByText(/delete/i)).toBeInTheDocument()
    })

    it('calls deleteAnswer with the answer id', async () => {
        currentUser = { id: 'author-1' }
        const user = userEvent.setup()
        render(<Answer answer={makeAnswer()} />)

        await user.click(screen.getByText(/delete/i))

        expect(deleteAnswer).toHaveBeenCalledWith('answer-1')
    })

    it('opens the login modal instead of liking when there is no logged-in user', async () => {
        currentUser = undefined
        const user = userEvent.setup()
        render(<Answer answer={makeAnswer()} />)

        await user.click(screen.getByText(/likeThisComment/i))

        expect(setIsLoginModalOpen).toHaveBeenCalledWith(true)
        expect(LikeAnswer).not.toHaveBeenCalled()
    })

    it('likes the answer when a logged-in user has not liked it yet', async () => {
        currentUser = { id: 'reader-1' }
        const user = userEvent.setup()
        render(<Answer answer={makeAnswer()} />)

        await user.click(screen.getByText(/likeThisComment/i))

        expect(LikeAnswer).toHaveBeenCalledWith('answer-1')
    })

    it('unlikes the answer using the existing like id when the user already liked it', async () => {
        currentUser = { id: 'reader-1' }
        const user = userEvent.setup()
        render(<Answer answer={makeAnswer({ likes: [{ id: 'like-1', userId: 'reader-1' }] })} />)

        await user.click(screen.getByText(/likeThisComment/i))

        expect(UnlikeAnswer).toHaveBeenCalledWith('like-1')
        expect(LikeAnswer).not.toHaveBeenCalled()
    })
})
