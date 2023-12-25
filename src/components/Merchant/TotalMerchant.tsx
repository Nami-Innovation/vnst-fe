import { useTranslationClient } from '@/i18n/client';
import { formatNumber } from '@/utils/format';
import React from 'react';
// import { totals } from './contants'
import clsx from 'clsx';

const TotalMerchant = () => {
  const { t } = useTranslationClient();
  return (
    <div className='grid w-full grid-cols-2 grid-rows-2 items-center justify-center gap-y-2 px-4 py-7 lg:flex'>
      {/* {totals.map((item, index) => (
        <div
          key={index}
          className={clsx(
            'flex-1 w-full flex flex-rows items-center justify-center',
            {
              'lg:border-r border-primary-dark': index !== totals.length - 1,
            },
          )}
        >
          <div className="flex flex-col items-center justify-between gap-y-1 w-full">
            <p className="text-white text-center font-semibold text-sm lg:text-base w-full capitalize">
              {t(item.title)}
            </p>
            <p className="text-gradient lg:text-[30px] text-lg leading-9 font-bold">
              {formatNumber(item.content)}
            </p>
            <div className="circle-shadow absolute bottom-0"></div>
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default TotalMerchant;
