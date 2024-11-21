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
      <div className='flex w-full items-center justify-between gap-x-0 border-b border-gray-200 px-4 font-sf-pro-expanded text-2xl font-bold leading-[30px] lg:justify-start lg:gap-x-10 lg:px-0 lg:text-[30px] lg:leading-9'>
        <button
          className={clsx({
            'border-b-2 border-primary py-2 text-primary':
              tab === 'contribution',
            'text-gray': tab !== 'contribution',
          })}
          onClick={() => setTab('contribution')}
        >
          {t('merchant:contribution')}
        </button>
        <button
          className={clsx({
            'border-b-2 border-primary py-2 text-primary': tab === 'liquid',
            'text-gray': tab !== 'liquid',
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
