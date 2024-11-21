'use client';

import { formatNumber } from '@/utils/format';
import React, { useEffect, useState } from 'react';
import Button from '../common/Button';
import ExternalLink from '../common/Icons/ExternalLink';
import { cn, getTonScanLink } from '@/utils/helper';
import dayjs from '@/lib/dayjs';
import Pagination from '../common/Pagination';
import { useTranslationClient } from '@/i18n/client';
import Image from 'next/image';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { TonTransaction, TonTransactionType } from '@/@type/transaction.type';
import { getTonTransactions } from '@/services/ton.api';

export const Message = ({
  children,
  colSpan = 5,
}: {
  children: React.ReactNode;
  colSpan?: number;
}) => {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className='!px-3 !py-4 text-start lg:!px-4 lg:!py-5'
      >
        {children}
      </td>
    </tr>
  );
};

const TransactionTableTon = () => {
  const { t } = useTranslationClient(['common', 'mint_redeem']);
  const tonAdress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

  const Filters = [
    {
      title: t('mint_redeem:all'),
      type: 'all',
    },
    {
      title: 'Mint',
      type: TonTransactionType.MINT,
    },
    {
      title: 'Redeem',
      type: TonTransactionType.REDEEM,
    },
  ];
  const [transactions, setTransactions] = useState<TonTransaction[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getTonTransactions({
          limit,
          page,
          type: filter === 'all' ? undefined : (filter as TonTransactionType),
          walletAddress: tonAdress,
        });
        setTransactions(res.rows);
        setTotal(res.total);
      } catch (error) {
        console.error('Get Transaction Failed:', error);
      } finally {
        setLoading(false);
      }
    };

    if (tonAdress) fetchData();
  }, [filter, page, tonAdress]);

  useEffect(() => {
    if (!tonAdress) {
      setPage(1);
      setTotal(1);
      setTransactions([]);
    }
  }, [tonAdress]);

  const renderRow = (item: TonTransaction) => {
    if (item.type === TonTransactionType.MINT) {
      return (
        <tr key={item._id}>
          <td className='text-black'>{t(`mint_redeem:mint.title`)}</td>
          <td className='text-primary'>
            + {formatNumber(item.payload?.outAmount)}
          </td>

          <td className=' text-negative'>
            - {formatNumber(item.payload?.inAmount)}
          </td>
          <td>
            <a
              href={getTonScanLink(item.hash)}
              target='_blank'
              className='flex items-center gap-x-2 hover:text-primary hover:underline lg:gap-x-0'
            >
              <p className='flex-1'>
                {dayjs.unix(item.timestamp).format('HH:mm:ss - DD/MM/YYYY')}
              </p>

              <p className='!h-5 !w-5 flex-1 lg:flex-initial'>
                <ExternalLink className='h-5 w-5' />
              </p>
            </a>
          </td>
        </tr>
      );
    } else {
      return (
        <tr key={item._id}>
          <td className='text-black'>{t(`mint_redeem:redeem.title`)}</td>
          <td className='text-error-100'>
            - {formatNumber(item.payload?.inAmount)}
          </td>

          <td className='text-primary'>
            + {formatNumber(item.payload?.outAmount)}
          </td>

          <td>
            <a
              href={getTonScanLink(item.hash)}
              target='_blank'
              className='flex items-center gap-x-2 hover:text-primary hover:underline lg:gap-x-0'
            >
              <p className='flex-1'>
                {dayjs
                  .unix(Number(item.timestamp))
                  .format('HH:mm:ss - DD/MM/YYYY')}
              </p>

              <p className='!h-5 !w-5 flex-1 lg:flex-initial'>
                <ExternalLink className='h-5 w-5' />
              </p>
            </a>
          </td>
        </tr>
      );
    }
  };

  const renderBody = () => {
    if (transactions.length === 0) {
      return (
        <Message>
          <div className='flex w-full flex-col items-center justify-center'>
            <div className='font-semibold text-gray'>
              {t('mint_redeem:history_table.empty')}
            </div>
            <Image
              src='/assets/images/no_data.png'
              width={120}
              height={120}
              alt='Not data'
              className=''
            />
          </div>
        </Message>
      );
    }

    return transactions.map(renderRow);
  };

  return (
    <div className='mt-10 lg:mt-[30px] '>
      <div className='mb-4 flex flex-col justify-between gap-y-4 lg:flex-row'>
        <h3 className='font-sf-pro-expanded text-xl font-bold leading-6 text-black lg:text-3xl lg:leading-9'>
          {t('mint_redeem:history')}
        </h3>
        <div className='flex gap-x-2'>
          {Filters.map((f) => (
            <Button
              onClick={() => {
                setPage(1);
                setFilter(f.type);
              }}
              key={f.title}
              size='sm'
              variant={filter === f.type ? 'primary' : 'chip'}
              className='text-xs font-semibold leading-4'
            >
              {f.title}
            </Button>
          ))}
        </div>
      </div>
      {!!tonAdress ? (
        <div className='overflow-x-auto overflow-y-hidden rounded-xxl !bg-white shadow-box'>
          <table className='min-w-[520px] border border-gray-200'>
            <thead>
              <tr className='text-sm leading-[18px] lg:text-base lg:leading-5'>
                <th style={{ width: '20%' }}>
                  {t('mint_redeem:history_table.transaction')}
                </th>
                <th style={{ width: '30%' }}>VNST</th>
                <th style={{ width: '20%' }}>USDT</th>
                <th style={{ width: '30%' }}>
                  {t('mint_redeem:history_table.time')}
                </th>
              </tr>
            </thead>
            <tbody>{renderBody()}</tbody>
          </table>
        </div>
      ) : (
        <div className='flex w-full flex-col items-center justify-center'>
          <Image
            src='/assets/images/not_connect_wallet.png'
            width={120}
            height={120}
            alt='Not connect wallet'
            className=''
          />
          <div className='text-xs  font-semibold leading-4'>
            <button
              className='inline cursor-pointer text-primary hover:underline'
              onClick={() => tonConnectUI.openModal()}
            >
              {t('common:connect_wallet')}
            </button>{' '}
            <span className='text-gray'>
              {t('mint_redeem:history_table.connect_wallet_for')}
            </span>
          </div>
        </div>
      )}

      <div className='mt-5 flex justify-center'>
        <Pagination
          total={total}
          currentPage={page}
          onChangePage={setPage}
          size={limit}
          hasArrowBtn={true}
        />
      </div>
    </div>
  );
};

export default TransactionTableTon;
