import React, { useEffect, useMemo, useState } from 'react';
import AmountInput from './AmountInput';
import Button from '@/components/common/Button';
import { useAccount, useBalance } from 'wagmi';
import { Address, formatUnits } from 'viem';
import { SubmitHandler, useController, useForm } from 'react-hook-form';
import useAppStore from '@/stores/app.store';
import useSwapStore from '@/stores/swap.store';
import RefreshIcon from '@/components/common/Icons/RefreshIcon';
import clsx from 'clsx';
import RateInfo from './RateInfo';
import { formatNumber } from '@/utils/format';
import SwapIcon from '@/components/common/Icons/SwapIcon';
import ConfirmModal from './ConfirmModal';
import Tooltip from '@/components/common/Tooltip';
import { useTranslationClient } from '@/i18n/client';
import useOutputAmount from './useOutputAmount';
import { FunctionName } from '../types';
import ConvertIcon from '@/components/common/Icons/ConvertIcon';

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
}: PairProps) => {
  const { t } = useTranslationClient(['common', 'mint_redeem']);

  const [rate, loadingSwapInfo, loadSwapInfo] = useSwapStore((state) => [
    state.marketPrice,
    state.loading,
    state.load,
  ]);
  const [swappingData, setSwappingData] = useState<SwappingData | null>(null);

  useEffect(() => {
    if (!!swappingData) return;
    loadSwapInfo();
    const internal = setInterval(loadSwapInfo, 5000);
    return () => {
      clearInterval(internal);
    };
  }, [swappingData]);

  const toggleConnectWalletModal = useAppStore(
    (state) => state.toggleConnectWalletModal
  );
  const { address, isConnected } = useAccount();

  const fromBalance = useBalance({
    address,
    token: fromToken.token,
  });
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
  const balanceDecimals = fromBalance.data ? fromBalance.data.decimals : 18;
  const balance = fromBalance.data?.value || BigInt(0);
  const balanceFormatted = Number(formatUnits(balance, balanceDecimals));

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
    if (invalid && isConnected) trigger('amount');
  }, [invalid, isConnected, balance]);

  const toBalance = useBalance({
    address,
    token: toToken.token,
  });

  const amount = useMemo(() => {
    if (!field.value) return 0;
    return Number(field.value);
  }, [field.value]);

  const toAmount = useOutputAmount(amount, functionName);
  const enabled = isConnected && isValid;

  const onSubmit: SubmitHandler<FormValues> = async () => {
    await loadSwapInfo();
    if (rate) setSwappingData({ amount: amount });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
        <div className='relative rounded-t-[20px] bg-dark-1 p-3 md:p-4'>
          {/* FROM */}
          <div className='focus-within:bg-black-border-gradient rounded-md border border-black bg-black p-3 md:p-4'>
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
                  <div className='text-right text-xs text-danger'>
                    {error?.message}
                  </div>
                )}
              </div>
            </div>
            <div className='mt-2 flex items-center justify-between'>
              <div className='text-xs font-medium'>
                <span className='text-dark-3'>{t('common:balance')}: </span>
                <span className={fromToken.classNameCurrency}>
                  {formatNumber(fromBalance.data?.formatted, fromToken.scale) ||
                    '0.0'}{' '}
                  {fromToken.symbol}
                </span>
              </div>
              <div>
                <Button
                  variant='secondary'
                  className={clsx(
                    'text-dark-2',
                    balanceFormatted > Number.EPSILON &&
                      'hover:bg-gradient-ltr hover:border-none hover:text-white'
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
          <div className='my-2 flex w-full justify-center'>
            <div
              className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black text-white'
              onClick={toggleActive}
            >
              <ConvertIcon className='w-4' />
            </div>
          </div>

          {/* TO */}
          <div className='rounded-md bg-black p-3 md:p-4'>
            <div className='relative flex items-center'>
              <img
                src={toToken.logo}
                className='h-10 w-10'
                alt={toToken.symbol}
              />
              <div
                className={clsx(
                  'flex-1 truncate pl-4 text-right font-sf-pro-expanded text-lg font-bold lg:text-xl',
                  !toAmount && 'text-dark-3'
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
              <div className='text-xs font-medium'>
                <span className='text-dark-3'>{t('common:balance')}: </span>
                <span className={toToken.classNameCurrency}>
                  {formatNumber(toBalance.data?.formatted, toToken.scale) ||
                    '0.0'}{' '}
                  {toToken.symbol}
                </span>
              </div>
            </div>
          </div>

          {/* RATE */}
          <div className='my-4 flex items-center justify-between text-xs'>
            <span className='text-dark-3'>{t('mint_redeem:price')}</span>
            <span className='flex items-center'>
              {functionName === 'mint' ? (
                <>
                  <span className='text-white'>1 USDT</span>
                  <SwapIcon className='mx-1 text-dark-3' />
                  <span className='text-vnst'>
                    {rate ? formatNumber(rate, 3) : ''} VNST
                  </span>
                </>
              ) : (
                <>
                  <span className='text-white'>
                    {rate ? formatNumber(rate, 3) : ''} VNST
                  </span>
                  <SwapIcon className='mx-1 text-dark-3' />
                  <span className='text-primary'>1 USDT</span>
                </>
              )}

              <Tooltip content={t('mint_redeem:refresh_exchange_rate')}>
                <button
                  onClick={loadSwapInfo}
                  type='button'
                  disabled={loadingSwapInfo}
                  className='group ml-1 text-dark-3 outline-none'
                >
                  <RefreshIcon
                    className={clsx(
                      'h-5 w-5',
                      loadingSwapInfo &&
                        'animate-spin duration-500 animate-reverse'
                    )}
                  />
                </button>
              </Tooltip>
            </span>
          </div>

          {/* Mint And Redeem */}
          {isConnected ? (
            <Button
              variant='primary'
              size='md'
              className='mt-4 w-full'
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
              className='mt-4 w-full'
              type='button'
              onClick={() => toggleConnectWalletModal(true)}
            >
              {t('common:connect_wallet')}
            </Button>
          )}
        </div>
        <div className='mt-0.5 rounded-b-xxl bg-dark-1 p-3 text-xs md:p-4'>
          <RateInfo type={functionName} />
        </div>
      </form>

      {!!swappingData && (
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
    </>
  );
};

export default Pair;
