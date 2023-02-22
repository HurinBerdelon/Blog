import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ListOfPosts } from "@/components/Posts/ListOfPosts";
import { pageSize } from "@/config/pageSize";
import { Query } from "@prismicio/types";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { createClient } from "prismicio";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { fetchCategories } from "@/services/fetchCategories";
import { languages } from "@/config/languages";
import { Category } from "@/schema/Category";
import { AllDocumentTypesExtended } from "@/schema/AllDocumentTypesExtended";
import { useLogin } from "@/hooks/useLogin";
import { LoginModal } from "@/components/LoginModal";
import { useTranslation } from "next-i18next";

interface CategoryProps {
    postsResponse: Query<AllDocumentTypesExtended>
    category: string
    sortedCategories: Category[]
}

export default function CategoryPage({ postsResponse, category, sortedCategories }: CategoryProps): JSX.Element {

    const { isLoginModalOpen, setIsLoginModalOpen } = useLogin()
    const { t } = useTranslation()

    return (
        <>
            <Head>
                <title>{`${category} | Hurin Blog`}</title>
                <meta name="description" content={`${t('common:categoryMetaDescription')} ${category}.`} />
            </Head>
            <Header sortedCategories={sortedCategories} />
            <main className="flex-1 flex">
                <ListOfPosts
                    title={category}
                    posts={postsResponse}
                    showPagination={true}
                />
                <LoginModal isOpen={isLoginModalOpen} onRequestClose={() => setIsLoginModalOpen(false)} />

            </main>
            <Footer sortedCategories={sortedCategories} />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const client = createClient({ previewData: context.previewData })

    const category = context.params?.category as string

    const sortedCategories = await fetchCategories()

    const postsResponse = await client.getByTag(category, {
        page: context.query.page ? Number(context.query.page) : 1,
        pageSize: pageSize,
        lang: languages[context.locale].prismic_code,
        fetchLinks: [
            'author.authorprofileimage',
            'author.name'
        ]
    })

    const locale = context.locale ?? 'en'

    return {
        props: {
            postsResponse,
            category,
            sortedCategories,
            ...(await serverSideTranslations(locale, ['common']))
        }
    }
}