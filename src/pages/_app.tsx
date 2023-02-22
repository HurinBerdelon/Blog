import { InteractionProvider } from '@/hooks/useInteractions'
import { LoginProvider } from '@/hooks/useLogin'
import { ThemeProvider } from '@/hooks/useTheme'
import { UserProvider } from '@/hooks/useUser'
import { PrismicPreview } from '@prismicio/next'
import { PrismicProvider } from '@prismicio/react'
import { SessionProvider } from 'next-auth/react'
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
				<SessionProvider>
					<UserProvider>
						<InteractionProvider>
							<LoginProvider>
								<ThemeProvider>
									<Head>
										<meta name="viewport" content="width=device-width, initial-scale=1" />
									</Head>
									<div className='min-h-screen flex flex-col bg-textLight dark:bg-backgroundDark'>
										<Component {...pageProps} />
									</div>
								</ThemeProvider>
							</LoginProvider>
						</InteractionProvider>
					</UserProvider>
				</SessionProvider>
			</PrismicPreview>
		</PrismicProvider>
	)
}

export default appWithTranslation(App)