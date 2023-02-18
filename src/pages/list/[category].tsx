import { AllDocumentTypes } from ".slicemachine/prismicio";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ListOfPosts } from "@/components/Posts/ListOfPosts";
import { pageSize } from "@/config/pageSize";
import { Category } from "@/types/Category";
import { Query } from "@prismicio/types";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { createClient } from "prismicio";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { fetchCategories } from "@/services/fetchCategories";
import { languages } from "@/config/languages";

interface CategoryProps {
    postsResponse: Query<AllDocumentTypes>
    category: string
    sortedCategories: Category[]
}

export default function CategoryPage({ postsResponse, category, sortedCategories }: CategoryProps): JSX.Element {
    return (
        <>
            <Head>
                <title>{`${category} | Hurin Blog`}</title>
            </Head>
            <Header sortedCategories={sortedCategories} />
            <main className="flex-1 flex">
                <ListOfPosts
                    title={category}
                    posts={postsResponse}
                    showPagination={true}
                />
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
        lang: languages[context.locale].prismic_code
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