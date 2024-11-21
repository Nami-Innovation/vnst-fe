import React from 'react';
import MerchantPage from '@/components/Merchant/MerchantPage';
import '@/styles/merchant.scss';
import '@/styles/home.scss';
import '@/styles/datePicker.scss';
import dayjs from '@/lib/dayjs';
import {
  getMerchantAnalytics,
  getMerchantChart,
} from '@/services/merchant.api';
import { ResponseAnalytics, ResponseChart } from '@/types/merchant';
import { notFound } from 'next/navigation';

const VNST_TOKEN = '39';
const getData = async (searchParams: {
  [key: string]: string | string[] | undefined;
}) => {
  const { range, from, to } = searchParams;
  let params: { [x: string]: string } = {
    marginCurrency: VNST_TOKEN,
    range: 'w',
  };
  if (range !== undefined) {
    if (range === 'm') {
      params = {
        ...params,
        range: 'm',
        from: `${dayjs().startOf('M').unix()}`,
        to: `${dayjs().unix()}`,
      };
    } else {
      params = {
        ...params,
        range: range as string,
      };
    }
  }
  if (from !== undefined) {
    params = {
      ...params,
      from: from as string,
    };
  }
  if (to !== undefined) {
    params = {
      ...params,
      to: to as string,
    };
  }
  try {
    const [dataChart, dataAnalytics]: [ResponseChart, ResponseAnalytics] =
      await Promise.all([
        getMerchantChart(params),
        getMerchantAnalytics(params),
      ]);
    return { dataChart, dataAnalytics };
  } catch (err) {
    console.log(err);

    notFound();
  }
};

const Merchant = async ({
  params,
  searchParams,
}: {
  params: { lang: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const data = await getData(searchParams);
  return (
    <div className='flex w-full flex-row items-center justify-center bg-secondary-lightest'>
      <MerchantPage
        dataChart={data?.dataChart as ResponseChart}
        dataAnalytics={data?.dataAnalytics as ResponseAnalytics}
        lang={params.lang}
      />
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default Merchant;
