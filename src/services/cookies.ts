export function getCookie(name: string): string {
    if (typeof document === 'undefined') return ''
    return document.cookie.split('; ').find(row => row.startsWith(`${name}=`))?.split('=')[1] ?? ''
}

export function setCookie(name: string, value: string, maxAge: number) {
    document.cookie = `${name}=${value}; max-age=${maxAge}; path=/`
}

export function deleteCookie(name: string) {
    document.cookie = `${name}=; max-age=0; path=/`
}
