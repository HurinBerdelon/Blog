import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { ListOfPosts } from '@/components/Posts/ListOfPosts'
import { pageSize } from '@/config/pageSize'
import { languages } from '@/config/languages'
import type { Subject } from '@/config/subjects'
import { getDictionary, type Locale } from '@/i18n'
import { AllDocumentTypesExtended } from '@/schema/AllDocumentTypesExtended'
import { fetchCategories } from '@/services/fetchCategories'
import { filter } from '@prismicio/client'
import { Query } from '@prismicio/types'
import type { Metadata } from 'next'
import { createClient } from 'prismicio'

export async function generateMetadata({ params }: { params: Promise<{ lang: string; subject: Subject }> }): Promise<Metadata> {
    const { lang, subject } = await params
    const dict = await getDictionary(lang)
    const title = `${dict.allPosts} - ${dict[subject] ?? subject}`
    const description = dict[`${subject}MetaDescription`] ?? dict.generalMetaDescription
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `/${lang}/${subject}/category/all`,
        },
    }
}

export default async function AllPosts({
    params,
    searchParams,
}: {
    params: Promise<{ lang: string; subject: Subject }>
    searchParams: Promise<{ page?: string }>
}) {
    const { lang, subject } = await params
    const { page } = await searchParams
    const dict = await getDictionary(lang)
    const client = createClient()

    const postsResponse: Query<AllDocumentTypesExtended> = await client.getByType('blog_post', {
        page: page ? Number(page) : 1,
        pageSize,
        lang: languages[lang as Locale]?.prismic_code ?? 'en-us',
        filters: [filter.at('my.blog_post.subject', subject)],
        fetchLinks: ['author.authorprofileimage', 'author.name'],
        orderings: { field: 'document.first_publication_date', direction: 'desc' },
    })

    const sortedCategories = await fetchCategories(subject)

    return (
        <>
            <Header sortedCategories={sortedCategories} />
            <main className="flex-1">
                <ListOfPosts
                    title={dict.allPosts}
                    posts={postsResponse}
                    showPagination={true}
                />
            </main>
            <Footer sortedCategories={sortedCategories} />
        </>
    )
}
