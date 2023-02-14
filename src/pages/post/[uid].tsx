import { AllDocumentTypes } from ".slicemachine/prismicio";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Post } from "@/components/Posts/Post";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { createClient } from "prismicio";

interface PostPageProps {
    post: AllDocumentTypes
}

export default function PostPage({ post }: PostPageProps): JSX.Element {

    return (
        <>
            <Head>
                <title>{`${post.data.title_of_the_post} | HurinBlog`}</title>
            </Head>
            <Header />
            <main className="flex-1">
                <Post post={post} />
            </main>
            <Footer />
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

    return {
        props: {
            post
        }
    }
}