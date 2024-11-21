'use client';
import { createContext, ReactNode, useState } from 'react';
import { TonClient } from '@ton/ton';
import { useAsyncInitialize } from '@/hooks/useAsyncInitialize';
import { getHttpEndpoint } from '@orbs-network/ton-access';
import { isMainnet } from './constants';

type TonClientProvider = {
  children: ReactNode;
};

type TonClientContextProviderValue = {
  tonClient: TonClient | undefined;
};

const initialContext = {
  tonClient: undefined,
};

export const TonClientContext =
  createContext<TonClientContextProviderValue>(initialContext);

export const TonClientProvider = ({ children }: TonClientProvider) => {
  const [client, setClient] = useState<TonClient>();
  useAsyncInitialize(async () => {
    const endpoint = await getHttpEndpoint({
      network: isMainnet ? 'mainnet' : 'testnet',
    });

    const tonClient = new TonClient({ endpoint });
    setClient(tonClient);
  }, []);

  return (
    <TonClientContext.Provider value={{ tonClient: client }}>
      {children}
    </TonClientContext.Provider>
  );
};
