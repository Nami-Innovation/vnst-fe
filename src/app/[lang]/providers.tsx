'use client';

import WagmiProvider from '@/web3/WagmiProvider';
// import { ThemeProvider } from "next-themes";
import dynamic from 'next/dynamic';

const ProgressBar = dynamic(
  () => import('next-nprogress-bar').then((result) => result.AppProgressBar),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // Uncomment khi làm light and dark mode
    // <ThemeProvider attribute="class">
    <>
      <ProgressBar
        height='2px'
        color='#00C096'
        options={{ showSpinner: false }}
        shallowRouting
      />
      <WagmiProvider>{children}</WagmiProvider>
    </>
    // </ThemeProvider>
  );
}
