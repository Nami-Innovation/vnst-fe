/* eslint-disable react-hooks/rules-of-hooks */
import '@/styles/globals.scss';
import { sfProExpandedFont, sfProFont } from '@/configs/fonts';
import { dir } from 'i18next';
import type { Metadata } from 'next';
import MainLayout from '@/components/layout/main-layout';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import { Providers } from './providers';
import Auth from '@/components/auth/Auth';
import { languages } from '@/i18n/settings';
import { notFound } from 'next/navigation';
import { useTranslation } from '@/i18n';
import Script from 'next/script';
import { Suspense } from 'react';
import Analytics from '@/components/Analytics';
import { getNetworkByCookie } from '@/utils/helper';
import { cookies } from 'next/headers';

const ConnectWalletModal = dynamic(
  () => import('@/components/ConnectWalletModal'),
  { ssr: false }
);

const AppToast = dynamic(() => import('@/components/common/AppToast'), {
  ssr: false,
});

// comment vì issue của next js https://github.com/vercel/next.js/issues/56018
// export function generateStaticParams() {
//   return languages.map((lang) => ({ lang }));
// }

type Props = {
  children: React.ReactNode;
  params: { lang: string };
};

export const generateMetadata = async ({
  params: { lang },
}: Props): Promise<Metadata> => {
  const { t } = await useTranslation(lang, 'layout');

  return {
    title:
      'VNST Stablecoin | Empowering Secure Digital Transactions | Official Website',
    description: t('meta_description'),
    themeColor: 'dark',
    viewport: 'width=device-width, initial-scale=1',
    colorScheme: 'light dark',
    twitter: {
      site: '@vnstcoin',
    },
    openGraph: {
      siteName: 'VNST',
    },
  };
};

export default function RootLayout({ children, params: { lang } }: Props) {
  if (!languages.includes(lang)) {
    notFound();
  }

  const chain = getNetworkByCookie(cookies);

  return (
    <html lang={lang} dir={dir(lang)}>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <meta
          name='google-site-verification'
          content='z8DyL1H-OC0bC03lBwCxj55lyZxepTlhpS7vnp6TdR0'
        />
      </head>
      <body
        className={clsx(
          sfProFont.variable,
          sfProExpandedFont.variable,
          'font-sf-pro text-black'
        )}
      >
        {/* Analytics */}
        <Suspense>
          <Analytics />
        </Suspense>

        {/* svg to reuse gradient in icon */}
        {/* <svg width='0' height='0'>
          <defs>
            <linearGradient id='icon_gradient'>
              <stop stopColor='#006666' />
              <stop offset='0.5' stopColor={colors.primary.DEFAULT} />
              <stop offset='1' stopColor='#8EFFE9' />
            </linearGradient>
          </defs>
        </svg> */}
        {/* -------- */}
        <Providers chain={chain}>
          <ConnectWalletModal />
          <MainLayout lang={lang}>{children}</MainLayout>
          <Auth />
          <AppToast />
        </Providers>
      </body>
      {/* @ts-ignore */}
      <Script src='//fw-cdn.com/10790429/3571730.js' chat='true' />
    </html>
  );
}
