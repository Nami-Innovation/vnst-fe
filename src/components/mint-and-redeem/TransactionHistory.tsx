'use client';

import dynamic from 'next/dynamic';
const TransactionTable = dynamic(() => import('./TransactionTable'), {
  ssr: false,
});
const TransactionHistory = () => {
  return <TransactionTable />;
};

export default TransactionHistory;
