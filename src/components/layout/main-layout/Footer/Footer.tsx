'use client';

import { useTranslationClient } from '@/i18n/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import IconButton from '@/components/common/Button/IconButton';
import { Social_Icon } from '@/components/common/Icons/SocialIcon';
import clsx from 'clsx';
import { useIsTablet } from '@/hooks/useMediaQuery';
import useLang from '@/hooks/useLang';
import { LANGUAGE } from '@/utils/type';
import { LINK_DIRECT } from '@/components/common/utils/header';

const Footer = () => {
  const lang = useLang();
  const { t } = useTranslationClient(['homepage', 'footer']);
  const isTablet = useIsTablet();
  return (
    <div className='relative w-full overflow-hidden bg-black'>
      <div className='w-full bg-[url(/assets/images/bg_footer.svg)] bg-contain bg-top bg-no-repeat lg:bg-repeat-x'>
        <div className='mx-auto flex max-w-screen-xl flex-col items-center gap-x-[50px] gap-y-4 px-4 pb-8 pt-9 lg:flex-row lg:items-start lg:justify-between lg:py-7 xl:px-0'>
          <div className='flex h-full w-full flex-col items-center justify-center gap-y-4 lg:col-span-3 lg:w-1/2 lg:items-start lg:justify-between lg:gap-y-5 lg:pt-0'>
            <Image
              src='/assets/images/logo_full.png'
              width={130}
              height={36}
              alt='Logo Short'
              className='h-9 w-[130px]  lg:h-[52px] lg:w-[188px]'
            />
            <div className='text-center font-semibold text-gray lg:text-start'>
              <p
                className={clsx(
                  'w-max text-center font-sf-pro-expanded text-base font-semibold leading-5 text-secondary-lightest lg:text-start'
                )}
              >
                {t('homepage:content_banner')}
              </p>
            </div>
          </div>
          <div className='mt-4 flex w-full flex-col items-center justify-start gap-y-3 lg:mt-0 lg:w-max lg:items-start lg:gap-y-5'>
            <div className=''>
              <p className='text-sm font-semibold leading-[18px] text-white lg:text-base lg:leading-5'>
                {t('footer:category')}
              </p>
            </div>
            <div className='flex w-full flex-row items-center justify-around gap-x-[30px] gap-y-2.5 text-xs text-gray lg:flex-col lg:items-start'>
              <div className='font-semibold hover:text-primary'>
                <Link href={`/${lang}/mint-and-redeem`}>
                  {t('footer:mint_redeem')}
                </Link>
              </div>
              <div className='font-semibold hover:text-primary'>
                <Link href={`/${lang}/blogs`}>{t('footer:blog')}</Link>
              </div>
              <div className='font-semibold hover:text-primary'>
                <Link href={`/${lang}/merchant`}>{t('footer:merchant')}</Link>
              </div>
              <div className='font-semibold hover:text-primary'>
                <Link
                  href={LINK_DIRECT[lang as keyof LANGUAGE].white_papper}
                  target='_blank'
                >
                  {t('footer:white_paper')}
                </Link>
              </div>
            </div>
          </div>
          <div className='mt-3 flex w-full flex-col items-center justify-start gap-y-3 lg:mt-0 lg:w-max lg:items-start lg:gap-y-5'>
            <div>
              <p className='text-sm font-semibold leading-[18px] text-white lg:text-base lg:leading-5'>
                {t('footer:about')}
              </p>
            </div>
            <div
              className={clsx(
                'flex w-full flex-row items-center justify-around gap-x-[30px] gap-y-2.5 text-xs text-gray lg:flex-col lg:items-start',
                {
                  'grid grid-cols-2 grid-rows-2 items-center justify-center':
                    lang === 'vi' && isTablet === true,
                }
              )}
            >
              <div className='text-center font-semibold hover:text-primary lg:text-start'>
                <Link
                  href={LINK_DIRECT[lang as keyof LANGUAGE].terms}
                  target='_blank'
                >
                  {t('footer:terms')}
                </Link>
              </div>
              <div className='text-center font-semibold hover:text-primary lg:text-start'>
                <a href='mailto:business@vnst.io'>{t('footer:contact')}</a>
              </div>
              <div className='text-center font-semibold hover:text-primary lg:text-start'>
                <Link
                  href={LINK_DIRECT[lang as keyof LANGUAGE].faqs}
                  target='_blank'
                >
                  {t('footer:faqs')}
                </Link>
              </div>
              <div className='text-center font-semibold capitalize hover:text-primary lg:text-start'>
                <Link href='https://t.me/+zGmwIXi_tD4xN2I1' target='_blank'>
                  {t('footer:support')}
                </Link>
              </div>
            </div>
          </div>
          <div className='mt-2 flex w-full flex-col items-center justify-start gap-y-4 lg:mt-0 lg:w-max lg:items-start'>
            <div className='hidden lg:block'>
              <p className='text-base font-semibold leading-5 text-white'>
                {t('footer:community')}
              </p>
            </div>
            <div className='flex flex-row items-center gap-x-4 lg:gap-x-1.5'>
              <Link href='https://twitter.com/vnstcoin' target='_blank'>
                <IconButton className='font-semibold text-primary-dark hover:text-primary'>
                  <Social_Icon.Twitter fill='currentColor' />
                </IconButton>
              </Link>
              <Link href='https://www.facebook.com/VNST.io/' target='_blank'>
                <IconButton className='font-semibold text-primary-dark hover:text-primary'>
                  <Social_Icon.Facebook fill='currentColor' />
                </IconButton>
              </Link>
              <Link href='https://t.me/vnstann' target='_blank'>
                <IconButton className='font-semibold text-primary-dark hover:text-primary'>
                  <Social_Icon.Telegram fill='currentColor' />
                </IconButton>
              </Link>
              <Link href='https://discord.gg/pwRwbcHHkK ' target='_blank'>
                <IconButton className='font-semibold text-primary-dark hover:text-primary'>
                  <Social_Icon.Discord fill='currentColor' />
                </IconButton>
              </Link>
            </div>
          </div>
        </div>
        <div className='w-full bg-primary/10'>
          <div className='mx-auto max-w-screen-xl'>
            <p className='w-full py-2.5 text-center text-xs font-semibold leading-4 text-primary lg:py-1.5 lg:text-start'>
              {t('footer:copy_right')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
