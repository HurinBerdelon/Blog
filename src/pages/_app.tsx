import { GoogleAnalytic } from '@/components/GoogleAnalytics'
import { InteractionProvider } from '@/hooks/useInteractions'
import { LoginProvider } from '@/hooks/useLogin'
import { ThemeProvider } from '@/hooks/useTheme'
import { UserProvider } from '@/hooks/useUser'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next/pages'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/global.css'

// PrismicPreview removed — it is an async Server Component in @prismicio/next v2
// and cannot be used in the Pages Router. It will be added to app/layout.tsx in Phase 2.

function App({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider>
			<UserProvider>
				<InteractionProvider>
					<LoginProvider>
						<ThemeProvider>
							<Head>
								<meta name="viewport" content="width=device-width, initial-scale=1" />
							</Head>
							<GoogleAnalytic />
							<div className='min-h-screen flex flex-col bg-textLight dark:bg-backgroundDark'>
								<Component {...pageProps} />
							</div>
						</ThemeProvider>
					</LoginProvider>
				</InteractionProvider>
			</UserProvider>
		</SessionProvider>
	)
}

export default appWithTranslation(App)