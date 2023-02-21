import { Footer } from "@/components/Footer"
import { UpdateProfile } from "@/components/UpdateProfile"
import { Category } from "@/schema/Category"
import { fetchCategories } from "@/services/fetchCategories"
import { GetServerSideProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import { parseCookies } from "nookies"
import { useTranslation } from "next-i18next"
import { Header } from "../components/Header"
import { appKeys } from "../config/AppKeys"

interface PageProps {
    sortedCategories: Category[]
}

export default function UserSettings({ sortedCategories }: PageProps): JSX.Element {

    const { t } = useTranslation()

    return (
        <>
            <Head>
                <title>{`${t('common:profile')} | HurinBlog`}</title>
            </Head>
            <Header sortedCategories={sortedCategories} />
            <main className="flex-1 flex items-center justify-center">
                <UpdateProfile />
            </main>
            <Footer sortedCategories={sortedCategories} />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const cookies = parseCookies(ctx)

    if (!ctx.locale) ctx.locale = 'en'

    const sortedCategories = await fetchCategories()

    if (!cookies[appKeys.accessTokenKey] || !cookies[appKeys.refreshTokenKey]) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            },
            props: {},
        }
    }

    return {
        props: {
            sortedCategories,
            ...(await serverSideTranslations(ctx.locale, ['common']))
        }
    }
}