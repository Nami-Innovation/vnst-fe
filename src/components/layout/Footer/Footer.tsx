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
import { LINK_DIRECT } from '../../common/utils/header';

const Footer = () => {
  const lang = useLang();
  const { t } = useTranslationClient(['homepage', 'footer']);
  const isTablet = useIsTablet();
  return (
    <div className='border-t-gradient-1 relative w-full overflow-hidden'>
      <div className='w-full bg-black'>
        <div className='mx-auto grid max-w-screen-xl grid-cols-1 flex-col items-center gap-y-4 px-4 py-4 lg:grid-cols-6 lg:grid-rows-1 lg:items-start lg:justify-between lg:py-[30px] xl:px-0'>
          <div className='flex h-full w-full flex-col items-center justify-center gap-y-2 lg:col-span-3 lg:items-start lg:justify-between lg:gap-y-6 lg:pt-0'>
            <Image
              src='/assets/images/logo.svg'
              alt='Logo VNST'
              width={240}
              height={57}
              className='h-[40px] w-[140px] lg:h-[36px] lg:w-[147px]'
            />
            <div className='text-center font-bold text-dark-3 lg:text-start'>
              <p className='text-gradient font-sf-pro-expanded text-sm leading-7 lg:text-[20px]'>
                {t('homepage:content_banner')}
              </p>
              <p className='mt-2 hidden text-xs lg:block'>
                {t('footer:copy_right')}
              </p>
            </div>
          </div>
          <div className='flex w-full flex-col items-center justify-start gap-y-2 lg:w-auto lg:items-start lg:gap-y-4'>
            <div className=''>
              <p className='text-sm font-semibold text-white lg:text-base'>
                {t('footer:category')}
              </p>
            </div>
            <div className='flex w-full flex-row items-center justify-around gap-y-2 text-xs text-dark-3 lg:flex-col lg:items-start'>
              <div className='hover:text-gradient'>
                <Link href={`/${lang}/mint-and-redeem`}>
                  {t('footer:mint_redeem')}
                </Link>
              </div>
              <div className='hover:text-gradient'>
                <Link href={`/${lang}/blogs`}>{t('footer:blog')}</Link>
              </div>
              <div className='hover:text-gradient'>
                <Link href={`/${lang}/merchant`}>{t('footer:merchant')}</Link>
              </div>
              <div className='hover:text-gradient'>
                <Link
                  href={LINK_DIRECT[lang as keyof LANGUAGE].white_papper}
                  target='_blank'
                >
                  {t('footer:white_paper')}
                </Link>
              </div>
            </div>
          </div>
          <div className='flex w-full flex-col items-center justify-start gap-y-2 lg:w-auto lg:items-start lg:gap-y-4'>
            <div>
              <p className='text-sm font-semibold text-white lg:text-base'>
                {t('footer:about')}
              </p>
            </div>
            <div
              className={clsx(
                'flex w-full flex-row items-center justify-around gap-y-2 text-xs text-dark-3 lg:flex-col lg:items-start',
                {
                  'grid grid-cols-2 grid-rows-2 items-center justify-center':
                    lang === 'vi' && isTablet === true,
                }
              )}
            >
              <div className='hover:text-gradient text-center lg:text-start'>
                <Link
                  href={LINK_DIRECT[lang as keyof LANGUAGE].terms}
                  target='_blank'
                >
                  {t('footer:terms')}
                </Link>
              </div>
              <div className='hover:text-gradient text-center lg:text-start'>
                <a href='mailto:business@vnst.io'>{t('footer:contact')}</a>
              </div>
              <div className='hover:text-gradient text-center lg:text-start'>
                <Link
                  href={LINK_DIRECT[lang as keyof LANGUAGE].faqs}
                  target='_blank'
                >
                  {t('footer:faqs')}
                </Link>
              </div>
              <div className='hover:text-gradient text-center capitalize lg:text-start'>
                <Link href='https://t.me/+zGmwIXi_tD4xN2I1' target='_blank'>
                  {t('footer:support')}
                </Link>
              </div>
            </div>
          </div>
          <div className='flex w-full flex-col items-center justify-start gap-y-4 lg:w-auto lg:items-start'>
            <div className='hidden lg:block'>
              <p className='text-base font-semibold text-white'>
                {t('footer:community')}
              </p>
            </div>
            <div className='flex flex-row items-center gap-x-2 '>
              <Link href='https://twitter.com/vnstcoin' target='_blank'>
                <IconButton className='hover:text-primary'>
                  <Social_Icon.Twitter fill='currentColor' />
                </IconButton>
              </Link>
              <Link href='https://www.facebook.com/VNST.io/' target='_blank'>
                <IconButton className='hover:text-primary'>
                  <Social_Icon.Facebook fill='currentColor' />
                </IconButton>
              </Link>
              <Link href='https://t.me/vnstann' target='_blank'>
                <IconButton className='hover:text-primary'>
                  <Social_Icon.Telegram fill='currentColor' />
                </IconButton>
              </Link>
              <Link href='https://discord.gg/pwRwbcHHkK ' target='_blank'>
                <IconButton className='hover:text-primary'>
                  <Social_Icon.Discord fill='currentColor' />
                </IconButton>
              </Link>
            </div>
            {/* <div className="w-full flex items-center lg:justify-start justify-center">
              <Link href="/" target="_blank">
                <IconButton className="hover:text-primary">
                  <Social_Icon.Zalo fill="currentColor" />
                </IconButton>
              </Link>
            </div> */}
          </div>
          <p className='mt-2 block w-full border-t border-dark-1 pt-4 text-center text-xs lg:hidden'>
            {t('footer:copy_right')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
