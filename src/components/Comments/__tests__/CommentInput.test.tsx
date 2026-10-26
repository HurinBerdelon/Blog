import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CommentInput } from '../CommentInput'

const saveComment = vi.fn()

vi.mock('@/hooks/useInteractions', () => ({
    useInteraction: () => ({ saveComment }),
}))

describe('CommentInput', () => {
    beforeEach(() => {
        saveComment.mockClear()
    })

    it('shows no action buttons until there is content', () => {
        render(<CommentInput />)

        expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('saves a new comment via useInteraction when no update/saveAnswer handler is given', async () => {
        const user = userEvent.setup()
        render(<CommentInput />)

        await user.type(screen.getByRole('textbox'), 'A new comment')
        await user.click(screen.getByRole('button', { name: /save/i }))

        expect(saveComment).toHaveBeenCalledWith('A new comment')
    })

    it('calls the "update" handler instead of saveComment when editing an existing comment', async () => {
        const update = vi.fn().mockResolvedValue(undefined)
        const setIsUpdating = vi.fn()
        const user = userEvent.setup()
        render(
            <CommentInput
                defaultComment="Original"
                commentId="comment-1"
                update={update}
                setIsUpdating={setIsUpdating}
            />
        )

        await user.clear(screen.getByRole('textbox'))
        await user.type(screen.getByRole('textbox'), 'Edited comment')
        await user.click(screen.getByRole('button', { name: /save/i }))

        expect(update).toHaveBeenCalledWith('Edited comment', 'comment-1')
        expect(saveComment).not.toHaveBeenCalled()
        expect(setIsUpdating).toHaveBeenCalledWith(false)
    })

    it('clears the content and resets state when cancelled', async () => {
        const setIsUpdating = vi.fn()
        const user = userEvent.setup()
        render(<CommentInput defaultComment="Original" update={vi.fn()} setIsUpdating={setIsUpdating} />)

        await user.type(screen.getByRole('textbox'), ' more')
        await user.click(screen.getByRole('button', { name: /cancel/i }))

        expect(screen.getByRole('textbox')).toHaveValue('')
        expect(setIsUpdating).toHaveBeenCalledWith(false)
    })
})
