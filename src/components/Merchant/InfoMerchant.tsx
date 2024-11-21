'use client';
import { useTranslationClient } from '@/i18n/client';
import React, { useState } from 'react';
// import { AMOUNT_LIST, BTN_FILTER_LIST } from './contants'
// import Button from '../common/Button'
// import AmountMerchant from './AmountMerchant'

type TProps = {
  isConnect: boolean;
  filterDate: number;
  handleClick: (date: number) => void;
};

const InfoMerchant = ({ isConnect, filterDate, handleClick }: TProps) => {
  const { t } = useTranslationClient('merchant');
  return (
    <div className='flex w-full flex-col gap-y-4'>
      <div className='flex w-full flex-row items-center justify-between'>
        <p className='text-mb-large font-semibold dark:text-white'>{t('title')}</p>
        <div className='flex flex-row items-center gap-x-2  '>
          {/* {BTN_FILTER_LIST.map((item) => (
            <div key={item.id}>
              <Button
                size="sm"
                onClick={() => handleClick(item.value)}
                variant={filterDate === item.value ? 'primary' : 'secondary'}
                className="!px-2 lg:px-4"
              >
                {item.title}
              </Button>
            </div>
          ))} */}
        </div>
      </div>
      <div className='flex w-full items-center justify-between sm:flex-col sm:gap-y-6 lg:flex-row'>
        {/* {AMOUNT_LIST.map((item) => (
          <AmountMerchant
            amount={item.amount}
            title={t(item.title)}
            key={item.id}
            isLogin={isConnect}
          />
        ))} */}
      </div>
    </div>
  );
};

export default InfoMerchant;
