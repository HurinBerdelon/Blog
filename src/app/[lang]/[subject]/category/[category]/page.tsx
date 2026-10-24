import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { ListOfPosts } from '@/components/Posts/ListOfPosts'
import { pageSize } from '@/config/pageSize'
import type { Subject } from '@/config/subjects'
import { getDictionary } from '@/i18n'
import { AllDocumentTypesExtended } from '@/schema/AllDocumentTypesExtended'
import { fetchCategories } from '@/services/fetchCategories'
import { fetchWithLocaleFallback } from '@/services/fetchWithLocaleFallback'
import { filter } from '@prismicio/client'
import type { Metadata } from 'next'
import { createClient } from 'prismicio'

export async function generateMetadata({ params }: { params: Promise<{ lang: string; subject: Subject; category: string }> }): Promise<Metadata> {
    const { lang, subject, category: rawCategory } = await params
    const category = decodeURIComponent(rawCategory)
    const dict = await getDictionary(lang)
    const description = `${dict.categoryMetaDescription} ${category} (${dict[subject] ?? subject}).`
    return {
        title: category,
        description,
        openGraph: {
            title: category,
            description,
            url: `/${lang}/${subject}/category/${category}`,
        },
    }
}

export default async function CategoryPage({
    params,
    searchParams,
}: {
    params: Promise<{ lang: string; subject: Subject; category: string }>
    searchParams: Promise<{ page?: string }>
}) {
    const { lang, subject, category: rawCategory } = await params
    const category = decodeURIComponent(rawCategory)
    const { page } = await searchParams
    const dict = await getDictionary(lang)
    const client = createClient()

    const { data: postsResponse, resolvedLang, usedFallback } = await fetchWithLocaleFallback<AllDocumentTypesExtended>(lang, prismicLang =>
        client.getByTag(category, {
            page: page ? Number(page) : 1,
            pageSize,
            lang: prismicLang,
            filters: [filter.at('my.blog_post.subject', subject)],
            fetchLinks: ['author.authorprofileimage', 'author.name'],
            orderings: { field: 'document.first_publication_date', direction: 'desc' },
        })
    )

    const sortedCategories = await fetchCategories(subject, resolvedLang)

    return (
        <>
            <Header sortedCategories={sortedCategories} />
            <main className="flex-1 flex">
                <ListOfPosts
                    title={category}
                    posts={postsResponse}
                    showPagination={true}
                    fallbackNotice={usedFallback ? dict.showingOtherLanguagePosts : undefined}
                />
            </main>
            <Footer sortedCategories={sortedCategories} />
        </>
    )
}
