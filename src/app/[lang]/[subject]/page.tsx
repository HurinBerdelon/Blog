import { Banner } from '@/components/Banner'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { NavHintAutoShow } from '@/components/NavHintAutoShow'
import { ListOfPosts } from '@/components/Posts/ListOfPosts'
import { RememberSubject } from '@/components/RememberSubject'
import type { Subject } from '@/config/subjects'
import { getDictionary } from '@/i18n'
import { AllDocumentTypesExtended } from '@/schema/AllDocumentTypesExtended'
import { fetchCategories } from '@/services/fetchCategories'
import { fetchWithLocaleFallback } from '@/services/fetchWithLocaleFallback'
import { filter } from '@prismicio/client'
import type { Metadata } from 'next'
import { createClient } from 'prismicio'

export async function generateMetadata({ params }: { params: Promise<{ lang: string; subject: Subject }> }): Promise<Metadata> {
    const { lang, subject } = await params
    const dict = await getDictionary(lang)
    const title = dict[subject] ?? 'Home'
    const description = dict[`${subject}MetaDescription`] ?? dict.generalMetaDescription
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `/${lang}/${subject}`,
        },
    }
}

export default async function Home({ params }: { params: Promise<{ lang: string; subject: Subject }> }) {
    const { lang, subject } = await params
    const client = createClient()
    const dict = await getDictionary(lang)

    const { data: latestPosts, resolvedLang, usedFallback } = await fetchWithLocaleFallback<AllDocumentTypesExtended>(lang, prismicLang =>
        client.getByType('blog_post', {
            pageSize: 6,
            lang: prismicLang,
            filters: [filter.at('my.blog_post.subject', subject)],
            fetchLinks: ['author.authorprofileimage', 'author.name'],
            orderings: { field: 'document.first_publication_date', direction: 'desc' },
        })
    )

    const sortedCategories = await fetchCategories(subject, resolvedLang)

    return (
        <>
            <RememberSubject subject={subject} />
            <NavHintAutoShow />
            <Header sortedCategories={sortedCategories} />
            <main className="flex-1">
                <Banner image={{ alt: 'homeBanner', src: '' }} text="Hurin Blog" />
                <ListOfPosts
                    title={dict.recentPosts}
                    posts={latestPosts}
                    seeAllPosts={true}
                    fallbackNotice={usedFallback ? dict.showingOtherLanguagePosts : undefined}
                />
            </main>
            <Footer sortedCategories={sortedCategories} />
        </>
    )
}
