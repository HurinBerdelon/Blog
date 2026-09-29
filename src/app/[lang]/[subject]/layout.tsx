import { isSubject, subjectList } from '@/config/subjects'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
    return subjectList.map(subject => ({ subject }))
}

export default async function SubjectLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ subject: string }>
}) {
    const { subject } = await params
    if (!isSubject(subject)) notFound()

    return children
}
