import { directWhitepaperPage } from '@/components/common/utils/header';

export const Navigations = [
  {
    title: 'mint-and-redeem',
    href: '/mint-and-redeem',
    blank: false,
  },
  {
    title: 'white-paper',
    href: 'https://whitepaper.vnst.io/vnst_whitepaper_vi/noi-dung/so-luoc',
    onclick: (lang: string) => directWhitepaperPage(lang),
    blank: true,
  },
  {
    title: 'blogs',
    href: '/blogs',
    blank: false,
  },
  {
    title: 'merchant',
    href: '/merchant',
    blank: false,
  },
];

export const TMA_NAVIGATIONS = [
  {
    title: 'mint-and-redeem',
    href: '/tma/mint-and-redeem',
    blank: false,
  },
  {
    title: 'white-paper',
    href: 'https://whitepaper.vnst.io/vnst_whitepaper_vi/noi-dung/so-luoc',
    onclick: (lang: string) => directWhitepaperPage(lang),
    blank: true,
  },
];
