import { ThemeProvider } from '@/hooks/useTheme'
import { PrismicPreview } from '@prismicio/next'
import { PrismicProvider } from '@prismicio/react'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
import { repositoryName } from 'prismicio'
import '../styles/global.css'

function App({ Component, pageProps }: AppProps) {
	return (
		<PrismicProvider internalLinkComponent={(props) => <Link {...props} />}>
			<PrismicPreview repositoryName={repositoryName}>
				<ThemeProvider>
					<Head>
						<meta name="viewport" content="width=device-width, initial-scale=1" />
					</Head>
					<div className='min-h-screen flex flex-col bg-textLight dark:bg-backgroundDark'>
						<Component {...pageProps} />
					</div>
				</ThemeProvider>
			</PrismicPreview>
		</PrismicProvider>
	)
}

export default appWithTranslation(App)