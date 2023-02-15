import { AllDocumentTypes } from ".slicemachine/prismicio";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ListOfPosts } from "@/components/Posts/ListOfPosts";
import { pageSize } from "@/config/pageSize";
import { axiosAPI } from "@/services/axios";
import { Category } from "@/types/Category";
import { Query } from "@prismicio/types";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { createClient } from "prismicio";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

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
    const client = createClient()

    const category = context.params?.category as string

    const { data: sortedCategories } = await axiosAPI.get('/api/categories')

    const postsResponse = await client.getByTag(category, {
        page: context.query.page ? Number(context.query.page) : 1,
        pageSize: pageSize
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