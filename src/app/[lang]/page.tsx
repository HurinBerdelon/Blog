import { Banner } from '@/components/Banner'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { ListOfPosts } from '@/components/Posts/ListOfPosts'
import { languages } from '@/config/languages'
import { getDictionary, type Locale } from '@/i18n'
import { AllDocumentTypesExtended } from '@/schema/AllDocumentTypesExtended'
import { fetchCategories } from '@/services/fetchCategories'
import { Query } from '@prismicio/types'
import type { Metadata } from 'next'
import { createClient } from 'prismicio'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params
    const dict = await getDictionary(lang)
    return {
        title: 'Home',
        description: dict.generalMetaDescription,
        openGraph: {
            title: 'Home',
            description: dict.generalMetaDescription,
            url: `/${lang}`,
        },
    }
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params
    const client = createClient()
    const dict = await getDictionary(lang)

    const lastFourPosts: Query<AllDocumentTypesExtended> = await client.getByType('blog_post', {
        pageSize: 4,
        lang: languages[lang as Locale]?.prismic_code ?? 'en-us',
        fetchLinks: ['author.authorprofileimage', 'author.name'],
        orderings: { field: 'document.first_publication_date', direction: 'desc' },
    })

    const sortedCategories = await fetchCategories()

    return (
        <>
            <Header sortedCategories={sortedCategories} />
            <main className="flex-1">
                <Banner image={{ alt: 'homeBanner', src: '' }} text="Hurin Blog" />
                <ListOfPosts
                    title={dict.recentPosts}
                    posts={lastFourPosts}
                    seeAllPosts={true}
                />
            </main>
            <Footer sortedCategories={sortedCategories} />
        </>
    )
}
