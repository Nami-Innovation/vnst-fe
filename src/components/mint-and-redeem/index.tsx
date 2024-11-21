'use client';

import React, { useState } from 'react';
import Tabs from './Tabs';
import { FunctionName } from './types';
import '@/styles/mint-redeem.scss';
import { useActiveChainConfig } from '@/stores/chain.store';
import { ChainType } from '@/web3/constants';
import dynamic from 'next/dynamic';
const SwapEVM = dynamic(() => import('./SwapEVM'), { ssr: false });
const SwapTON = dynamic(() => import('./SwapTON'), { ssr: false });

const MintRedeem = () => {
  const [active, setActive] = useState<FunctionName>('mint');
  const { chainType } = useActiveChainConfig();

  const toggleActive = () =>
    setActive((active) => (active === 'mint' ? 'redeem' : 'mint'));

  return (
    <div className='sticky top-4 mx-auto max-w-md'>
      <Tabs active={active} onChange={setActive} />
      {chainType === ChainType.EVM ? (
        <SwapEVM active={active} toggleActive={toggleActive} />
      ) : (
        <SwapTON active={active} toggleActive={toggleActive} />
      )}
    </div>
  );
};

export default MintRedeem;
