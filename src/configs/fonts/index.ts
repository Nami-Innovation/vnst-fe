import localFont from 'next/font/local';

export const sfProFont = localFont({
  src: [
    {
      path: './SFPro/SF-Pro-Text-Light.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './SFPro/SF-Pro-Text-Regular.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './SFPro/SF-Pro-Text-Medium.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './SFPro/SF-Pro-Text-Semibold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sfpro',
});

export const sfProExpandedFont = localFont({
  src: [
    {
      path: './SFPro-Expanded/SF-Pro-Expanded-Light.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './SFPro-Expanded/SF-Pro-Expanded-Regular.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './SFPro-Expanded/SF-Pro-Expanded-Medium.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './SFPro-Expanded/SF-Pro-Expanded-Semibold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sfpro-expanded',
});
