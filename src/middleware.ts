import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


const publiclyAccessiblePaths = ['/', '/Login', '/SignUp', '/FAQ'];
const protectedPath = '/Dashboard';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const authToken = request.cookies.get('authToken')?.value;

  // Allow access to public paths and the dynamic download routes
  const isPublic = publiclyAccessiblePaths.includes(path) || path.startsWith('/CopyPublicAccess');
  if (isPublic) {
    return NextResponse.next();
  }

  // Redirect authenticated users from login/signup to the dashboard
  if (authToken && (path === '/Login' || path === '/SignUp')) {
    return NextResponse.redirect(new URL('/Dashboard', request.url));
  }

  // If there's no token and the path is not public, redirect to login.
  // This protects all other routes by default.
  if (!authToken) {
    return NextResponse.redirect(new URL('/Login', request.url));
  }

  // If the user is authenticated and the path is not public, allow them to proceed.
  return NextResponse.next();
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