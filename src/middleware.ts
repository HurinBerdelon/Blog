import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from '@/i18n'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    const hasLocale = locales.some(
        locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (hasLocale) return

    const acceptLang = request.headers.get('accept-language') ?? ''
    const locale = locales.find(l =>
        acceptLang.toLowerCase().includes(l.split('-')[0].toLowerCase())
    ) ?? defaultLocale

    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|_next/data|images|favicon\\.ico).*)'],
}
