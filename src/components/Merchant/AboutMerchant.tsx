'use client';
import { useTranslationClient } from '@/i18n/client';
import TooltipIcon from '../common/Icons/TooltipIcon';
import Link from 'next/link';
import { Nami, Oxalus } from './contants';

export const AboutNamiMerchant = ({
  setShowAbout,
}: {
  setShowAbout: React.Dispatch<boolean>;
}) => {
  const { t } = useTranslationClient('merchant');
  return (
    <div className='col-span-2 w-2/3 items-center justify-around gap-x-10 px-4 py-4 lg:flex lg:h-max lg:w-[65%]'>
      <div className='hidden lg:block'>
        <p
          dangerouslySetInnerHTML={{ __html: t('merchant:about_nami') }}
          className='font-sf-pro-expanded text-mb-large font-bold leading-8'
        />
      </div>
      <div className='flex-rows flex items-center gap-x-2 font-sf-pro-expanded text-lg  font-semibold lg:hidden'>
        <div className='flex items-center justify-start gap-x-2'>
          <p className='uppercase text-primary'>Nami</p>
          <button
            onClick={() => setShowAbout(false)}
            className='h-10 w-10 text-primary'
          >
            <TooltipIcon />
          </button>
        </div>
      </div>
      <div className='flex-1 text-xs leading-3 text-dark-3'>
        <p>{t('merchant:nami_content')}</p>
      </div>
    </div>
  );
};

export const AboutOxalusMerchant = ({
  setShowAbout,
}: {
  setShowAbout: React.Dispatch<boolean>;
}) => {
  const { t } = useTranslationClient('merchant');
  return (
    <div className='col-span-2 w-2/3 items-center justify-around gap-x-10 px-4 py-4 lg:flex lg:h-max lg:w-[65%]'>
      <div className='hidden lg:block'>
        <p
          dangerouslySetInnerHTML={{ __html: t('merchant:about_oxalus') }}
          className='font-sf-pro-expanded text-mb-large font-bold leading-8'
        />
      </div>
      <div className='flex-rows flex items-center gap-x-2 font-sf-pro-expanded text-lg  font-semibold uppercase text-oxalus lg:hidden'>
        <div className=''>Oxalus</div>

        <button onClick={() => setShowAbout(false)} className='text-oxalus'>
          <TooltipIcon />
        </button>
      </div>
      <div className='flex-1 text-xs leading-3 text-dark-3'>
        <p
          dangerouslySetInnerHTML={{
            __html: t('merchant:oxalus_content', {
              linkIOS: Oxalus.linkIOS,
              linkAndroid: Oxalus.linkAndroid,
            }),
          }}
        />
      </div>
    </div>
  );
};
