import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { useUser } from "@/hooks/useUser"
import { Category } from "@/schema/Category"
import { fetchCategories } from "@/services/fetchCategories"
import { GetStaticProps } from "next"
import { useSession } from "next-auth/react"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import { useEffect } from "react"

interface Pagerops {
    sortedCategories: Category[]
}
export default function LoginCallback({ sortedCategories }: Pagerops) {

    const { data: session } = useSession()
    const { authenticate, isAuthenticating, isAuthenticated } = useUser()
    const { t } = useTranslation()

    useEffect(() => {
        if (session && !isAuthenticating && !isAuthenticated) {
            authenticate(session)
        }
    }, [session, isAuthenticating])

    return (
        <>
            <Head>
                <title>Redirect | HurinBlog</title>
            </Head>

            <Header sortedCategories={sortedCategories} />
            <h1 className="m-auto text-lg">{t('common:redirecting')}</h1>
            <Footer sortedCategories={sortedCategories} />
        </>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {

    const sortedCategories = await fetchCategories()

    if (!locale) locale = 'en'

    return {
        props: {
            sortedCategories,
            ...(await serverSideTranslations(locale, ['common']))
        }
    }
}
