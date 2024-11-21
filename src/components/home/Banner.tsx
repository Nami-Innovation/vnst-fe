/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import BannerContent from './BannerContent';
import { useTranslation } from '@/i18n';
import AnimationContent from './AnimationContent';
import Image from 'next/image';

const Banner = async ({
  lang,
  dataStats,
}: {
  lang: string;
  dataStats: any;
}) => {
  const { t } = await useTranslation(lang, 'homepage');

  return (
    <div className='bg-fit relative h-[790px] w-full max-w-screen-2xl overflow-hidden border-0 bg-secondary-lightest lg:h-[744px] lg:py-[70px]'>
      <div className='h-full w-full bg-[url(/assets/images/bg_bannerMB.png)] bg-[length:100%_384px] bg-[right_top_35%] bg-no-repeat lg:bg-[url(/assets/images/background_banner.png)] lg:bg-[length:1440px_535px] lg:bg-center'>
        <div className='mx-auto max-w-screen-xl gap-x-4 lg:gap-y-20 xl:px-0  '>
          <div className='mb-0 mt-6 w-full text-center font-semibold lg:my-auto lg:mt-0 lg:h-full lg:w-[70%] lg:text-start xl:px-0'>
            <div className='content-animation mt-12 h-[68px] space-y-3 text-[32px] leading-8 lg:mt-0 lg:h-[160px] lg:text-[70px] lg:leading-[70px] '>
              <AnimationContent />
            </div>
            <div className='mt-8 flex flex-col px-4 leading-[60px] lg:mt-7 lg:items-start lg:px-0'>
              <a href={`/${lang}/mint-and-redeem`}>
                <Button
                  size='md'
                  variant='primary'
                  className='!px-5 !py-2.5 font-semibold !normal-case leading-5'
                >
                  {t('banner_button_content')}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className='absolute bottom-2 w-full md:px-4 lg:bottom-4 xl:px-0'>
        <div className='lg:flex-rows mx-auto flex h-full w-full max-w-screen-xl flex-col items-end justify-end px-4 lg:mb-0 lg:h-[120px] lg:items-center lg:justify-center lg:px-0 lg:pb-0'>
          <BannerContent dataStats={dataStats} lang={lang} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
