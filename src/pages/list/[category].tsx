import { AllDocumentTypes } from ".slicemachine/prismicio";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ListOfPosts } from "@/components/Posts/ListOfPosts";
import { mockPosts } from "@/mock/posts";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { createClient } from "prismicio";

interface CategoryProps {
    posts: AllDocumentTypes[]
    category: string
}

export default function Category({ posts, category }: CategoryProps): JSX.Element {
    return (
        <>
            <Head>
                <title>{`${category} | Hurin Blog`}</title>
            </Head>
            <Header />
            <main className="flex-1">
                <ListOfPosts
                    title={category}
                    posts={posts}
                    showPagination={true}
                />
            </main>
            <Footer />
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const client = createClient()
    const posts = await client.getAllByType('blog_post')
    const tags = Array.from(new Set(posts.map(post => post.tags).flat()))

    return {
        paths: tags.map(tag => (
            { params: { category: tag } }
        )),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const client = createClient()

    const category = context.params?.category as string

    let posts: AllDocumentTypes[]

    try {
        posts = await client.getAllByTag(category)
    } catch {
        posts = []
    }

    return {
        props: {
            posts,
            category
        }
    }

}