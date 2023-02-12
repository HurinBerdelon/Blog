import { Banner } from '@/components/Banner'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { ListOfPosts } from '@/components/Posts/ListOfPosts'
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
					posts={[
						{ bannerImage: { alt: '#', src: '#' }, title: 'post_1' },
						{ bannerImage: { alt: '#', src: '#' }, title: 'post_2' },
					]}
				/>
				<ListOfPosts
					title='Recent Posts'
					posts={[
						{ bannerImage: { alt: '#', src: '#' }, title: 'post_1' },
						{ bannerImage: { alt: '#', src: '#' }, title: 'post_2' },
						{ bannerImage: { alt: '#', src: '#' }, title: 'post_2' },
					]}
					showPagination={true}
				/>
				<Footer />
			</main>
		</>
	)
}
