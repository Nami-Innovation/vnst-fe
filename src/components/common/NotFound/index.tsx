'use client';

import useLang from '@/hooks/useLang';
import { useTranslationClient } from '@/i18n/client';
import Link from 'next/link';
import Button from '../Button';
import { ArrowIcon } from '../Icons/ArrowIcon';

const NotFound = () => {
  const lang = useLang();
  const { t } = useTranslationClient('blogs');
  return (
    <div
      style={{
        backgroundImage:
          lang === 'vi'
            ? 'url(/assets/images/not_found_vi.jpg)'
            : 'url(/assets/images/not_found_en.jpg)',
      }}
      className='h-[80vh] w-full overflow-x-hidden bg-cover bg-bottom bg-no-repeat'
    >
      <div className='flex w-full items-center justify-center pt-[30%]'>
        <Link href={`/${lang}/blogs`}>
          <Button
            size='md'
            variant='primary'
            className='flex-rows flex items-center justify-center gap-x-2 text-white'
          >
            <ArrowIcon.left />
            <p> {t('blogs:back_to_page')}</p>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
