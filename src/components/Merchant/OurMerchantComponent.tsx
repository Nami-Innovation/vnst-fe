/* eslint-disable jsx-a11y/alt-text */
'use client';

import { useTranslationClient } from '@/i18n/client';
import TooltipIcon from '../common/Icons/TooltipIcon';
import { shortenHexString } from '../home/constant';
import Link from 'next/link';
import { copyToClipboard, getBscAddressLink } from '@/utils/helper';
import ExternalIcon from '../common/Icons/ExternalIcon';
import { ReactNode, useMemo, useState } from 'react';
import AboutMerchantComponent from './AboutMerchant';
import ClipboardIcon from '../common/Icons/ClipboardIcon';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import { Nami, Fizen } from './contants';
import { ObjectMerchant } from '@/types/merchant';

type Props = {
  object: ObjectMerchant;
  title: string;
  textColor: string;
  textHover: string;
  logo: ReactNode;
  classNameLogo?: string;
  aboutTitle: string;
  aboutContent: string;
};

export default function OurMerchantComponent({
  object,
  title,
  textColor,
  textHover,
  logo,
  classNameLogo,
  aboutTitle,
  aboutContent,
}: Props) {
  const { t } = useTranslationClient('merchant');
  const [showAbout, setShowAbout] = useState(false);

  const appLink = useMemo(() => {
    return (
      <div className='flex w-full justify-center gap-x-2'>
        <a href={object.link} target='_blank'>
          <img
            className='h-7 w-7'
            src='/assets/images/merchant/icons/ic_web.png'
          />
        </a>
        <a href={object.linkIOS} target='_blank'>
          <img
            className='h-7 w-7'
            src='/assets/images/merchant/icons/ic_apple.png'
          />
        </a>
        <a href={object.linkAndroid} target='_blank'>
          <img
            className='h-7 w-7'
            src='/assets/images/merchant/icons/ic_google_play.png'
          />
        </a>
      </div>
    );
  }, [object]);
  return (
    <div
      className='flex min-h-[188px] w-full flex-col items-start justify-start gap-y-3 rounded-xxl border border-gray-200 bg-white p-4 shadow-md lg:w-1/3 lg:items-center lg:gap-y-4'
      onMouseLeave={() => setShowAbout(false)}
    >
      <div
        className={clsx(
          'flex h-auto w-full flex-col items-center rounded-l-xxl',
          classNameLogo
        )}
      >
        <div className={clsx('h-full w-full rounded-l-xxl')}>
          <div className='flex flex-col items-center gap-x-4 font-sf-pro-expanded text-xl font-bold leading-8 '>
            <Link
              className='z-1 absolute mx-auto flex h-20 w-20 translate-y-[-52px] items-center justify-center rounded-[16px] border border-primary bg-white p-2 transition duration-300 ease-in-out hover:[img:scale-[110%]] lg:mx-0 lg:h-[88px] lg:w-[88px] lg:translate-y-[-62px]'
              href={object.link}
              target='_blank'
            >
              {logo}
            </Link>
            <div className='flex flex-col items-center pt-10 lg:items-start'>
              <div className='flex items-center text-black'>
                <div className='text-lg capitalize leading-[22px] lg:text-xl lg:leading-6'>
                  {title}
                </div>
                <button
                  onMouseMove={() => setShowAbout(true)}
                  className={clsx('ml-2', showAbout ? textHover : 'text-gray')}
                >
                  <TooltipIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAbout ? (
        <AboutMerchantComponent
          setShowAbout={setShowAbout}
          textColor={textColor}
          title={title}
          object={object}
          aboutTitle={aboutTitle}
          aboutContent={aboutContent}
        />
      ) : (
        <div className='flex w-full'>
          <div className='w-full flex-1 flex-col items-start gap-y-3 rounded-md bg-gray-300 px-3 py-3 lg:px-4'>
            <div
              className='mb-3 flex w-full flex-row items-start justify-between'
              style={{ minWidth: 174 }}
            >
              <p
                className={clsx('font-sf-pro text-xs font-semibold text-black')}
              >
                {t('merchant:wallet_address')}
              </p>
              {object.address ? (
                <div className='flex items-center gap-x-1'>
                  <p className='text-xs font-semibold text-gray'>
                    {shortenHexString(object.address, 7, 4)}
                  </p>
                  <button
                    onClick={() => {
                      copyToClipboard(object.address);
                      toast.success(t('merchant:copy_success'));
                    }}
                    className='text-dark-4'
                  >
                    <ClipboardIcon className='h-5 w-5' />
                  </button>
                  <a
                    className='text-dark-4'
                    href={getBscAddressLink(object.address)}
                    target='_blank'
                  >
                    <ExternalIcon />
                  </a>
                </div>
              ) : (
                <div className='text-sm font-semibold text-dark-2 lg:text-base'>
                  {t('updating')}
                </div>
              )}
            </div>
            <div className='flex w-full flex-row items-start justify-between font-semibold lg:gap-y-3 '>
              <p
                className={clsx('font-sf-pro text-xs font-semibold text-black')}
              >
                {t('merchant:integration_date')}
              </p>
              <div className='text-xs font-semibold text-gray'>
                {object.integrationDate}
              </div>
            </div>
          </div>
        </div>
      )}
      {showAbout ? null : appLink}
    </div>
  );
}
