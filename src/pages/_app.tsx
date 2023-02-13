import { PrismicPreview } from '@prismicio/next'
import { PrismicProvider } from '@prismicio/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
import { repositoryName } from 'prismicio'
import '../styles/global.css'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<PrismicProvider internalLinkComponent={(props) => <Link {...props} />}>
			<PrismicPreview repositoryName={repositoryName}>
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
				</Head>
				<Component {...pageProps} />
			</PrismicPreview>
		</PrismicProvider>
	)
}
