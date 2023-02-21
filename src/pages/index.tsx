import { Banner } from '@/components/Banner'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { ListOfPosts } from '@/components/Posts/ListOfPosts'
import { Query } from '@prismicio/types'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { createClient } from 'prismicio'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { fetchCategories } from '@/services/fetchCategories'
import { languages } from '@/config/languages'
import { Category } from '@/schema/Category'
import { AllDocumentTypesExtended } from '@/schema/AllDocumentTypesExtended'

interface HomeProps {
	lastFourPosts: Query<AllDocumentTypesExtended>
	sortedCategories: Category[]
}

export default function Home({ lastFourPosts, sortedCategories }: HomeProps) {

	const { t } = useTranslation()

	return (
		<>
			<Head>
				<title>Home | Hurin Blog</title>
			</Head>
			<Header sortedCategories={sortedCategories} />
			<main className="flex-1">
				<Banner image={{ alt: 'homeBanner', src: '' }} text="Hurin Blog" />
				{/* <ListOfPosts
					title={t('common:popularPosts')}
					posts={lastFourPosts}
				/> */}
				<ListOfPosts
					title={t('common:recentPosts')}
					posts={lastFourPosts}
					seeAllPosts={true}
				/>
			</main>
			<Footer sortedCategories={sortedCategories} />
		</>
	)
}

export const getStaticProps: GetStaticProps = async ({ previewData, locale }) => {
	const client = createClient({ previewData })

	const lastFourPosts: Query<AllDocumentTypesExtended> = await client.getByType('blog_post', { pageSize: 4, lang: languages[locale].prismic_code })

	const sortedCategories = await fetchCategories()

	if (!locale) locale = 'en'

	return {
		props: {
			lastFourPosts,
			sortedCategories,
			...(await serverSideTranslations(locale, ['common']))
		}
	}
}
