import { AllDocumentTypes } from '.slicemachine/prismicio'
import { Banner } from '@/components/Banner'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { ListOfPosts } from '@/components/Posts/ListOfPosts'
import { axiosAPI } from '@/services/axios'
import { Category } from '@/types/Category'
import { Query } from '@prismicio/types'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { createClient } from 'prismicio'


interface HomeProps {
	lastFourPosts: Query<AllDocumentTypes>
	sortedCategories: Category[]
}

export default function Home({ lastFourPosts, sortedCategories }: HomeProps) {
	return (
		<>
			<Head>
				<title>Hurin Blog</title>
			</Head>
			<Header sortedCategories={sortedCategories} />
			<main className="flex-1">
				<Banner image={{ alt: 'homeBanner', src: '' }} text="Hurin Blog" />
				<ListOfPosts
					title='popular posts'
					posts={lastFourPosts}
				/>
				<ListOfPosts
					title='Recent Posts'
					posts={lastFourPosts}
					seeAllPosts={true}
				/>
			</main>
			<Footer sortedCategories={sortedCategories} />
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const client = createClient()

	const lastFourPosts = await client.getByType('blog_post', { pageSize: 4 })

	const { data: sortedCategories } = await axiosAPI.get('/api/categories')

	return {
		props: {
			lastFourPosts,
			sortedCategories
		}
	}
}
