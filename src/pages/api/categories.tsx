import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from 'prismicio'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = createClient()

    const posts = await client.getAllByType('blog_post')
    const tags = posts.map(post => post.tags).flat()
    const uniqueTags = Array.from(new Set(posts.map(post => post.tags).flat()))
    const sortedCategories = uniqueTags.map(tag => {
        const arr = tags.filter(item => item === tag)
        return { tag, count: arr.length }
    })

    sortedCategories.sort((a, b) => {
        return b.count - a.count
    })

    res.status(200).json(sortedCategories)
}
