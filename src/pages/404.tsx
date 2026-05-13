import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { GetStaticProps } from "next";
import Head from "next/head";
import { createClient } from "prismicio";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import i18nConfig from "../../next-i18next.config";
import { useTranslation } from "next-i18next/pages";
import { fetchCategories } from "@/services/fetchCategories";
import { Category } from "@/schema/Category";
import { useLogin } from "@/hooks/useLogin";
import { LoginModal } from "@/components/LoginModal";
import Image from "next/image";
import Link from "next/link";

interface NotFoundProps {
    sortedCategories: Category[];
}

export default function NotFound({ sortedCategories }: NotFoundProps) {
    const { t } = useTranslation();
    const { isLoginModalOpen, setIsLoginModalOpen } = useLogin();

    return (
        <>
            <Head>
                <title>{`${t("common:notFound")} | Hurin Blog`}</title>
                <meta
                    name="description"
                    content={t("common:generalMetaDescription")}
                />
            </Head>
            <Header sortedCategories={sortedCategories} />
            <main className="flex flex-col flex-1 gap-10 justify-center items-center my-8">
                <Image
                    src="/images/404_notFound.png"
                    alt="404 not found"
                    width={640}
                    height={640}
                    loading="eager"
                />
                <Link
                    href="/category/all"
                    className="px-4 text-center hover:underline text-backgroundDark dark:text-textLight"
                >
                    {t("common:notFoundText")}
                </Link>
                <LoginModal
                    isOpen={isLoginModalOpen}
                    onRequestClose={() => setIsLoginModalOpen(false)}
                />
            </main>
            <Footer sortedCategories={sortedCategories} />
        </>
    );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const client = createClient();

    if (!locale) locale = "en";

    const sortedCategories = await fetchCategories();

    return {
        props: {
            sortedCategories,
            ...(await serverSideTranslations(locale, ["common"], i18nConfig)),
        },
    };
};
