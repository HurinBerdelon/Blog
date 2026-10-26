import Image from "next/image";
import { IdiomSwitcher } from "@/components/IdiomSwitcher";
import { SubjectLinks } from "@/components/SubjectLinks";
import { SubjectRedirect } from "@/components/SubjectRedirect";
import { getDictionary, type Locale } from "@/i18n";
import { buildAlternates } from "@/utils/seo";
import type { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    return {
        title: dict.chooseSubject,
        description: dict.generalMetaDescription,
        alternates: buildAlternates(lang, ""),
        openGraph: {
            title: dict.chooseSubject,
            description: dict.generalMetaDescription,
            url: `/${lang}`,
        },
    };
}

export default async function SubjectChooser({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <main className="flex relative flex-col flex-1 gap-10 justify-center items-center text-backgroundDark dark:text-textLight">
            <SubjectRedirect lang={lang} />
            <div className="absolute top-4 right-4">
                <IdiomSwitcher />
            </div>
            <Image
                width={80}
                height={80}
                src="/images/fernandoCardozoLogo.svg"
                alt="blog logo"
                loading="eager"
            />
            <h1 className="px-4 text-3xl font-semibold text-center">
                {dict.chooseSubject}
            </h1>
            <SubjectLinks lang={lang} dict={dict} />
        </main>
    );
}
