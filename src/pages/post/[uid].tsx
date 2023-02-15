import { AllDocumentTypes } from ".slicemachine/prismicio";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Post } from "@/components/Posts/Post";
import { axiosAPI } from "@/services/axios";
import { Category } from "@/types/Category";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { createClient } from "prismicio";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface PostPageProps {
    post: AllDocumentTypes
    sortedCategories: Category[]
}

export default function PostPage({ post, sortedCategories }: PostPageProps): JSX.Element {

    return (
        <>
            <Head>
                <title>{`${post.data.title_of_the_post} | HurinBlog`}</title>
            </Head>
            <Header sortedCategories={sortedCategories} />
            <main className="flex-1">
                <Post post={post} />
            </main>
            <Footer sortedCategories={sortedCategories} />
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {

    return {
        paths: [],
        fallback: "blocking"
    }
}

export const getStaticProps: GetStaticProps = async (context) => {

    const client = createClient()
    const uid = context.params?.uid as string

    const post = await client.getByUID('blog_post', uid)

    const { data: sortedCategories } = await axiosAPI.get('/api/categories')

    const locale = context.locale ?? 'en'

    return {
        props: {
            post,
            sortedCategories,
            ...(await serverSideTranslations(locale, ['common']))
        }
    }
}