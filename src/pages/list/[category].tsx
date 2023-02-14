import { AllDocumentTypes } from ".slicemachine/prismicio";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ListOfPosts } from "@/components/Posts/ListOfPosts";
import { axiosAPI } from "@/services/axios";
import { Category } from "@/types/Category";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { createClient } from "prismicio";

interface CategoryProps {
    posts: AllDocumentTypes[]
    category: string
    sortedCategories: Category[]
}

export default function Category({ posts, category, sortedCategories }: CategoryProps): JSX.Element {
    return (
        <>
            <Head>
                <title>{`${category} | Hurin Blog`}</title>
            </Head>
            <Header sortedCategories={sortedCategories} />
            <main className="flex-1">
                <ListOfPosts
                    title={category}
                    posts={posts}
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

    let posts: AllDocumentTypes[]
    const { data: sortedCategories } = await axiosAPI.get('/api/categories')

    try {
        const response = await client.getByTag(category, {
            page: context.query.page ? Number(context.query.page) : 1,
            pageSize: 1,
        })
        posts = response.results
    } catch {
        posts = []
    }

    return {
        props: {
            posts,
            category,
            sortedCategories
        }
    }

}