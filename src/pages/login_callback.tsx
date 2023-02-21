import { AllDocumentTypes } from ".slicemachine/prismicio"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { useUser } from "@/hooks/useUser"
import { Category } from "@/schema/Category"
import { fetchCategories } from "@/services/fetchCategories"
import { Query } from "@prismicio/types"
import { GetStaticProps } from "next"
import { useSession } from "next-auth/react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import { useEffect } from "react"

interface Pagerops {
    lastFourPosts: Query<AllDocumentTypes>
    sortedCategories: Category[]
}
export default function LoginCallback({ sortedCategories }: Pagerops) {

    const { data: session } = useSession()
    const { authenticate, isAuthenticating, isAuthenticated } = useUser()

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
            <h1 className="m-auto text-lg">Please await, redirecting ...</h1>
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
