'use client';

import React, { useState } from 'react';
import Tabs from './Tabs';
import dynamic from 'next/dynamic';
import { Crypto, PairProps } from './Pair';
import { usdtABI, vnstABI } from '@/web3/abi';
import { USDT_ADDRESS, VNST_ADDRESS } from '@/web3/constants';
import { FunctionName } from './types';
import useSwapStore from '@/stores/swap.store';
import '@/styles/mint-redeem.scss';

const Pair = dynamic(() => import('./Pair'), { ssr: false });

const vnstToken: Crypto = {
  logo: '/assets/images/cryptos/vnst.png',
  symbol: 'VNST',
  token: VNST_ADDRESS,
  abi: vnstABI,
  scale: 3,
  classNameCurrency: 'text-vnst',
};

const usdtToken: Crypto = {
  logo: '/assets/images/cryptos/usdt.png',
  symbol: 'USDT',
  token: USDT_ADDRESS,
  abi: usdtABI,
  scale: 6,
  classNameCurrency: 'text-primary',
};

const MintRedeem = () => {
  const [active, setActive] = useState<FunctionName>('mint');
  const [mintLimitMax, redeemLimitMax] = useSwapStore((state) => [
    state.mintLimitMax,
    state.redeemLimitMax,
  ]);
  const MintProps: PairProps = {
    fromToken: usdtToken,
    toToken: vnstToken,
    minAmount: 5,
    maxAmount: mintLimitMax,
    contractAddress: VNST_ADDRESS,
    functionName: 'mint',
  };

  const BurnProps: PairProps = {
    fromToken: vnstToken,
    toToken: usdtToken,
    minAmount: 100000,
    maxAmount: redeemLimitMax,
    contractAddress: VNST_ADDRESS,
    functionName: 'redeem',
  };

  const toggleActive = () =>
    setActive((active) => (active === 'mint' ? 'redeem' : 'mint'));

  return (
    <div className='sticky top-4 mx-auto max-w-md'>
      <Tabs active={active} onChange={setActive} />
      {active === 'mint' ? (
        <Pair key='mint' {...MintProps} toggleActive={toggleActive} />
      ) : (
        <Pair key='redeem' {...BurnProps} toggleActive={toggleActive} />
      )}
    </div>
  );
};

export default MintRedeem;
