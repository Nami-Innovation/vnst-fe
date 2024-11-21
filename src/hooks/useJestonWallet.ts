import { useTonConnect } from './useTonConnect';
import { useCallback, useEffect, useMemo } from 'react';
import useTonWalletStore from '@/stores/ton-wallet.store';
import { JETTON_CONFIGS } from '@/web3/ton/constants';
import { useShallow } from 'zustand/react/shallow';

const useJestonWalletData = (symbol: keyof typeof JETTON_CONFIGS) => {
  const { walletAddress, tonClient } = useTonConnect();
  const [jeston, fetchJettonData] = useTonWalletStore(
    useShallow((state) => [state.jestons[symbol], state.fetchJettonData])
  );

  useEffect(() => {
    if (!jeston && tonClient && walletAddress) {
      fetchJettonData(tonClient, symbol, walletAddress!);
    }
  }, [tonClient, walletAddress?.toString(), symbol]);

  const refetch = useCallback(async () => {
    if (tonClient && walletAddress) {
      fetchJettonData(tonClient, symbol, walletAddress!);
    }
  }, [tonClient, walletAddress?.toString(), symbol]);

  const isFetching = jeston?.isFetching ?? false;
  const balance = jeston?.walletData?.balance ?? BigInt(0);
  const config = JETTON_CONFIGS[symbol];
  const decimals = config.decimals;

  const formattedBalance = useMemo(() => {
    return Number(balance) / 10 ** decimals;
  }, [decimals, balance]);

  return {
    balance,
    formattedBalance,
    decimals,
    userAdress: jeston?.userAddress,
    refetch,
    isFetching,
  };
};

export default useJestonWalletData;
