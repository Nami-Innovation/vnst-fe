import React, { useEffect, useMemo, useState } from 'react';
import AmountInput from '../commons/AmountInput';
import Button from '@/components/common/Button';
import { Address } from 'viem';
import { SubmitHandler, useController, useForm } from 'react-hook-form';
import useSwapStore from '@/stores/swap.store';
import clsx from 'clsx';
import { formatNumber } from '@/utils/format';
import ConfirmModal from './ConfirmModal';
import Tooltip from '@/components/common/Tooltip';
import { useTranslationClient } from '@/i18n/client';
import { FunctionName } from '../types';
import useJestonWalletData from '@/hooks/useJestonWallet';
import { JETTON_CONFIGS } from '@/web3/ton/constants';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import ToggleActive from '../commons/ToggleActive';
import SwapRate from '../commons/SwapRate';
import { useTonConnect } from '@/hooks/useTonConnect';
import { Chain } from '@/web3/constants';
import useOutputAmount from '../commons/useOutputAmount';
import RateInfo from '../commons/RateInfo';
import dynamic from 'next/dynamic';
import { cn } from '@/utils/helper';
const TmaPrice = dynamic(() => import('../TmaPrice'));

type FormValues = {
  amount: string;
};

export type Crypto = {
  token: Address;
  symbol: string;
  logo: string;
  abi: any;
  scale: number;
  classNameCurrency: string;
};

export type PairProps = {
  fromToken: Crypto;
  toToken: Crypto;
  minAmount: number;
  maxAmount: number;
  contractAddress: Address;
  functionName: FunctionName;
  toggleActive?: () => void;
  isTma?: boolean;
};

type SwappingData = {
  amount: number;
};

const Pair = ({
  fromToken,
  toToken,
  minAmount,
  maxAmount,
  contractAddress,
  functionName,
  toggleActive,
  isTma,
}: PairProps) => {
  const { t } = useTranslationClient(['common', 'mint_redeem']);
  const [tonConnectUI] = useTonConnectUI();
  const { tonClient } = useTonConnect();
  const tonAddress = useTonAddress();

  const [rate, loadSwapInfo] = useSwapStore((state) => [
    state.marketPrice,
    () => state.loadContractInfo(Chain.TON, tonClient),
  ]);
  const [swappingData, setSwappingData] = useState<SwappingData | null>(null);

  useEffect(() => {
    if (!!swappingData || !tonClient) return;
    loadSwapInfo();
    const internal = setInterval(loadSwapInfo, 5000);
    return () => {
      clearInterval(internal);
    };
  }, [swappingData, tonClient]);

  const fromBalance = useJestonWalletData(
    fromToken.symbol as keyof typeof JETTON_CONFIGS
  );
  const balanceFormatted = fromBalance.formattedBalance;
  const toBalance = useJestonWalletData(
    toToken.symbol as keyof typeof JETTON_CONFIGS
  );

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
    resetField,
    trigger,
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  const {
    field,
    fieldState: { error, invalid, isTouched },
  } = useController({
    name: 'amount',
    defaultValue: '',
    control,
    rules: {
      validate: (value) => {
        const amount = value ? Number(value) : 0;

        if (amount < minAmount) {
          return t('mint_redeem:errors.min_amount', {
            amount: formatNumber(minAmount),
            symbol: fromToken.symbol,
          });
        }

        if (amount > balanceFormatted) {
          return t('mint_redeem:errors.not_enough_balance');
        }

        if (maxAmount > 0 && amount > maxAmount) {
          return t('mint_redeem:errors.max_amount', {
            amount: formatNumber(maxAmount),
            symbol: fromToken.symbol,
          });
        }

        return true;
      },
    },
  });

  useEffect(() => {
    const fetchBalances = async () => {
      await fromBalance.refetch();
      await toBalance.refetch();
    };
    fetchBalances();
  }, [functionName]);

  useEffect(() => {
    if (invalid && !!tonAddress) trigger('amount');
  }, [invalid, tonAddress, balanceFormatted]);

  const amount = useMemo(() => {
    if (!field.value) return 0;
    return Number(field.value);
  }, [field.value]);

  const toAmount = useOutputAmount(amount, functionName);
  const enabled = !!tonAddress && isValid && !!rate;

  const onSubmit: SubmitHandler<FormValues> = async () => {
    loadSwapInfo();
    if (rate) setSwappingData({ amount: amount });
  };

  return (
    <div
      className={cn(
        'mt-5 h-full rounded-[20px] border border-gray-200 bg-white shadow-box',
        isTma && 'mt-3'
      )}
    >
      {isTma && (
        <>
          <div className='px-4 pt-4'>{<TmaPrice type={functionName} />}</div>
          <div className='mx-4 mt-3 h-[1px] bg-gray-200' />
        </>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className=''>
        <div className={cn('relative px-3 pb-4 pt-3 md:p-4', isTma && 'p-3')}>
          {/* FROM */}
          <div
            className={clsx(
              'rounded-md border bg-gray-300 p-3 md:p-4',
              error?.message ? 'border-error-100' : 'border-gray-200'
            )}
          >
            <div className='flex items-center'>
              <img
                src={fromToken.logo}
                className='h-10 w-10'
                alt={fromToken.symbol}
              />
              <div className='flex-1'>
                <AmountInput
                  value={field.value}
                  onAccept={field.onChange}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  disabled={isSubmitting}
                />
                {isTouched && invalid && (
                  <div className='text-right text-xs font-semibold leading-4 text-error-100'>
                    {error?.message}
                  </div>
                )}
              </div>
            </div>
            <div className='mt-2 flex items-center justify-between'>
              <div className='text-xs font-semibold'>
                <span className='text-gray'>{t('common:balance')}: </span>
                <span className={fromToken.classNameCurrency}>
                  {formatNumber(balanceFormatted, fromToken.scale) || '0.0'}{' '}
                  {fromToken.symbol}
                </span>
              </div>
              <div>
                <Button
                  variant='secondary'
                  className={clsx(
                    'h-7 font-semibold !leading-4 text-primary-dark'
                    //  balanceFormatted > Number.EPSILON &&
                    //     'hover:bg-gradient-ltr hover:border-none hover:text-white'
                  )}
                  size='xs'
                  outline
                  disabled={isSubmitting || balanceFormatted <= Number.EPSILON}
                  onClick={() => {
                    const values = [balanceFormatted - Number.EPSILON];
                    if (maxAmount > 0) values.push(maxAmount);
                    field.onChange(Math.min(...values).toString());
                  }}
                  type='button'
                >
                  {t('mint_redeem:max')}
                </Button>
              </div>
            </div>
          </div>

          <ToggleActive onToggle={toggleActive} isTma={isTma} />

          {/* TO */}
          <div className='rounded-md border border-gray-200 bg-gray-300 p-3 md:p-4'>
            <div className='relative flex items-center'>
              <img
                src={toToken.logo}
                className='h-10 w-10'
                alt={toToken.symbol}
              />
              <div
                className={clsx(
                  'flex-1 truncate pl-4 text-right font-sf-pro-expanded text-lg font-bold leading-[22px] lg:text-xl lg:leading-6',
                  !toAmount ? 'text-gray' : 'text-black'
                )}
              >
                {toAmount > 0 ? `${formatNumber(toAmount)}` : '0.0'}
              </div>
              <Tooltip
                className='absolute right-0 top-0 h-full font-sf-pro-expanded text-lg font-bold opacity-0 lg:text-xl'
                content={formatNumber(toAmount, 18)}
                disabled={!toAmount}
              >
                {formatNumber(toAmount, 2)}
              </Tooltip>
            </div>
            <div className='mt-2 flex items-center justify-between'>
              <div className='text-xs font-semibold'>
                <span className='text-gray'>{t('common:balance')}: </span>
                <span className={clsx(toToken.classNameCurrency, '')}>
                  {formatNumber(toBalance.formattedBalance, toToken.scale) ||
                    '0.0'}{' '}
                  {toToken.symbol}
                </span>
              </div>
            </div>
          </div>

          {/* RATE */}
          <SwapRate functionName={functionName} isTma={isTma} />

          {/* Mint And Redeem */}

          {!!tonAddress ? (
            <Button
              variant='primary'
              size='md'
              className='w-full !text-base !leading-5'
              type='submit'
              disabled={
                // !writeAsync ||
                !enabled || !!swappingData
              }
            >
              {t(`mint_redeem:${functionName}.submit_text`)}
            </Button>
          ) : (
            <Button
              variant='primary'
              size='md'
              className='w-full !text-base !leading-5'
              type='button'
              onClick={() => tonConnectUI.openModal()}
            >
              {t('common:connect_wallet')}
            </Button>
          )}
        </div>
      </form>
      <div
        className={cn(
          'h-[120px] rounded-b-xxl border-t border-gray-200 bg-white px-3 pb-3 pt-4 text-xs lg:px-4 lg:pb-4',
          isTma && 'px-3 pb-4 pt-3'
        )}
      >
        <RateInfo type={functionName} />
      </div>

      {isTma
        ? !!swappingData && (
            <ConfirmModal
              {...swappingData}
              contractAddress={contractAddress}
              fromToken={fromToken}
              toToken={toToken}
              functionName={functionName}
              onClose={(success) => {
                setSwappingData(null);
                if (success) reset();
              }}
              isTma={isTma}
            />
          )
        : !!swappingData && (
            <ConfirmModal
              {...swappingData}
              contractAddress={contractAddress}
              fromToken={fromToken}
              toToken={toToken}
              functionName={functionName}
              onClose={(success) => {
                setSwappingData(null);
                if (success) reset();
              }}
            />
          )}
    </div>
  );
};

export default Pair;
