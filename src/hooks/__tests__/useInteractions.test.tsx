import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import type { ReactNode } from 'react'
import { InteractionProvider, useInteraction } from '../useInteractions'

const apiGet = vi.fn()
const apiPost = vi.fn()
const apiPatch = vi.fn()
const apiDelete = vi.fn()

vi.mock('@/services/api', () => ({
    api: {
        get: (...args: unknown[]) => apiGet(...args),
        post: (...args: unknown[]) => apiPost(...args),
        patch: (...args: unknown[]) => apiPatch(...args),
        delete: (...args: unknown[]) => apiDelete(...args),
    },
}))

function wrapper({ children }: { children: ReactNode }) {
    return <InteractionProvider>{children}</InteractionProvider>
}

describe('useInteraction', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        apiGet.mockResolvedValue({
            data: { id: 'post-1', uid: 'my-post', comment: ['c1'], likes: ['l1'] },
        })
    })

    it('getInteractions fetches a post by uid and stores its comments/likes', async () => {
        const { result } = renderHook(() => useInteraction(), { wrapper })

        await act(() => result.current.getInteractions('my-post'))

        expect(apiGet).toHaveBeenCalledWith('/post/single/my-post')
        expect(result.current.interactions).toEqual({ comments: ['c1'], likes: ['l1'] })
    })

    it('likePost posts a like for the loaded post and refetches it', async () => {
        const { result } = renderHook(() => useInteraction(), { wrapper })
        await act(() => result.current.getInteractions('my-post'))
        apiGet.mockClear()

        await act(() => result.current.likePost())

        expect(apiPost).toHaveBeenCalledWith('/post/like', { postId: 'post-1' })
        expect(apiGet).toHaveBeenCalledWith('/post/single/my-post')
    })

    it('unlikePost deletes the given like id and refetches the post', async () => {
        const { result } = renderHook(() => useInteraction(), { wrapper })
        await act(() => result.current.getInteractions('my-post'))
        apiGet.mockClear()

        await act(() => result.current.unlikePost('like-1'))

        expect(apiDelete).toHaveBeenCalledWith('/post/unlike/like-1')
        expect(apiGet).toHaveBeenCalledWith('/post/single/my-post')
    })

    it('saveComment posts the content for the loaded post', async () => {
        const { result } = renderHook(() => useInteraction(), { wrapper })
        await act(() => result.current.getInteractions('my-post'))

        await act(() => result.current.saveComment('Nice post!'))

        expect(apiPost).toHaveBeenCalledWith('/comment', { content: 'Nice post!', postId: 'post-1' })
    })

    it('updateComment patches the content and comment id', async () => {
        const { result } = renderHook(() => useInteraction(), { wrapper })
        await act(() => result.current.getInteractions('my-post'))

        await act(() => result.current.updateComment('Edited', 'comment-1'))

        expect(apiPatch).toHaveBeenCalledWith('/comment/update', { content: 'Edited', commentId: 'comment-1' })
    })

    it('deleteComment deletes the given comment id', async () => {
        const { result } = renderHook(() => useInteraction(), { wrapper })
        await act(() => result.current.getInteractions('my-post'))

        await act(() => result.current.deleteComment('comment-1'))

        expect(apiDelete).toHaveBeenCalledWith('/comment/delete/comment-1')
    })

    it('saveAnswer posts content scoped to a comment', async () => {
        const { result } = renderHook(() => useInteraction(), { wrapper })
        await act(() => result.current.getInteractions('my-post'))

        await act(() => result.current.saveAnswer('A reply', 'comment-1'))

        expect(apiPost).toHaveBeenCalledWith('/answer', { content: 'A reply', commentId: 'comment-1' })
    })

    it('does not refetch when no post has been loaded yet', async () => {
        const { result } = renderHook(() => useInteraction(), { wrapper })

        await act(() => result.current.likePost())

        expect(apiPost).toHaveBeenCalledWith('/post/like', { postId: undefined })
        expect(apiGet).not.toHaveBeenCalled()
    })
})
