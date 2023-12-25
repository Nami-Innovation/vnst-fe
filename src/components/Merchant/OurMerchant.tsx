/* eslint-disable jsx-a11y/alt-text */
'use client';

import { useTranslationClient } from '@/i18n/client';
import TooltipIcon from '../common/Icons/TooltipIcon';
import { shortenHexString } from '../home/constant';
import Link from 'next/link';
import { copyToClipboard, getBscAddressLink } from '@/utils/helper';
import ExternalIcon from '../common/Icons/ExternalIcon';
import { useState } from 'react';
import { AboutNamiMerchant, AboutOxalusMerchant } from './AboutMerchant';
import ClipboardIcon from '../common/Icons/ClipboardIcon';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import { Nami, Oxalus } from './contants';

const NamiMerchant = () => {
  const { t } = useTranslationClient('merchant');
  const [showAbout, setShowAbout] = useState(false);
  const renderIcons = (
    <div className='mt-5 flex justify-around gap-x-2 lg:mt-2 lg:justify-start'>
      <a href={Nami.link} target='_blank'>
        <img
          className='h-6 w-6 lg:h-9 lg:w-9'
          src='/assets/images/merchant/icons/ic_web.png'
        />
      </a>
      <a href={Nami.linkIOS} target='_blank'>
        <img
          className='h-6 w-6 lg:h-9 lg:w-9'
          src='/assets/images/merchant/icons/ic_apple.png'
        />
      </a>
      <a href={Nami.linkAndroid} target='_blank'>
        <img
          className='h-6 w-6 lg:h-9 lg:w-9'
          src='/assets/images/merchant/icons/ic_google_play.png'
        />
      </a>
    </div>
  );
  return (
    <div
      className='flex min-h-[188px] items-stretch justify-start rounded-xxl bg-white lg:min-h-0 lg:items-center'
      onMouseLeave={() => setShowAbout(false)}
    >
      <div className='h-auto w-1/3 rounded-l-xxl bg-gradient-to-b from-primary-dark via-primary to-white lg:w-[35%] lg:bg-gradient-to-r'>
        <div className='nami_merchant_bg h-full w-full rounded-l-xxl bg-bottom lg:bg-left'>
          <div className='flex flex-col gap-x-4 px-3 py-4 font-sf-pro-expanded text-mb-large font-bold leading-8 lg:flex-row lg:items-center lg:pr-20'>
            <Link
              className='mx-auto flex h-[76px] w-[76px] items-center justify-center rounded-md bg-white p-2 lg:mx-0 lg:h-[86px] lg:w-[86px]'
              href={Nami.link}
              target='_blank'
            >
              <img
                src='/assets/images/merchant/nami_exchange_logo.svg'
                className='animation-logo'
                alt='Nami exchange'
              />
            </Link>
            <div className='hidden flex-col items-start lg:flex'>
              <div className='flex items-center justify-start gap-x-2 text-dark-2'>
                <p className='uppercase text-white'>Nami</p>
                <button
                  onMouseMove={() => setShowAbout(true)}
                  className={clsx('', {
                    'text-white': showAbout === false,
                    'text-primary-dark': showAbout === true,
                  })}
                >
                  <TooltipIcon />
                </button>
              </div>
              {renderIcons}
            </div>
            <div className='block lg:hidden'>{renderIcons}</div>
          </div>
        </div>
      </div>
      {showAbout ? (
        <AboutNamiMerchant setShowAbout={setShowAbout} />
      ) : (
        <div className='col-span-2 w-2/3 flex-1 flex-col items-start justify-around gap-x-2 px-4 py-4 lg:flex lg:w-auto lg:flex-row lg:items-center lg:px-0 lg:py-0'>
          <div className='flex-rows mb-4 flex items-center gap-x-2 font-sf-pro-expanded  text-lg font-semibold lg:mb-0 lg:hidden'>
            <p className='uppercase text-primary'>Nami</p>
            <div className='flex items-center justify-start gap-x-2 text-dark-2'>
              <button
                onClick={() => setShowAbout(true)}
                className='text-dark-4'
              >
                <TooltipIcon />
              </button>
            </div>
          </div>
          <div
            className='mb-4 flex flex-col items-start justify-center lg:mb-0 lg:gap-y-3'
            style={{ minWidth: 174 }}
          >
            <p className='font-sf-pro-expanded text-sm font-semibold text-primary lg:text-xl'>
              {t('merchant:wallet_address')}
            </p>
            <div className=' flex items-center justify-start gap-x-1'>
              <p className='text-sm font-semibold text-dark-2 lg:text-base'>
                {shortenHexString(Nami.address, 7, 4)}
              </p>
              <button
                onClick={() => {
                  copyToClipboard(Nami.address);
                  toast.success(t('merchant:copy_success'));
                }}
                className='text-dark-4'
              >
                <ClipboardIcon />
              </button>
              <a
                className='text-dark-4'
                href={getBscAddressLink(Nami.address)}
                target='_blank'
              >
                <ExternalIcon />
              </a>
            </div>
          </div>
          <div className='flex flex-col items-start justify-center font-semibold lg:gap-y-3 '>
            <p className='font-sf-pro-expanded text-sm font-semibold text-primary lg:text-xl'>
              {t('merchant:integration_date')}
            </p>
            <div className='text-sm font-semibold text-dark-2 lg:text-base'>
              {Nami.integrationDate}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const OxalusMerchant = () => {
  const { t } = useTranslationClient('merchant');
  const [showAbout, setShowAbout] = useState(false);

  const appLink = (
    <div className='mt-5 flex justify-around gap-x-2 lg:mt-2 lg:justify-start'>
      <a href={Oxalus.link} target='_blank'>
        <img
          className='h-6 w-6 lg:h-9 lg:w-9'
          src='/assets/images/merchant/icons/ic_web.png'
        />
      </a>
      <a href={Oxalus.linkIOS} target='_blank'>
        <img
          className='h-6 w-6 lg:h-9 lg:w-9'
          src='/assets/images/merchant/icons/ic_apple.png'
        />
      </a>
      <a href={Oxalus.linkAndroid} target='_blank'>
        <img
          className='h-6 w-6 lg:h-9 lg:w-9'
          src='/assets/images/merchant/icons/ic_google_play.png'
        />
      </a>
    </div>
  );
  return (
    <div
      className='flex min-h-[188px] items-stretch justify-start rounded-xxl bg-white lg:min-h-0 lg:items-center'
      onMouseLeave={() => setShowAbout(false)}
    >
      <div className='h-auto w-1/3 rounded-l-xxl lg:w-[35%]'>
        <div className='oxalus_merchant_bg h-full w-full rounded-l-xxl bg-bottom lg:bg-right'>
          <div className='flex flex-col gap-x-4 px-3 py-4 font-sf-pro-expanded text-mb-large font-bold leading-8 lg:flex-row lg:items-center'>
            <Link
              className='mx-auto flex h-[76px] w-[76px] items-center justify-center rounded-md bg-white p-2 lg:mx-0 lg:h-[86px] lg:w-[86px]'
              href={Oxalus.link}
              target='_blank'
            >
              <img
                src='/assets/images/merchant/oxalus_logo.svg'
                className='animation-logo'
                alt='Oxalus'
              />
            </Link>
            <div className='flex flex-col items-center lg:items-start'>
              <div className='hidden items-center text-white lg:flex'>
                <div className='uppercase'>Oxalus</div>
                <button
                  onMouseMove={() => setShowAbout(true)}
                  className={clsx(
                    'ml-2',
                    showAbout ? 'text-oxalus' : 'text-white'
                  )}
                >
                  <TooltipIcon />
                </button>
              </div>
              {appLink}
            </div>
          </div>
        </div>
      </div>
      {showAbout ? (
        <AboutOxalusMerchant setShowAbout={setShowAbout} />
      ) : (
        <div className='w-2/3 flex-1 flex-col items-start justify-around gap-x-2 px-4 py-4 lg:flex lg:w-auto lg:flex-row lg:items-center lg:px-0 lg:py-0'>
          <div className='flex-rows mb-4 flex items-center gap-x-2 font-sf-pro-expanded  text-lg font-bold uppercase text-oxalus lg:mb-0 lg:hidden'>
            <div>Oxalus</div>
            <button
              onClick={() => setShowAbout(true)}
              className={clsx('text-dark-4')}
            >
              <TooltipIcon />
            </button>
          </div>
          <div
            className='mb-4 flex flex-col items-start justify-center lg:mb-0 lg:gap-y-3'
            style={{ minWidth: 174 }}
          >
            <p className='font-sf-pro-expanded text-sm font-semibold text-oxalus lg:text-xl'>
              {t('merchant:wallet_address')}
            </p>
            {Oxalus.address ? (
              <div className='flex items-center gap-x-1'>
                <p className='text-sm font-semibold text-dark-2 lg:text-base'>
                  {shortenHexString(Oxalus.address, 7, 4)}
                </p>
                <button
                  onClick={() => {
                    copyToClipboard(Oxalus.address);
                    toast.success(t('merchant:copy_success'));
                  }}
                  className='text-dark-4'
                >
                  <ClipboardIcon />
                </button>
                <a
                  className='text-dark-4'
                  href={getBscAddressLink(Oxalus.address)}
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
          <div className='flex flex-col items-start justify-center font-semibold lg:gap-y-3 '>
            <p className='font-sf-pro-expanded text-sm font-semibold text-oxalus lg:text-xl'>
              {t('merchant:integration_date')}
            </p>
            <div className='text-sm font-semibold text-dark-2 lg:text-base'>
              {Oxalus.integrationDate}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const OurMerchant = () => {
  const { t } = useTranslationClient('merchant');
  return (
    <div className='flex w-full flex-col gap-y-5 px-4 lg:gap-y-10 lg:px-0'>
      <div className='w-full text-center font-sf-pro-expanded text-mb-large font-bold text-dark-2 lg:text-large'>
        <p>{t('merchant:our_merchant')}</p>
      </div>
      <OxalusMerchant />
      <NamiMerchant />
    </div>
  );
};

export default OurMerchant;
