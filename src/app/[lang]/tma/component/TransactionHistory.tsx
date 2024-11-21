'use client';

import { TonTransaction, TonTransactionType } from '@/@type/transaction.type';
import Button from '@/components/common/Button';
import ExternalLink from '@/components/common/Icons/ExternalLink';
import Pagination from '@/components/common/Pagination';
import { useTranslationClient } from '@/i18n/client';
import { getTonTransactions } from '@/services/ton.api';
import { formatNumber } from '@/utils/format';
import { capitalizeFirstLetter, cn, getTonScanLink } from '@/utils/helper';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function TransactionHistory() {
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

  return (
    <div className=''>
      {!!tonAdress && (
        <div className='grid grid-cols-3 gap-x-2'>
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
      )}
      {!!tonAdress ? (
        total > 0 ? (
          <div className='mt-4'>
            {transactions.map((item, index) => (
              <TransactionItem
                key={item._id}
                type={
                  item.type as
                    | TonTransactionType.MINT
                    | TonTransactionType.REDEEM
                }
                amountIn={item.payload.inAmount}
                amountOut={item.payload.outAmount}
                time={item.timestamp}
                hash={item.hash}
                className={cn(
                  'border-b border-solid border-gray-200 py-2',
                  index === 0 && 'pt-0',
                  index === transactions.length - 1 && 'border-none pb-0'
                )}
              />
            ))}
            <div className='mt-5 flex justify-center pb-7'>
              <Pagination
                total={total}
                currentPage={page}
                onChangePage={setPage}
                size={limit}
                hasArrowBtn={true}
                maxShowItem={3}
              />
            </div>
          </div>
        ) : (
          <div className='mt-[120px] flex w-full flex-col items-center justify-center'>
            <Image
              src='/assets/images/no_data.png'
              width={120}
              height={120}
              alt='No Data'
              className=''
            />
            <span className='text-xs font-semibold text-dark-4'>
              You have no transaction history
            </span>
          </div>
        )
      ) : (
        <div className='mt-[120px] flex w-full flex-col items-center justify-center'>
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
    </div>
  );
}

type TransactionItemProps = {
  type: TonTransactionType.MINT | TonTransactionType.REDEEM;
  amountIn: number;
  amountOut: number;
  time: number;
  className?: string;
  hash: string;
};

const TransactionItem = ({
  type,
  amountIn,
  amountOut,
  time,
  className,
  hash,
}: TransactionItemProps) => {
  return (
    <div
      className={cn(
        'grid grid-cols-2 items-center gap-y-0.5 font-semibold',
        className
      )}
    >
      <div className='text-sm leading-[18px]'>
        {capitalizeFirstLetter(type)}
      </div>
      <div
        className={cn(
          'text-right text-xs ',
          type === TonTransactionType.MINT && 'text-primary',
          type === TonTransactionType.REDEEM && 'text-warning'
        )}
      >
        {type === TonTransactionType.MINT
          ? `+ ${formatNumber(amountOut, 0)} VNST`
          : `+ ${formatNumber(amountOut, 2)} USDT`}
      </div>
      <div className='flex items-center gap-x-0.5 text-[10px] text-dark-4'>
        <span>{dayjs(time * 1000).format('HH:mm:ss - DD/MM/YYYY')}</span>
        <Link target='_blank' href={getTonScanLink(hash)}>
          <ExternalLink className='h-4 w-4' />
        </Link>
      </div>
      <div className='text-right text-[10px] text-dark-4'>
        {type === TonTransactionType.MINT
          ? `From ${formatNumber(amountIn, 0)} USDT`
          : `From ${formatNumber(amountIn, 2)} VNST`}
      </div>
    </div>
  );
};
