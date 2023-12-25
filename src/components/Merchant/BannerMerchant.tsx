/* eslint-disable react-hooks/exhaustive-deps */
import { useTranslation } from '@/i18n';
import React from 'react';

const BannerMerchant = async ({ lang }: { lang: string }) => {
  const { t } = await useTranslation(lang, 'merchant');
  return (
    <div
      className='mx-auto min-h-[440px] w-full overflow-hidden bg-cover bg-center bg-no-repeat lg:bg-center'
      id='banner_merchant'
    >
      <div className='mx-auto mt-6 flex h-full w-full max-w-screen-xl flex-col items-start justify-between gap-y-[170px] lg:mt-[84px] lg:justify-start '>
        <div className='w-full px-4 text-start lg:w-1/2 lg:p-0'>
          <div className='leading-mb-large mb-3 text-start font-sf-pro-expanded text-3xl font-bold sm:text-mb-large lg:text-large lg:leading-[60px]'>
            <div>
              <span>{t('title')}</span>
            </div>
            <div>
              <span className='text-gradient break-keep '>
                {t('dashboard')}
              </span>
            </div>
          </div>
          <div className='font-semibold text-white'>
            <p dangerouslySetInnerHTML={{ __html: t('content') }}></p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BannerMerchant;
