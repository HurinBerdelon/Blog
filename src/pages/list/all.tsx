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

interface AllPostsProps {
    postsResponse: Query<AllDocumentTypes>
    sortedCategories: Category[]
}

export default function AllPosts({ postsResponse, sortedCategories }: AllPostsProps): JSX.Element {

    return (
        <>
            <Head>
                <title>{`All Posts | Hurin Blog`}</title>
            </Head>
            <Header sortedCategories={sortedCategories} />
            <main className="flex-1">
                <ListOfPosts
                    title="All Posts"
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

    const { data: sortedCategories } = await axiosAPI.get('/api/categories')

    const postsResponse = await client.getByType("blog_post",
        {
            page: context.query.page ? Number(context.query.page) : 1,
            pageSize: pageSize,
        })

    return {
        props: {
            postsResponse,
            sortedCategories
        }
    }

}