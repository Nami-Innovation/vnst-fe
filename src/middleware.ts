import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import acceptLanguage from 'accept-language';

import { fallbackLng, languages } from './i18n/settings';
import { Chain } from './web3/constants';

acceptLanguage.languages(languages);

const cookieName = 'i18next';

export function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.indexOf('icon') > -1 ||
    req.nextUrl.pathname.indexOf('chrome') > -1
  )
    return NextResponse.next();
  let lng;

  if (req.cookies.has(cookieName))
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);

  // Disabled auto detect language
  // if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  let network: Chain | undefined;
  if (req.nextUrl.searchParams.has('network')) {
    const _network = req.nextUrl.searchParams.get('network');
    if (_network && Chain[_network as Chain]) {
      network = Chain[_network as Chain];
      req.cookies.set('network', network);
    }
  }

  let nextResponse: NextResponse;
  // Redirect if lang in path is not supported
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    nextResponse = NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
    );
  } else if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer') || '');
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    nextResponse = NextResponse.next();
    if (lngInReferer) nextResponse.cookies.set(cookieName, lngInReferer);
  } else {
    nextResponse = NextResponse.next();
  }

  if (network) {
    nextResponse.cookies.set('network', network);
  }

  return nextResponse;
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: [
  //   '/((?!api|_next/static|_next/image|assets|favicon.ico|opengraph-image|sitemap.xml|robots.txt|action|sw.js).*)',
  // ],
  matcher: ['/', `/(vi|en)/:path*`, '/((?!_next|_vercel|.*\\..*).*)'],
};
