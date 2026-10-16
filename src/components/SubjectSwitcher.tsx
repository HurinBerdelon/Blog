'use client'
import { Popover } from '@headlessui/react'
import { subjectList, type Subject } from '@/config/subjects'
import { setSubjectCookie } from '@/utils/subjectCookie'
import { useTranslation } from '@/hooks/useTranslation'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { Books } from 'phosphor-react'

export function SubjectSwitcher(): JSX.Element | null {
    const { t } = useTranslation()
    const params = useParams()
    const pathname = usePathname()
    const currentLang = (params?.lang as string) ?? 'en'
    const currentSubject = params?.subject as string | undefined

    function getSubjectHref(targetSubject: Subject): string {
        return (pathname ?? '/').replace(`/${currentLang}/${currentSubject}`, `/${currentLang}/${targetSubject}`)
    }

    if (!currentSubject) return null

    return (
        <Popover className="relative flex">
            <Popover.Button className="text-3xl">
                <Books className="text-backgroundDark hover:text-greenBrandDark dark:text-textLight dark:hover:text-grayBrand" />
            </Popover.Button>
            <Popover.Panel className="absolute right-0 top-10 rounded bg-greenBrand p-4 md:text-lg dark:bg-greenBrandDark">
                <ul className="flex flex-col text-textLight font-medium gap-1">
                    {subjectList.map(subject => (
                        <li key={subject}>
                            <Link
                                className="capitalize flex gap-2 items-center hover:text-white transition-all dark:hover:text-grayBrand"
                                href={getSubjectHref(subject)}
                                onClick={() => setSubjectCookie(subject)}
                            >
                                <span className={currentSubject === subject ? 'cursor-default' : 'hover:underline'}>
                                    {t(`common:${subject}`)}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Popover.Panel>
        </Popover>
    )
}
