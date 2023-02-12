import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Post } from "@/components/Posts/Post";
import { PostType } from "@/types/Post";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

interface PostPageProps {
    post: PostType
}

export default function PostPage({ post }: PostPageProps): JSX.Element {

    return (
        <>
            <Head>
                <title>Create Next App</title>
            </Head>
            <main>
                <Header />
                <Post post={post} />
                <Footer />
            </main>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {

    return {
        paths: [
            { params: { slug: 'post_1' } },
            { params: { slug: 'post_2' } },
        ],
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (context) => {

    const slug = context.params?.slug as string
    const post: PostType = {
        bannerImage: {
            alt: '#',
            src: '#'
        },
        title: slug
    }

    return {
        props: {
            post
        }
    }
}