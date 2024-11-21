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
    <div className='h-full w-full rounded-xxl border border-gray-200 bg-secondary-lightest shadow-md'>
      <div className='grid w-full grid-cols-2 grid-rows-2 items-center justify-center overflow-x-hidden border-0 px-4 py-7 lg:flex'>
        <div className='flex-rows flex w-full flex-1 items-center justify-center border-b border-gray-200 pb-5 lg:border-b-0 lg:border-r lg:pb-0'>
          <div className='flex w-full flex-col items-center justify-between lg:gap-y-2.5 gap-y-1'>
            <p className='w-full text-center text-sm font-semibold capitalize leading-[18px] text-gray lg:text-base lg:leading-5'>
              {t(LIST_CONTENT_BANNER.minted.title)}
            </p>
            <div className='flex-rows flex flex-nowrap items-center gap-x-2 text-2xl font-semibold leading-[30px] text-black lg:text-[30px] lg:leading-9'>
              <p className='font-sf-pro-expanded font-bold'>
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
          </div>
        </div>
        <div className='flex-rows flex w-full flex-1 items-center justify-center border-b border-gray-200 pb-5 lg:border-b-0 lg:border-r lg:pb-0'>
          <div className='flex w-full flex-col items-center justify-center lg:gap-y-2.5 gap-y-1 '>
            <p className='w-full text-center text-sm font-semibold capitalize leading-[18px] text-gray lg:text-base lg:leading-5'>
              {t(LIST_CONTENT_BANNER.redeem.title)}
            </p>
            <div className='flex-rows flex flex-nowrap items-center gap-x-2 text-2xl font-semibold leading-[30px] text-black lg:text-[30px] lg:leading-9'>
              <p className='font-sf-pro-expanded font-bold'>
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
          </div>
        </div>
        <div className='flex-rows flex w-full flex-1 items-center justify-center border-gray-200 pt-5 lg:border-r lg:pt-0'>
          <div className='flex w-full flex-col items-center justify-center lg:gap-y-2.5 gap-y-1'>
            <p className='w-full text-center text-sm font-semibold capitalize leading-[18px] text-gray lg:text-base lg:leading-5'>
              {t(LIST_CONTENT_BANNER.transaction.title)}
            </p>
            <p className='font-sf-pro-expanded font-bold text-2xl leading-[30px] text-black lg:text-[30px] lg:leading-9'>
              {numberFormater(dataStats.transactions, 2)}
            </p>
          </div>
        </div>
        <div className='flex w-full flex-1 flex-col items-center justify-center pt-3 lg:gap-y-2.5 gap-y-1 lg:pt-0'>
          <p className='w-full text-center text-sm font-semibold capitalize leading-[18px] text-gray lg:text-base lg:leading-5'>
            {t(LIST_CONTENT_BANNER.holders.title)}
          </p>
          <p className='font-sf-pro-expanded text-2xl font-bold leading-[30px] text-black lg:text-[30px] lg:leading-9'>
            {numberFormater(dataStats.holders, 2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BannerContent;
