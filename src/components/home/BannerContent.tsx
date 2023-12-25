/* eslint-disable react-hooks/rules-of-hooks */
import { useTranslation } from '@/i18n';
import { LIST_CONTENT_BANNER } from './constant';
import { numberFormater } from '@/utils/format';
import Image from 'next/image';

const BannerContent = async ({
  dataStats,
  lang,
}: {
  dataStats: any;
  lang: string;
}) => {
  const { t } = await useTranslation(lang, ['homepage']);
  return (
    <div className='no-repeat bg-gradient-banner w-full rounded-xxl border border-primary-dark !bg-opacity-100 bg-cover'>
      <div className='grid w-full grid-cols-2 grid-rows-2 items-center justify-center gap-y-2 overflow-x-hidden border-0 px-4  py-7 lg:flex'>
        <div className='flex-rows flex w-full flex-1 items-center justify-center border-primary-dark lg:border-r'>
          <div className='flex w-full flex-col items-center justify-between lg:gap-y-1'>
            <p className='w-full text-center text-sm font-semibold capitalize text-white lg:text-base'>
              {t(LIST_CONTENT_BANNER.minted.title)}
            </p>
            <div className='text-gradient flex-rows flex flex-nowrap items-center gap-x-2 text-lg font-bold leading-9 lg:text-[30px]'>
              <p className='font-sf-pro-expanded'>
                {numberFormater(dataStats.minted, 2)}
              </p>
              <Image
                src='/assets/images/cryptos/vnst.png'
                width={40}
                height={40}
                alt='VNST'
                className='h-8 w-8 lg:h-10 lg:w-10'
              />
            </div>
            <div className='circle-shadow absolute bottom-0'></div>
          </div>
        </div>
        <div className='flex-rows flex w-full flex-1 items-center justify-center border-primary-dark lg:border-r'>
          <div className='flex w-full flex-col items-center justify-center lg:gap-y-1 '>
            <p className='w-full text-center text-sm font-semibold capitalize text-white lg:text-base'>
              {t(LIST_CONTENT_BANNER.redeem.title)}
            </p>
            <div className='text-gradient flex-rows flex flex-nowrap items-center gap-x-2 text-lg font-bold leading-9 lg:text-[30px]'>
              <p className='font-sf-pro-expanded'>
                {numberFormater(dataStats.redeemed, 2)}
              </p>
              <Image
                src='/assets/images/cryptos/vnst.png'
                width={40}
                height={40}
                className='h-8 w-8 lg:h-10 lg:w-10'
                alt='VNST'
              />
            </div>
            <div className='circle-shadow absolute bottom-0'></div>
          </div>
        </div>
        <div className='flex-rows flex w-full flex-1 items-center justify-center border-primary-dark lg:border-r'>
          <div className='flex w-full flex-col items-center justify-center lg:gap-y-1'>
            <p className='w-full text-center text-sm font-semibold capitalize text-white lg:text-base'>
              {t(LIST_CONTENT_BANNER.transaction.title)}
            </p>
            <p className='text-gradient font-sf-pro-expanded text-lg font-bold leading-9 lg:text-[30px]'>
              {numberFormater(dataStats.transactions, 2)}
            </p>
            <div className='circle-shadow absolute bottom-0'></div>
          </div>
        </div>
        <div className='flex w-full flex-1 flex-col items-center justify-center lg:gap-y-1'>
          <p className='w-full text-center text-sm font-semibold capitalize text-white lg:text-base'>
            {t(LIST_CONTENT_BANNER.holders.title)}
          </p>
          <p className='text-gradient font-sf-pro-expanded text-lg font-bold leading-9 lg:text-[30px]'>
            {numberFormater(dataStats.holders, 2)}
          </p>
          <div className='circle-shadow absolute bottom-0'></div>
        </div>
      </div>
    </div>
  );
};

export default BannerContent;
