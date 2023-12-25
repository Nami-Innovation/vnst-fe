'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
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
  const renderData =
    (data as ResponseLiquidData[])?.length > 0 ? (
      (data as ResponseLiquidData[]).map((item, index) => (
        <tr key={item._id}>
          <td className='text-center lg:text-start'>
            {dayjs(item.createdAt).format('HH:mm:ss DD/MM/YYYY')}
          </td>
          <td>{item.merchant.name}</td>
          <td>
            <div className='flex min-h-[57px] items-center justify-start gap-x-3 lg:min-h-full'>
              <p className='w-2/3 text-black lg:w-2/5'>
                {shortenHexString(item.merchant.walletAddress, 6, 4)}{' '}
              </p>
              <Link
                href={getBscAddressLink(item.merchant.walletAddress)}
                target='_blank'
              >
                <ExternalIcon size='14' />
              </Link>
            </div>
          </td>
          <td className='capitalize'>{t(`merchant:${item.type}`)}</td>
          <td
            className={clsx({
              '!text-error-100': item.type === 'OUT',
              '!text-primary': item.type === 'IN',
            })}
          >
            {item.type === 'OUT' ? '-' : '+'}
            {formatNumber(item.amount)}{' '}
            <span className='uppercase'>{item.token}</span>
          </td>
          <td>
            <div className='flex min-h-[57px] items-center justify-start gap-x-3 lg:min-h-full'>
              <p className='w-2/3 text-black lg:w-2/5'>
                {shortenHexString(item.transactionHash, 6, 4)}
              </p>
              <Link href={getBscScanLink(item.transactionHash)} target='_blank'>
                <ExternalIcon size='14' />
              </Link>
            </div>
          </td>
        </tr>
      ))
    ) : (
      <Message>{t('merchant:liquid_empty')}</Message>
    );

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
    <div className='flex w-full max-w-screen-xl flex-col items-center justify-center gap-y-5 overflow-x-hidden px-4 pb-[120px] lg:mx-auto lg:px-0'>
      <div className='flex w-full flex-col items-start justify-start gap-y-4 lg:flex-row lg:items-end lg:justify-between'>
        <div className='flex flex-col  items-start gap-y-3 text-2xl lg:text-[30px]'>
          <div className='flex items-center justify-center space-x-2'>
            <p className='text-base font-semibold text-dark-3'>
              {t('merchant:total_liquid_content')}
            </p>
            <div className='group mr-1 text-dark-3'>
              <Tooltip
                content={t('merchant:liquid_tooltip')}
                placement='bottom'
                popperClassname='ml-10'
                showArrow={false}
              >
                <QuestionIcon />
              </Tooltip>
            </div>
          </div>
          <div className='flex w-full flex-nowrap items-start justify-between lg:flex-1 lg:items-center lg:justify-start'>
            <div className='mr-2 flex w-10 items-center justify-start gap-x-2'>
              <Image
                src='/assets/images/cryptos/usdt.png'
                width={40}
                height={40}
                about='Author'
                alt='Logo USDT'
                className='h-10 w-10'
              />
            </div>
            <div className='flex flex-1 flex-col gap-2 lg:flex-row'>
              <p className='font-sf-pro-expanded text-mb-large font-bold text-dark-2'>
                {formatNumber(totalLiquid, 0)}
              </p>
              <p className='text-xs text-dark-3 lg:mt-3.5'>
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
      <div className='w-full overflow-x-auto overflow-y-hidden rounded-xxl '>
        <table className='min-w-[520px] bg-white'>
          <thead>
            <tr>
              <th>{t('merchant:table:time')}</th>
              <th>{t('merchant:table:merchants')}</th>
              <th>{t('merchant:table:address')}</th>
              <th>{t('merchant:table:type')}</th>
              <th>{t('merchant:table:amount')}</th>
              <th>{t('merchant:table:txh')}</th>
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
          classButton={'bg-white border-0'}
          classArrow='bg-white disabled:text-grayBackground border-0'
        />
      </div>
    </div>
  );
};

export default LiquidityMerchant;
