import { AllDocumentTypes } from ".slicemachine/prismicio";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ListOfPosts } from "@/components/Posts/ListOfPosts";
import { pageSize } from "@/config/pageSize";
import { Query } from "@prismicio/types";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { createClient } from "prismicio";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { fetchCategories } from "@/services/fetchCategories";
import { languages } from "@/config/languages";
import { Category } from "@/schema/Category";
import { AllDocumentTypesExtended } from "@/schema/AllDocumentTypesExtended";
import { useLogin } from "@/hooks/useLogin";
import { LoginModal } from "@/components/LoginModal";

interface AllPostsProps {
    postsResponse: Query<AllDocumentTypesExtended>
    sortedCategories: Category[]
}

export default function AllPosts({ postsResponse, sortedCategories }: AllPostsProps): JSX.Element {

    const { t } = useTranslation()
    const { isLoginModalOpen, setIsLoginModalOpen } = useLogin()

    return (
        <>
            <Head>
                <title>{`${t('common:allPosts')} | Hurin Blog`}</title>
                <meta name="description" content={t('common:generalMetaDescription')} />
            </Head>
            <Header sortedCategories={sortedCategories} />
            <main className="flex-1">
                <ListOfPosts
                    title={t('common:allPosts')}
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

    const sortedCategories = await fetchCategories()

    const postsResponse = await client.getByType("blog_post",
        {
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
            sortedCategories,
            ...(await serverSideTranslations(locale, ['common']))
        }
    }

}