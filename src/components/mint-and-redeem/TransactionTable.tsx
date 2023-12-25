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

export const Message = ({ children }: { children: React.ReactNode }) => {
  return (
    <tr>
      <td colSpan={5} className='text-start'>
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
          <td>{t(`mint_redeem:mint.title`)}</td>
          <td className='text-primary'>
            + {formatGweiNumberStr(item.returnValues[2])}
          </td>

          <td className='text-danger'>
            - {formatGweiNumberStr(item.returnValues[1])}
          </td>

          <td>
            <a
              href={getBscScanLink(item.transactionHash)}
              target='_blank'
              className='group flex items-center hover:text-primary hover:underline'
            >
              {dayjs
                .unix(Number(item.returnValues.created_at))
                .format('HH:mm:ss - DD/MM/YYYY')}

              <ExternalLink className='ml-2 h-3 w-3' />
            </a>
          </td>
        </tr>
      );
    } else {
      return (
        <tr key={item._id}>
          <td>{t(`mint_redeem:redeem.title`)}</td>
          <td className='text-danger'>
            - {formatGweiNumberStr(item.returnValues[1])}
          </td>

          <td className='text-primary'>
            + {formatGweiNumberStr(item.returnValues[2])}
          </td>

          <td>
            <a
              href={getBscScanLink(item.transactionHash)}
              target='_blank'
              className='group flex items-center hover:text-primary hover:underline'
            >
              {dayjs
                .unix(Number(item.returnValues.created_at))
                .format('HH:mm:ss - DD/MM/YYYY')}

              <ExternalLink className='ml-2 h-3 w-3' />
            </a>
          </td>
        </tr>
      );
    }
  };

  const renderBody = () => {
    if (!isConnected) {
      return (
        <Message>
          <span
            className='cursor-pointer text-primary'
            onClick={() => toggleConnectWalletModal(true)}
          >
            {t('common:connect_wallet')}
          </span>{' '}
          {t('mint_redeem:history_table.connect_wallet_for')}
        </Message>
      );
    }

    if (transactions.length === 0) {
      return <Message>{t('mint_redeem:history_table.empty')}</Message>;
    }

    return transactions.map(renderRow);
  };

  return (
    <div className='mt-10 lg:mt-8'>
      <div className='mb-5 flex justify-between'>
        <h3 className='font-sf-pro-expanded text-xl font-bold text-dark-3'>
          {t('mint_redeem:history')}
        </h3>
        <div className='flex gap-x-4'>
          {Filters.map((f) => (
            <Button
              onClick={() => {
                setPage(1);
                setFilter(f.type);
              }}
              key={f.title}
              size='sm'
              variant={filter === f.type ? 'primary' : 'secondary'}
            >
              {f.title}
            </Button>
          ))}
        </div>
      </div>
      <div className='overflow-x-auto overflow-y-hidden rounded-xxl'>
        <table className='min-w-[520px]'>
          <thead>
            <tr>
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
      <div className='mt-5 flex justify-center'>
        <Pagination
          total={total}
          currentPage={page}
          onChangePage={setPage}
          size={limit}
        />
      </div>
    </div>
  );
};

export default TransactionTable;
