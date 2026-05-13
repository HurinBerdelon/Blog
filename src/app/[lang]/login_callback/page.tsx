import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { LoginCallbackClient } from './LoginCallbackClient'
import { getDictionary } from '@/i18n'
import { fetchCategories } from '@/services/fetchCategories'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params
    const dict = await getDictionary(lang)
    return {
        title: 'Redirect | HurinBlog',
        description: dict.loginCallbackMetaDescription,
    }
}

export default async function LoginCallback({ params }: { params: Promise<{ lang: string }> }) {
    const sortedCategories = await fetchCategories()

    return (
        <>
            <Header sortedCategories={sortedCategories} />
            <LoginCallbackClient />
            <Footer sortedCategories={sortedCategories} />
        </>
    )
}
