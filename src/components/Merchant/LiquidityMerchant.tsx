'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import dayjs from '@/lib/dayjs';
import { useTranslationClient } from '@/i18n/client';
import DateRangeComponent from './DateRangeChanger';
import { convertMoney, shortenHexString } from '../home/constant';
import { formatNumber } from '@/utils/format';
import Link from 'next/link';
import { getBscScanLink, getBscAddressLink } from '@/utils/helper';
import ExternalIcon from '../common/Icons/ExternalIcon';
import Image from 'next/image';
import { getLiquidData, getTotalLiquid } from '@/services/merchant.api';
import { ResponseLiquidData } from '@/types/merchant';
import { Message } from '../mint-and-redeem/TransactionTable';
import useSwapStore from '@/stores/swap.store';
import useMerchantStore from '@/stores/merchant.store';
import Tooltip from '../common/Tooltip';
import QuestionIcon from '../common/Icons/QuestionIcon';
const PaginationCustom = dynamic(() => import('../common/Pagination'));

const LiquidityMerchant = () => {
  const { liquidQuery, setQueryLiquid } = useMerchantStore();
  const marketPrice = useSwapStore((state) => state.marketPrice);
  const [totalLiquid, setTotalLiquid] = useState<number>(0);
  const [data, setData] = useState<ResponseLiquidData[]>();
  const handleIncreaseClick = () => {
    const timeNow = dayjs();
    const newStartDate = dayjs(liquidQuery.from, 'DD/MM/YYYY')
      .add(1, 'month')
      .startOf('month');
    const newEndDate = dayjs(newStartDate).endOf('month');
    if (newEndDate.isBefore(timeNow)) {
      setQueryLiquid({ from: newStartDate, to: newEndDate, page: 1 });
    } else if (newEndDate.isAfter(timeNow)) {
      setQueryLiquid({ from: newStartDate, to: timeNow, page: 1 });
    }
  };
  const handleDecreaseClick = () => {
    const newStartDate = dayjs(liquidQuery.from, 'DD/MM/YYYY')
      .subtract(1, 'month')
      .startOf('month');
    const newEndDate = dayjs(newStartDate, 'DD/MM/YYYY').endOf('month');

    setQueryLiquid({ from: newStartDate, to: newEndDate, page: 1 });
  };
  const [total, setTotal] = useState(0);
  const { t } = useTranslationClient();
  const limit = 10;
  const renderData = useMemo(() => {
    if ((data as ResponseLiquidData[])?.length === 0 || data === undefined)
      return <Message colSpan={6}> {t('merchant:liquid_empty')}</Message>;
    return (data as ResponseLiquidData[])?.map((item, index) => (
      <tr key={item._id}>
        <td className='text-center font-semibold text-gray lg:text-start'>
          {dayjs(item.createdAt).format('HH:mm:ss DD/MM/YYYY')}
        </td>
        <td className='text-black'>{item.merchant.name}</td>
        <td>
          <div className='flex min-h-[57px] items-center justify-start gap-x-3 font-semibold lg:min-h-full'>
            <p className='w-2/3 text-gray lg:w-2/5'>
              {shortenHexString(item.merchant.walletAddress, 6, 4)}{' '}
            </p>
            <Link
              href={getBscAddressLink(item.merchant.walletAddress)}
              target='_blank'
              className='text-gray'
            >
              <ExternalIcon size='20' />
            </Link>
          </div>
        </td>
        <td className='capitalize text-black'>{t(`merchant:${item.type}`)}</td>
        <td
          className={clsx('font-semibold', {
            '!text-error-100': item.type === 'OUT',
            '!text-primary': item.type === 'IN',
          })}
        >
          {item.type === 'OUT' ? '-' : '+'}
          {formatNumber(item.amount)}{' '}
          <span className='uppercase'>{item.token}</span>
        </td>
        <td>
          <div className='flex min-h-[57px] items-center justify-start gap-x-3 font-semibold lg:min-h-full'>
            <p className='w-2/3 text-gray lg:w-2/5'>
              {shortenHexString(item.transactionHash, 6, 4)}
            </p>
            <Link href={getBscScanLink(item.transactionHash)} target='_blank'>
              <ExternalIcon size='20' />
            </Link>
          </div>
        </td>
      </tr>
    ));
  }, [data]);

  const handleGetLiquidData = async () => {
    let params = {
      page: liquidQuery.page,
      limit,
      from: dayjs(liquidQuery.from).valueOf(),
      to: dayjs(liquidQuery.to).valueOf(),
    };
    try {
      const res = await getLiquidData(params);
      if (res) {
        setData(res.rows);
        setTotal(res.total);
      }
    } catch (err) {}
  };
  useEffect(() => {
    const handleGetTotal = async () => {
      if (!marketPrice) return;
      try {
        const res = await getTotalLiquid();
        if (res) {
          const totals =
            (res.usdt || 0) + (res?.vnst ? Number(res.vnst / marketPrice) : 0);
          setTotalLiquid(totals);
        }
      } catch (err) {}
    };

    if (marketPrice) handleGetTotal();
  }, [marketPrice]);

  useEffect(() => {
    handleGetLiquidData();
  }, [liquidQuery]);

  return (
    <div className='flex w-full max-w-screen-xl flex-col items-center justify-center gap-y-5 overflow-x-hidden px-4 pb-[80px] lg:mx-auto lg:px-0'>
      <div className='flex w-full flex-col items-start justify-start gap-y-4 lg:flex-row lg:items-end lg:justify-between'>
        <div className='flex flex-col  items-start gap-y-2.5 text-2xl lg:gap-y-3 lg:text-[30px]'>
          <div className='group mr-1 text-gray'>
            <Tooltip
              content={t('merchant:liquid_tooltip')}
              placement='bottom'
              popperClassname='ml-10'
              showArrow={false}
              className='flex items-center gap-x-1 text-sm font-semibold leading-[18px] text-gray hover:text-primary lg:text-base lg:leading-5'
            >
              {t('merchant:total_liquid_content')}
              <QuestionIcon />
            </Tooltip>
          </div>
          <div className='flex w-full flex-nowrap items-start justify-between lg:flex-1 lg:items-center lg:justify-start'>
            <div className='mr-2 flex w-10 items-center justify-start gap-x-2'>
              <Image
                src='/assets/images/cryptos/usdt.png'
                width={40}
                height={40}
                about='Author'
                alt='Logo USDT'
                className='h-8 w-8 lg:h-10 lg:w-10'
              />
            </div>
            <div className='flex flex-1 flex-row items-center gap-2'>
              <p className='font-sf-pro-expanded text-[24px] font-semibold leading-[30px] text-black lg:text-[30px] lg:leading-9'>
                {formatNumber(totalLiquid, 0)}
              </p>
              <p className='mt-2 text-sm font-semibold leading-[18px] text-gray lg:mt-3.5 lg:text-base lg:leading-5'>
                {convertMoney('USDT', marketPrice || 24000, totalLiquid)}
              </p>
            </div>
          </div>
        </div>
        <div>
          <DateRangeComponent
            startDate={liquidQuery.from}
            endDate={liquidQuery.to}
            handleIncreaseClick={handleIncreaseClick}
            handleDecreaseClick={handleDecreaseClick}
          />
        </div>
      </div>
      <>
        <div className='w-full overflow-x-auto overflow-y-hidden rounded-xxl '>
          <table className='min-w-[520px] border'>
            <thead>
              <tr>
                <th className='!text-sm !leading-[18px] lg:!text-base lg:!leading-5'>
                  {t('merchant:table:time')}
                </th>
                <th className='!text-sm !leading-[18px] lg:!text-base lg:!leading-5'>
                  {t('merchant:table:merchants')}
                </th>
                <th className='!text-sm !leading-[18px] lg:!text-base lg:!leading-5'>
                  {t('merchant:table:address')}
                </th>
                <th className='!text-sm !leading-[18px] lg:!text-base lg:!leading-5'>
                  {t('merchant:table:type')}
                </th>
                <th className='!text-sm !leading-[18px] lg:!text-base lg:!leading-5'>
                  {t('merchant:table:amount')}
                </th>
                <th className='!text-sm !leading-[18px] lg:!text-base lg:!leading-5'>
                  {t('merchant:table:txh')}
                </th>
              </tr>
            </thead>
            <tbody>{renderData}</tbody>
          </table>
        </div>
        <div>
          <PaginationCustom
            total={total}
            currentPage={liquidQuery.page}
            onChangePage={(page) => setQueryLiquid({ page })}
            size={limit}
            hasArrowBtn
            classButton={'border-0'}
            classArrow='bg-white disabled:text-grayBackground border-0'
          />
        </div>
      </>
    </div>
  );
};

export default LiquidityMerchant;
