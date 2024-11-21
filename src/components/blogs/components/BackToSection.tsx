'use client';

import React from 'react';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import ChevronLeftTriangle from '@/components/common/Icons/ChevronLeftTriangle';
import { useTranslationClient } from '@/i18n/client';
import useLang from '@/hooks/useLang';

const BackToSection = () => {
  const router = useRouter();
  const { t } = useTranslationClient('blogs');
  const lang = useLang();

  const handleGoBack = () => {
    router.push(`/${lang}/blogs`);
  };

  return (
    <div className=''>
      {/* <Button
        size="md"
        className="px-3 py-2 h-8 text-xs leading-[14px] font-medium text-dark-3  bg-transparent hidden md:block transition-[background-position] duration-300 hover:bg-gradient-to-r hover:text-white from-primary-dark via-primary to-primary-dark bg-[length:200%] bg-left hover:bg-right hover:shadow-[0_0_26px_0_rgba(0,192,150,0.6)]"
        variant="secondary"
        onClick={handleGoBack}
      >
        {t('blogs:back_to_page')}
      </Button>
      <Button
        size="md"
        className=" text-sm font-semibold leading-[18px] border-transparent bg-transparent md:hidden transition-[background-position] duration-300 hover:bg-gradient-to-r hover:text-white from-primary-dark via-primary to-primary-dark bg-[length:200%] bg-left hover:bg-right hover:shadow-[0_0_26px_0_rgba(0,192,150,0.6)]"
        variant="secondary"
        onClick={handleGoBack}
        prevIcon={<ChevronLeftTriangle />}
      >
        {t('blogs:back_to_page')}
      </Button> */}
      <button
        onClick={handleGoBack}
        className='flex items-center text-sm font-semibold leading-[18px] text-gray hover:text-primary'
      >
        <ChevronLeftTriangle className='h-4 w-4 lg:h-3 lg:w-3' />
        {t('blogs:back_to_page')}
      </button>
    </div>
  );
};

export default BackToSection;
