import { Banner } from '@/components/Banner'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { ListOfPosts } from '@/components/Posts/ListOfPosts'
import { RememberSubject } from '@/components/RememberSubject'
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
    return {
        title: 'Home',
        description: dict.generalMetaDescription,
        openGraph: {
            title: 'Home',
            description: dict.generalMetaDescription,
            url: `/${lang}/${subject}`,
        },
    }
}

export default async function Home({ params }: { params: Promise<{ lang: string; subject: Subject }> }) {
    const { lang, subject } = await params
    const client = createClient()
    const dict = await getDictionary(lang)

    const latestPosts: Query<AllDocumentTypesExtended> = await client.getByType('blog_post', {
        pageSize: 6,
        lang: languages[lang as Locale]?.prismic_code ?? 'en-us',
        filters: [filter.at('my.blog_post.subject', subject)],
        fetchLinks: ['author.authorprofileimage', 'author.name'],
        orderings: { field: 'document.first_publication_date', direction: 'desc' },
    })

    const sortedCategories = await fetchCategories(subject)

    return (
        <>
            <RememberSubject subject={subject} />
            <Header sortedCategories={sortedCategories} />
            <main className="flex-1">
                <Banner image={{ alt: 'homeBanner', src: '' }} text="Hurin Blog" />
                <ListOfPosts
                    title={dict.recentPosts}
                    posts={latestPosts}
                    seeAllPosts={true}
                />
            </main>
            <Footer sortedCategories={sortedCategories} />
        </>
    )
}
