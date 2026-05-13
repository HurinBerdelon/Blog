import { PrismicPreview } from '@prismicio/next'
import { Poppins } from 'next/font/google'
import { repositoryName } from '../../prismicio'
import '../styles/global.css'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    style: ['normal', 'italic'],
    variable: '--font-poppins',
    display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={poppins.variable}>
            <head>
                <link rel="icon" href="/images/fernandoCardozoLogo.svg" />
            </head>
            <body>
                {children}
                <PrismicPreview repositoryName={repositoryName} />
            </body>
        </html>
    )
}
