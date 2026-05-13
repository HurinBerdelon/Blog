import { PrismicPreview } from '@prismicio/next'
import { Poppins } from 'next/font/google'
import type { Metadata } from 'next'
import { repositoryName } from '../../prismicio'
import '../styles/global.css'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    style: ['normal', 'italic'],
    variable: '--font-poppins',
    display: 'swap',
})

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BLOG_URL ?? 'http://localhost:3000'),
    title: {
        default: 'HurinBlog',
        template: '%s | HurinBlog',
    },
    description: 'A personal blog about software development.',
    icons: { icon: '/images/fernandoCardozoLogo.svg' },
    openGraph: {
        type: 'website',
        siteName: 'HurinBlog',
    },
    twitter: {
        card: 'summary_large_image',
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={poppins.variable}>
            <body>
                {children}
                <PrismicPreview repositoryName={repositoryName} />
            </body>
        </html>
    )
}
