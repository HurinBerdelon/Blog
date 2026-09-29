export const subjectList = ['tech', 'humanities'] as const

export type Subject = (typeof subjectList)[number]

export function isSubject(value: string): value is Subject {
    return (subjectList as readonly string[]).includes(value)
}
