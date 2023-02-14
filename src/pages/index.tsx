import { AllDocumentTypes } from '.slicemachine/prismicio'
import { Banner } from '@/components/Banner'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { ListOfPosts } from '@/components/Posts/ListOfPosts'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { createClient } from 'prismicio'


interface HomeProps {
	lastFourPosts: AllDocumentTypes[]
}

export default function Home({ lastFourPosts }: HomeProps) {
	return (
		<>
			<Head>
				<title>Hurin Blog</title>
			</Head>
			<Header />
			<main className="flex-1">
				<Banner image={{ alt: 'homeBanner', src: '' }} text="Hurin Blog" />
				<ListOfPosts
					title='popular posts'
					posts={lastFourPosts}
				/>
				<ListOfPosts
					title='Recent Posts'
					posts={lastFourPosts}
					showPagination={true}
				/>
			</main>
			<Footer />
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const client = createClient()

	const lastFourPosts = await client.getAllByType('blog_post', { limit: 4 })

	return {
		props: {
			lastFourPosts
		}
	}
}
