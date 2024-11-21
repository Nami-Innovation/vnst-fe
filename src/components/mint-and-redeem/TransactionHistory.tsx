'use client';

import { useActiveChain } from '@/stores/chain.store';
import { Chain } from '@/web3/constants';
import dynamic from 'next/dynamic';
const TransactionTable = dynamic(() => import('./TransactionTable'), {
  ssr: false,
});

const TransactionTableTon = dynamic(() => import('./TransactionTableTon'), {
  ssr: false,
});

const TransactionHistory = () => {
  const activeChain = useActiveChain();

  if (activeChain === Chain.TON) {
    return <TransactionTableTon />;
  }

  return <TransactionTable />;
};

export default TransactionHistory;
