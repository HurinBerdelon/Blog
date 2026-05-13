import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { ListOfPosts } from '@/components/Posts/ListOfPosts'
import { pageSize } from '@/config/pageSize'
import { languages } from '@/config/languages'
import { getDictionary, type Locale } from '@/i18n'
import { AllDocumentTypesExtended } from '@/schema/AllDocumentTypesExtended'
import { fetchCategories } from '@/services/fetchCategories'
import { Query } from '@prismicio/types'
import type { Metadata } from 'next'
import { createClient } from 'prismicio'

export async function generateMetadata({ params }: { params: Promise<{ lang: string; category: string }> }): Promise<Metadata> {
    const { lang, category } = await params
    const dict = await getDictionary(lang)
    return {
        title: `${category} | Hurin Blog`,
        description: `${dict.categoryMetaDescription} ${category}.`,
    }
}

export default async function CategoryPage({
    params,
    searchParams,
}: {
    params: Promise<{ lang: string; category: string }>
    searchParams: Promise<{ page?: string }>
}) {
    const { lang, category } = await params
    const { page } = await searchParams
    const client = createClient()

    const postsResponse: Query<AllDocumentTypesExtended> = await client.getByTag(category, {
        page: page ? Number(page) : 1,
        pageSize,
        lang: languages[lang as Locale]?.prismic_code ?? 'en-us',
        fetchLinks: ['author.authorprofileimage', 'author.name'],
        orderings: { field: 'document.first_publication_date', direction: 'desc' },
    })

    const sortedCategories = await fetchCategories()

    return (
        <>
            <Header sortedCategories={sortedCategories} />
            <main className="flex-1 flex">
                <ListOfPosts
                    title={category}
                    posts={postsResponse}
                    showPagination={true}
                />
            </main>
            <Footer sortedCategories={sortedCategories} />
        </>
    )
}
