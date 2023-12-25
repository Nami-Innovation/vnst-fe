export const HEADER_ROUTER = [
  {
    title: 'header:home',
    path: '/',
    index: 1,
  },
  {
    title: 'header:min',
    path: '/mint-redeem',
    index: 1,
  },
  {
    title: 'header:white',
    path: '/',
    index: 1,
  },
  {
    title: 'header:home',
    path: '/',
    index: 1,
  },
  {
    title: 'header:home',
    path: '/',
    index: 1,
  },
  {
    title: 'header:home',
    path: '/',
    index: 1,
  },
  {
    title: 'header:home',
    path: '/',
    index: 1,
  },
];

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
};

export type LANGUAGE = {
  vi: string;
  en: string;
};
export const LINK_DIRECT = {
  vi: {
    white_papper: 'https://whitepaper.vnst.io/vnst_whitepaper_vi/',
    terms: 'https://whitepaper.vnst.io/vnst_whitepaper_vi/khung-phap-ly',
    faqs: 'https://whitepaper.vnst.io/vnst_whitepaper_vi/faqs',
    vmm: 'https://whitepaper.vnst.io/vnst_whitepaper_vi/cong-nghe-cot-loi-vmm',
    learn_add_wallet:
      'https://whitepaper.vnst.io/vnst_whitepaper_vi-new/huong-dan/huong-dan-cai-dat-tien-ich-vi',
  },
  en: {
    white_papper: 'https://whitepaper.vnst.io/vnst_whitepaper_en/',
    terms:
      'https://whitepaper.vnst.io/vnst_whitepaper_en/table-of-contents/legal-terms',
    faqs: 'https://whitepaper.vnst.io/vnst_whitepaper_en/table-of-contents/faqs',
    vmm: 'https://whitepaper.vnst.io/vnst_whitepaper_en/table-of-contents/vmm-vnst-market-maker',
    learn_add_wallet:
      'https://whitepaper.vnst.io/vnst_whitepaper_en/table-of-contents/tutorial',
  },
};
export const directWhitepaperPage = (locale: keyof LANGUAGE | string) => {
  return LINK_DIRECT[locale as keyof LANGUAGE].white_papper;
};
