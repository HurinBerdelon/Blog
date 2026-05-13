import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const secret = req.nextUrl.searchParams.get('secret')
    if (secret !== process.env.PRISMIC_WEBHOOK_SECRET) {
        return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }
    revalidateTag('prismic', {})
    return NextResponse.json({ revalidated: true })
}
