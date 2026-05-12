import { BlogPostDocument } from ".slicemachine/prismicio";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Post } from "@/components/Posts/Post";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { createClient } from "prismicio";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { fetchCategories } from "@/services/fetchCategories";
import { Category } from "@/schema/Category";
import { useLogin } from "@/hooks/useLogin";
import { LoginModal } from "@/components/LoginModal";
import { languages } from "@/config/languages";

interface PostPageProps {
    post: BlogPostDocument
    sortedCategories: Category[]
}

export default function PostPage({ post, sortedCategories }: PostPageProps): JSX.Element {

    const { isLoginModalOpen, setIsLoginModalOpen } = useLogin()

    return (
        <>
            <Head>
                <title>{`${post.data.title_of_the_post} | HurinBlog`}</title>
                <meta name="description" content={post.data.meta_description} />
            </Head>
            <Header sortedCategories={sortedCategories} />
            <main className="flex-1">
                <Post post={post} />
                <LoginModal isOpen={isLoginModalOpen} onRequestClose={() => setIsLoginModalOpen(false)} />
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

    const client = createClient({ previewData: context.previewData })
    const uid = context.params?.uid as string

    const locale = context.locale ?? 'en'

    try {
        const post = await client.getByUID('blog_post', uid, {
            lang: languages[context.locale].prismic_code,
            fetchLinks: [
                'author.authorprofileimage',
                'author.name'
            ]
        })

        const sortedCategories = await fetchCategories()

        return {
            props: {
                post,
                sortedCategories,
                ...(await serverSideTranslations(locale, ['common']))
            }
        }
    } catch (error) {
        console.log(error)
        return {
            redirect: {
                destination: `/${locale}/404`,
                permanent: false
            }
        }
    }
}