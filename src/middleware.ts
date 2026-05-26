import {NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth_token')
    const url = request.nextUrl.pathname

    if(!token && ( url !== '/loginpage' && url !== '/callback')) {
        return NextResponse.redirect(new URL('/loginpage', request.url))
    }

    if(token && ( url == '/loginpage' || url == '/callback')) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}


export const config = {
    matcher: ['/', '/loginpage', '/callback', '/chats/:path*']
}