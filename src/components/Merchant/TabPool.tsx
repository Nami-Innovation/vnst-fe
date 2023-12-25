'use client';

import { useTranslationClient } from '@/i18n/client';
import clsx from 'clsx';
import { useState } from 'react';
import RankingMerchant from './RankingMerchant';
import LiquidityMerchant from './LiquidityMerchant';
type TTab = 'liquid' | 'contribution';
const TabPool = () => {
  const { t } = useTranslationClient('merchant');
  const [tab, setTab] = useState<TTab>('contribution');
  return (
    <div className='merchant_pool mt-20 w-screen lg:w-full'>
      <div className='flex w-full items-center justify-start gap-x-8 border-b border-dark-4/30 px-4 font-sf-pro-expanded text-2xl font-bold lg:px-0 lg:text-mb-large'>
        <button
          className={clsx({
            'text-gradient-1 border-b-2 border-primary-dark py-2':
              tab === 'contribution',
            'text-dark-5': tab !== 'contribution',
          })}
          onClick={() => setTab('contribution')}
        >
          {t('merchant:contribution')}
        </button>
        <button
          className={clsx({
            'text-gradient-1 border-b-2 border-primary-dark py-2':
              tab === 'liquid',
            'text-dark-5': tab !== 'liquid',
          })}
          onClick={() => setTab('liquid')}
        >
          {t('merchant:liquidity')}
        </button>
      </div>
      <div className='pt-8'>
        {tab === 'liquid' ? <LiquidityMerchant /> : <RankingMerchant />}
      </div>
    </div>
  );
};

export default TabPool;
