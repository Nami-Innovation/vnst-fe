'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/utils/helper';

const MintRedeem = dynamic(() => import('./MintRedeem'), {
  ssr: false,
});

const TransactionHistory = dynamic(() => import('./TransactionHistory'), {
  ssr: false,
});

type Tab = 'mintRedeem' | 'history';

export default function HomePage() {
  const [tab, setTab] = useState<Tab>('mintRedeem');
  return (
    <div className='mx-auto px-4'>
      <div className='mt-2 grid w-full grid-cols-2 border-b border-gray-200 font-sf-pro text-base font-semibold'>
        <button
          className={cn({
            'border-b-2 border-primary py-2 text-primary': tab === 'mintRedeem',
            'text-gray': tab !== 'mintRedeem',
          })}
          onClick={() => setTab('mintRedeem')}
        >
          Mint & Redeem
        </button>
        <button
          className={cn({
            'border-b-2 border-primary py-2 text-primary': tab === 'history',
            'text-gray': tab !== 'history',
          })}
          onClick={() => setTab('history')}
        >
          History
        </button>
      </div>
      <div className='pt-4'>
        {tab === 'mintRedeem' ? <MintRedeem /> : <TransactionHistory />}
      </div>
    </div>
  );
}
