import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { UpdateProfile } from '@/components/UpdateProfile'
import { appKeys } from '@/config/AppKeys'
import { getDictionary } from '@/i18n'
import { fetchCategories } from '@/services/fetchCategories'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params
    const dict = await getDictionary(lang)
    return {
        title: dict.profile,
        description: dict.userSettingsMetaDescription,
    }
}

export default async function UserSettings({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params
    const cookieStore = await cookies()

    if (!cookieStore.get(appKeys.accessTokenKey) || !cookieStore.get(appKeys.refreshTokenKey)) {
        redirect(`/${lang}`)
    }

    const sortedCategories = await fetchCategories()

    return (
        <>
            <Header sortedCategories={sortedCategories} />
            <main className="flex-1 flex items-center justify-center">
                <UpdateProfile />
            </main>
            <Footer sortedCategories={sortedCategories} />
        </>
    )
}
