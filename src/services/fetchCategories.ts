import { createClient } from "prismicio"

export async function fetchCategories() {
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

    return sortedCategories
}