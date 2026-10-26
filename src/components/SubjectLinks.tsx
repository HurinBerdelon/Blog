'use client'
import type { JSX } from 'react'
import Link from 'next/link'
import { Book, Code } from 'phosphor-react'
import { subjectList } from '@/config/subjects'
import type { Dictionary, Locale } from '@/i18n'

const subjectIcons = {
    tech: Code,
    humanities: Book,
}

interface SubjectLinksProps {
    lang: Locale
    dict: Dictionary
}

export function SubjectLinks({ lang, dict }: SubjectLinksProps): JSX.Element {
    return (
        <div className="flex flex-col gap-4 sm:flex-row">
            {subjectList.map(subject => {
                const Icon = subjectIcons[subject]
                return (
                    <Link
                        key={subject}
                        href={`/${lang}/${subject}`}
                        className="flex gap-2 justify-center items-center py-6 w-48 text-xl font-medium text-center capitalize rounded border-2 transition-colors duration-300 ease-in-out border-greenBrandDark hover:bg-greenBrandDark/20 dark:border-grayBrand dark:hover:bg-grayBrand/20"
                    >
                        <Icon size={24} />
                        {dict[subject] ?? subject}
                    </Link>
                )
            })}
        </div>
    )
}
