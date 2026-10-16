import Image from 'next/image'
import Link from 'next/link'
import { subjectList } from '@/config/subjects'
import { SubjectRedirect } from '@/components/SubjectRedirect'
import { getDictionary, type Locale } from '@/i18n'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params
    const dict = await getDictionary(lang)
    return {
        title: dict.chooseSubject,
        description: dict.generalMetaDescription,
        openGraph: {
            title: dict.chooseSubject,
            description: dict.generalMetaDescription,
            url: `/${lang}`,
        },
    }
}

export default async function SubjectChooser({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params
    const dict = await getDictionary(lang)

    return (
        <main className="flex flex-col flex-1 gap-10 items-center justify-center text-backgroundDark dark:text-textLight">
            <SubjectRedirect lang={lang} />
            <Image
                width={80}
                height={80}
                src="/images/fernandoCardozoLogo.svg"
                alt="blog logo"
                loading="eager"
            />
            <h1 className="text-3xl font-semibold text-center px-4">{dict.chooseSubject}</h1>
            <div className="flex flex-col gap-4 sm:flex-row">
                {subjectList.map(subject => (
                    <Link
                        key={subject}
                        href={`/${lang}/${subject}`}
                        className="rounded border-2 border-greenBrandDark px-10 py-6 text-xl font-medium capitalize transition-all hover:bg-greenBrandDark hover:text-textLight dark:border-grayBrand dark:hover:bg-grayBrand"
                    >
                        {dict[subject] ?? subject}
                    </Link>
                ))}
            </div>
        </main>
    )
}
