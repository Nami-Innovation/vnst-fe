'use client';

import colors from '@/colors';
import useChainStore from '@/stores/chain.store';
import { Chain } from '@/web3/constants';
import WagmiProvider from '@/web3/evm/WagmiProvider';
import { TonClientProvider } from '@/web3/ton/ton-client-context';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import dynamic from 'next/dynamic';

const ProgressBar = dynamic(
  () => import('next-nprogress-bar').then((result) => result.AppProgressBar),
  { ssr: false }
);

export function Providers({
  children,
  chain,
}: {
  children: React.ReactNode;
  chain: Chain;
}) {
  useChainStore.setState({ chain });

  return (
    // Uncomment khi làm light and dark mode
    // <ThemeProvider attribute="class">
    <>
      <ProgressBar
        height='2px'
        color={colors.primary.DEFAULT}
        options={{ showSpinner: false }}
        shallowRouting
      />
      <TonConnectUIProvider manifestUrl='https://vnst.io/tonconnect-manifest.json'>
        <TonClientProvider>
          <WagmiProvider>{children}</WagmiProvider>
        </TonClientProvider>
      </TonConnectUIProvider>
    </>
    // </ThemeProvider>
  );
}
