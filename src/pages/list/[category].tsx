import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ListOfPosts } from "@/components/Posts/ListOfPosts";
import { mockPosts } from "@/mock/posts";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

interface CategoryProps {
    category: string
}

export default function Category({ category }: CategoryProps): JSX.Element {
    return (
        <>
            <Head>
                <title>{category} | Hurin Blog</title>
            </Head>
            <main>
                <Header />
                <ListOfPosts
                    title={category}
                    posts={mockPosts}
                    showPagination={true}
                />
                <Footer />
            </main>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { category: 'react' } },
            { params: { category: 'next' } },
        ],
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (context) => {

    const category = context.params?.category

    return {
        props: {
            category
        }
    }

}