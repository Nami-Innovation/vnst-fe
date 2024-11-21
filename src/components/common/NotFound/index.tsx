'use client';

import useLang from '@/hooks/useLang';
import { useTranslationClient } from '@/i18n/client';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../Button';
const NotFound = () => {
  const lang = useLang();
  const { t } = useTranslationClient('blogs');
  return (
    <div className='flex h-[80vh] w-screen flex-row items-center justify-center'>
      <div className='flex w-full flex-col items-center justify-center gap-y-2'>
        <Image
          src='/assets/images/not_found.png'
          width={160}
          height={160}
          alt='Not found image'
        />
        <p className='font-sf-pro-expanded text-xl font-bold text-primary'>
          {t('blogs:not_found_page')}
        </p>
        <p className='text-base text-gray'>{t('blogs:content_not_found')}</p>
        <Link href={`/${lang}/blogs`} className='mt-10'>
          <Button
            size='md'
            variant='secondary'
            className='flex-rows flex items-center justify-center gap-x-2 text-base text-primary-dark'
          >
            <p> {t('blogs:back_to_page')}</p>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
