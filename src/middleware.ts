import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPaths = ['/', '/Login', '/SignUp', '/FAQ'];
const protectedPath = '/Dashboard';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const authToken = request.cookies.get('authToken')?.value;

  const isPublicPath = publicPaths.includes(path);
  const isProtectedPath = path.startsWith(protectedPath);

   if (isProtectedPath && !authToken) {
    // Redirect to the Login page without any query parameters.
    return NextResponse.redirect(new URL('/Login', request.url));
  }

  if (authToken && (path === '/Login' || path === '/SignUp')) {
    return NextResponse.redirect(new URL('/Dashboard', request.url));
  }

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}