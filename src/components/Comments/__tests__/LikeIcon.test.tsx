import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { LikeIcon } from '../LikeIcon'

describe('LikeIcon', () => {
    it('renders a filled, highlighted heart when liked', () => {
        const { container } = render(<LikeIcon isLiked />)
        const heart = container.querySelector('svg')

        expect(heart).toHaveClass('text-red-700')
    })

    it('renders a bold, non-highlighted heart when not liked', () => {
        const { container } = render(<LikeIcon isLiked={false} />)
        const heart = container.querySelector('svg')

        expect(heart).not.toHaveClass('text-red-700')
    })
})
