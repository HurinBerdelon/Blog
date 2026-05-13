import type { MetadataRoute } from 'next'
import { createClient } from 'prismicio'
import { locales } from '@/i18n'
import { languages } from '@/config/languages'
import type { Locale } from '@/i18n'

const prismicToUrlLang = Object.fromEntries(
    (Object.entries(languages) as [Locale, { prismic_code: string }][]).map(
        ([urlLang, { prismic_code }]) => [prismic_code, urlLang]
    )
)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const client = createClient()
    const base = process.env.NEXT_PUBLIC_BLOG_URL ?? ''

    const posts = await client.getAllByType('blog_post', { lang: '*' })

    const postUrls: MetadataRoute.Sitemap = posts
        .map(post => {
            const urlLang = prismicToUrlLang[post.lang]
            if (!urlLang) return null
            return {
                url: `${base}/${urlLang}/post/${post.uid}`,
                lastModified: new Date(post.last_publication_date),
            }
        })
        .filter((entry): entry is NonNullable<typeof entry> => entry !== null)

    const staticUrls: MetadataRoute.Sitemap = locales.flatMap(lang => [
        { url: `${base}/${lang}`, lastModified: new Date() },
        { url: `${base}/${lang}/category/all`, lastModified: new Date() },
    ])

    return [...staticUrls, ...postUrls]
}
