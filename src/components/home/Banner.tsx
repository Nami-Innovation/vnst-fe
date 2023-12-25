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
    <div className='relative h-max w-full overflow-x-hidden border-0 bg-black bg-cover bg-no-repeat'>
      <div
        style={{ aspectRatio: 1200 / 884 }}
        className='relative mx-auto hidden max-w-screen-xl lg:block'
      >
        <Image
          src='/assets/images/background_banner.jpeg'
          width={3282}
          height={1470}
          quality={80}
          alt='Banner VNST'
          className='absolute h-full w-auto max-w-none'
          style={{ right: '-54%', top: '-8%' }}
        />
      </div>
      <Image
        width={2280}
        height={360}
        quality={100}
        src='/assets/images/dai-mau.png'
        alt=''
        style={{ maxHeight: 180 }}
        className='absolute bottom-0 hidden h-auto w-full lg:block'
      />

      <div className='w-full lg:absolute lg:top-[20%]'>
        <div className='mx-auto max-w-screen-xl gap-x-4 lg:grid lg:grid-cols-3 lg:gap-y-20 xl:px-0 '>
          <div className=' col-span-2   mb-0 mt-6 text-center font-bold md:px-4 lg:my-auto lg:mt-0 lg:h-full lg:text-start xl:px-0'>
            <div className='hidden text-mb-large leading-8 lg:block lg:text-large lg:leading-[60px]'>
              <span className='text-gradient font-sf-pro-expanded font-bold'>
                {t('title_banner')}
              </span>
            </div>
            <div className='content-animation mt-5 text-mb-large leading-8 lg:mt-0 lg:text-large lg:leading-[60px]'>
              <AnimationContent />
            </div>
            <div className='z-10 mt-4 flex flex-col items-center leading-[60px] lg:mt-6 lg:items-start'>
              <a href={`/${lang}/mint-and-redeem`}>
                <Button size='md' variant='primary' className='!normal-case'>
                  {t('banner_button_content')}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className='w-full md:px-4 lg:absolute lg:bottom-[25%] xl:px-0'
        id='banner_mobile'
      >
        <div className='lg:flex-rows mx-auto flex h-full w-full max-w-screen-xl flex-col items-end justify-end px-4 pb-24 lg:mb-0 lg:items-center lg:justify-center lg:bg-black lg:px-0 lg:pb-0'>
          <BannerContent dataStats={dataStats} lang={lang} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
