import React from 'react';
import BannerMerchant from './BannerMerchant';
import FormSendMail from '../home/FormSendMail';
import { ResponseChart, ResponseAnalytics } from '@/types/merchant';
import OurMerchant from './OurMerchant';
import { VNST_CODE } from './contants';
import dynamic from 'next/dynamic';
const MerchantPool = dynamic(() => import('./MerchantPool'), { ssr: false });
const TabPool = dynamic(() => import('./TabPool'), { ssr: false });
const MerchantPage = ({
  dataChart,
  dataAnalytics,
  lang,
}: {
  dataChart: ResponseChart;
  dataAnalytics: ResponseAnalytics;
  lang: string;
}) => {
  return (
    <div className='flex w-full flex-col items-center justify-center overflow-x-hidden lg:px-0'>
      <BannerMerchant lang={lang} />
      <div className='flex w-full flex-col items-center justify-center lg:px-0'>
        <img
          src='/assets/images/dai-mau.png'
          className='w-full object-cover'
          alt='Top'
        />
        <div className='w-full bg-grayBackground bg-no-repeat lg:bg-cover lg:bg-top'>
          <div className=' mx-auto max-w-screen-xl pt-4 lg:pt-0'>
            <OurMerchant />
            <MerchantPool
              total_volume={dataAnalytics.notionalValue}
              total_trading={dataAnalytics.count}
              total_user={dataAnalytics.userCount}
              updated_at={dataAnalytics.lastTimeUpdate}
              dataChart={dataChart}
              total_fee={dataAnalytics.feeRevenue[VNST_CODE]}
            />
            <TabPool />
          </div>
        </div>
        <img
          src='/assets/images/merchant/bg_bottom.png'
          alt='bottom'
          className='w-full lg:object-cover'
        />
      </div>
      <div className='w-full bg-black'>
        <div className='w-full' id='form_submit'>
          <FormSendMail className='pb-28 pt-32' />
        </div>
      </div>
    </div>
  );
};
export default MerchantPage;
