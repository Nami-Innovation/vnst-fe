'use client';

import { useTranslationClient } from '@/i18n/client';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

const NoDataSearch = () => {
  const { t } = useTranslationClient('common');
  const searchParams = useSearchParams();
  const search = searchParams.get('q');
  return (
    <div className='flex h-full w-full flex-col items-center justify-center pt-10 lg:py-5'>
      <Image
        src='/assets/images/empty_search.png'
        width={160}
        height={160}
        alt='Empty data'
        className='h-40 w-40'
      />
      <p className='w-full text-center text-sm font-semibold leading-[18px] text-black lg:text-base lg:leading-5'>
        {t('common:empty_search', { keywords: search })}
      </p>
    </div>
  );
};
export default NoDataSearch;
