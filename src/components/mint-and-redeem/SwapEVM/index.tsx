'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Crypto, PairProps } from './Pair';
import { usdtABI, vnstABI } from '@/web3/evm/abi';
import { USDT_ADDRESS, VNST_ADDRESS } from '@/web3/evm/constants';
import { FunctionName } from '../types';
import useSwapStore from '@/stores/swap.store';
import useWalletStore from '@/stores/wallet.store';

const Pair = dynamic(() => import('./Pair'), { ssr: false });

const vnstToken: Crypto = {
  logo: '/assets/images/cryptos/vnst.png',
  symbol: 'VNST',
  token: VNST_ADDRESS,
  abi: vnstABI,
  scale: 3,
  classNameCurrency: 'text-warning',
};

const usdtToken: Crypto = {
  logo: '/assets/images/cryptos/usdt.png',
  symbol: 'USDT',
  token: USDT_ADDRESS,
  abi: usdtABI,
  scale: 6,
  classNameCurrency: 'text-primary',
};

type Props = {
  active: FunctionName;
  toggleActive: () => void;
};

const SwapEVM = ({ active, toggleActive }: Props) => {
  const [mintLimitMax, redeemLimitMax, mintLimitVerify, redeemLimitVerify] =
    useSwapStore((state) => [
      state.mintLimitMax,
      state.redeemLimitMax,
      state.mintLimitVerify,
      state.redeemLimitVerify,
    ]);
  const [wallet] = useWalletStore((state) => [state.wallet]);
  const { MintProps, BurnProps } = useMemo(() => {
    const MintProps: PairProps = {
      fromToken: usdtToken,
      toToken: vnstToken,
      minAmount: 5,
      maxAmount: wallet?.isVerified ? mintLimitVerify : mintLimitMax,
      contractAddress: VNST_ADDRESS,
      functionName: 'mint',
    };

    const BurnProps: PairProps = {
      fromToken: vnstToken,
      toToken: usdtToken,
      minAmount: 100000,
      maxAmount: wallet?.isVerified ? redeemLimitVerify : redeemLimitMax,
      contractAddress: VNST_ADDRESS,
      functionName: 'redeem',
    };
    return {
      MintProps,
      BurnProps,
    };
  }, [
    wallet,
    mintLimitMax,
    redeemLimitMax,
    mintLimitVerify,
    redeemLimitVerify,
  ]);

  if (active === 'mint') {
    return <Pair key='mint' {...MintProps} toggleActive={toggleActive} />;
  }

  return <Pair key='redeem' {...BurnProps} toggleActive={toggleActive} />;
};

export default SwapEVM;
