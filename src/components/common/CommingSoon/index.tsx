'use client';

import { useTranslationClient } from '@/i18n/client';
import Button from '../Button';
import Image from 'next/image';
import useLang from '@/hooks/useLang';
import { useRouter } from 'next/navigation';

const ComingSoon = () => {
  const { t } = useTranslationClient('merchant');
  const router = useRouter();
  const lang = useLang();
  return (
    <div
      className='h-screen w-screen bg-cover bg-bottom bg-no-repeat px-4 lg:h-[80vh] lg:px-0'
      id='comming-soon'
    >
      <div className='m-auto h-full lg:w-1/2'>
        <div className='flex h-full items-center justify-center'>
          <div
            id='box'
            className='h-full max-h-[400px] w-full rounded-xl border-2 border-primary bg-cover bg-bottom  bg-no-repeat lg:max-h-[292px] lg:max-w-[584px]'
          >
            <div className='mt-4 flex h-full flex-col items-center justify-between px-2 lg:mt-0 lg:grid lg:grid-cols-2 lg:justify-center'>
              <div className='flex h-max w-full flex-col items-center justify-start gap-y-2 lg:col-span-1 lg:h-full lg:items-start lg:justify-between lg:py-10 lg:pl-10'>
                <p className='text-gradient font-sf-pro-expanded text-2xl font-bold uppercase lg:text-large lg:leading-[60px]'>
                  {t('merchant:coming_soon')}
                </p>
                <Button
                  size='md'
                  variant='primary'
                  onClick={() => router.push(`/${lang}/`)}
                  className='rounded-md text-base'
                >
                  {t('merchant:btn_back_to_home')}
                </Button>
              </div>
              <div className='col-span-1'>
                <Image
                  src='/assets/images/coming_soon_icon.png'
                  width={300}
                  height={203}
                  alt='Icon VNST'
                  className='object-cover lg:h-full lg:w-[300px]'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
