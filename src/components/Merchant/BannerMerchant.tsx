/* eslint-disable react-hooks/exhaustive-deps */
import { useTranslation } from '@/i18n';
import React from 'react';

const BannerMerchant = async ({ lang }: { lang: string }) => {
  const { t } = await useTranslation(lang, 'merchant');
  return (
    <div
      className='mx-auto mb-10 h-[600px] w-full max-w-screen-xl overflow-hidden bg-bottom  bg-no-repeat lg:my-[38px] lg:h-[536px] lg:bg-cover lg:bg-center'
      id='banner_merchant'
    >
      <div className='mx-auto mt-9 flex h-full w-full max-w-screen-xl flex-col items-start justify-between gap-y-[170px] lg:mt-[34px] lg:justify-start'>
        <div className='flex w-full flex-col items-start gap-y-[30px] pl-6 pr-1 text-start lg:w-[80%] lg:gap-y-[84px] lg:p-0 lg:px-0'>
          <div className='flex w-full flex-col gap-y-1 text-start font-sf-pro-expanded  text-[32px] font-bold leading-8 lg:text-[70px] lg:leading-[70px]'>
            <div className='w-full'>
              <span className='text-black'>{t('title')}</span>
            </div>
            <div className='w-max'>
              <span
                dangerouslySetInnerHTML={{ __html: t('dashboard') }}
                className='whitespace-pre-wrap break-words text-black after:float-right after:mb-1 after:mt-[-10px] after:h-1.5 after:w-full after:rounded-[3px] after:bg-blueUnder after:text-primary lg:after:mt-[-20px] lg:after:h-2.5'
              ></span>
            </div>
          </div>
          <div className='w-full text-lg leading-[20px] text-black lg:w-[420px] lg:pl-[30px] lg:text-[30px] lg:leading-9'>
            <p
              dangerouslySetInnerHTML={{ __html: t('content') }}
              className='w-full font-sf-pro-expanded font-bold'
            ></p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BannerMerchant;
