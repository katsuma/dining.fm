import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: new Headers(request.headers),
    },
  });

  response.headers.set('cache-control', 'public, max-age=600, s-maxage=600, stale-while-revalidate=60');
  return response;
}
