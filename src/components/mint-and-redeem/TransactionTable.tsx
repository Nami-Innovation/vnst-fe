'use client';

import { formatGweiNumberStr } from '@/utils/format';
import React, { useEffect, useState } from 'react';
import Button from '../common/Button';
import ExternalLink from '../common/Icons/ExternalLink';
import { getBscScanLink } from '@/utils/helper';
import dayjs from '@/lib/dayjs';
import Pagination from '../common/Pagination';
import { useTranslationClient } from '@/i18n/client';
import { getEventLogs } from '@/services/event-log.api';
import { EventLog, EventName } from '@/@type/event-log.type';
import { useAccount } from 'wagmi';
import useAppStore from '@/stores/app.store';
import Image from 'next/image';

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

const TransactionTable = () => {
  const { t } = useTranslationClient(['common', 'mint_redeem']);
  const toggleConnectWalletModal = useAppStore(
    (state) => state.toggleConnectWalletModal
  );
  const { address, isConnected } = useAccount();
  const Filters = [
    {
      title: t('mint_redeem:all'),
      type: 'all',
    },
    {
      title: 'Mint',
      type: 'mint',
    },
    {
      title: 'Redeem',
      type: 'redeem',
    },
  ];
  const [transactions, setTransactions] = useState<EventLog[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      let events = [EventName.MINT, EventName.REDEEM];
      switch (filter) {
        case 'mint':
          events = [EventName.MINT];
          break;
        case 'redeem':
          events = [EventName.REDEEM];
          break;
        default:
          break;
      }
      setLoading(true);
      try {
        const res = await getEventLogs(events, page, limit, address);
        setTransactions(res.rows);
        setTotal(res.total);
      } catch (error) {
        console.error('Get Transaction Failed:', error);
      } finally {
        setLoading(false);
      }
    };

    if (address) fetchData();
  }, [filter, page, address]);

  useEffect(() => {
    if (!isConnected) {
      setPage(1);
      setTotal(1);
      setTransactions([]);
    }
  }, [isConnected]);

  const renderRow = (item: EventLog) => {
    if (item.event === EventName.MINT) {
      return (
        <tr key={item._id}>
          <td className='text-black'>{t(`mint_redeem:mint.title`)}</td>
          <td className='text-primary'>
            + {formatGweiNumberStr(item.returnValues[2])}
          </td>

          <td className=' text-negative'>
            - {formatGweiNumberStr(item.returnValues[1])}
          </td>
          <td>
            <a
              href={getBscScanLink(item.transactionHash)}
              target='_blank'
              className='flex items-center gap-x-2 hover:text-primary hover:underline lg:gap-x-0'
            >
              <p className='flex-1'>
                {dayjs
                  .unix(Number(item.returnValues.created_at))
                  .format('HH:mm:ss - DD/MM/YYYY')}
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
            - {formatGweiNumberStr(item.returnValues[1])}
          </td>

          <td className='text-primary'>
            + {formatGweiNumberStr(item.returnValues[2])}
          </td>

          <td>
            <a
              href={getBscScanLink(item.transactionHash)}
              target='_blank'
              className='flex items-center gap-x-2 hover:text-primary hover:underline lg:gap-x-0'
            >
              <p className='flex-1'>
                {dayjs
                  .unix(Number(item.returnValues.created_at))
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
      {isConnected ? (
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
              onClick={() => toggleConnectWalletModal(true)}
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

export default TransactionTable;
