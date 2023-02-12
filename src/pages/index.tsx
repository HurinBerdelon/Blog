import { Banner } from '@/components/Banner'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { ListOfPosts } from '@/components/Posts/ListOfPosts'
import { mockPosts } from '@/mock/posts'
import Head from 'next/head'


export default function Home() {
	return (
		<>
			<Head>
				<title>Hurin Blog</title>
			</Head>
			<main>
				<Header />
				<Banner image={{ alt: 'homeBanner', src: '#' }} text="Hurin Blog" />
				<ListOfPosts
					title='popular posts'
					posts={mockPosts.slice(2)}
				/>
				<ListOfPosts
					title='Recent Posts'
					posts={mockPosts}
					showPagination={true}
				/>
				<Footer />
			</main>
		</>
	)
}
