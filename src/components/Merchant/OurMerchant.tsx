/* eslint-disable jsx-a11y/alt-text */
'use client';

import { useTranslationClient } from '@/i18n/client';
import { Nami, Fizen } from './contants';
import OurMerchantComponent from './OurMerchantComponent';

const OurMerchant = () => {
  const { t } = useTranslationClient('merchant');
  return (
    <div className='flex w-full flex-col  gap-y-20 px-4 lg:px-0'>
      <div className='w-full text-center font-sf-pro-expanded text-mb-large font-bold leading-9 text-black lg:text-[50px] lg:leading-[54px]'>
        <p dangerouslySetInnerHTML={{ __html: t('merchant:our_merchant') }}></p>
      </div>
      <div className='flex flex-col items-center justify-center gap-x-[30px] gap-y-20 lg:flex-row'>
        <OurMerchantComponent
          object={Nami}
          title='Nami Exchange'
          textColor='text-primary'
          logo={
            <img
              src='/assets/images/merchant/nami_exchange_logo.svg'
              className='animation-logo'
              alt='Nami exchange'
            />
          }
          classNameLogo=''
          aboutTitle='about_nami'
          aboutContent='nami_content'
          textHover='text-primary'
        />
        <OurMerchantComponent
          object={Fizen}
          title='Fizen'
          textColor='text-fizen'
          textHover='text-primary'
          logo={
            <img
              src='/assets/images/merchant/fizen_logo.png'
              className='animation-logo scale-[80%]'
              alt='Fizen'
            />
          }
          aboutTitle='about_fizen'
          aboutContent='fizen_content'
        />
      </div>
    </div>
  );
};

export default OurMerchant;
