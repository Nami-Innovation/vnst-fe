import ModalStatus from '@/components/common/Modal/ModalStatus';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Crypto } from './Pair';
import useSwapStore from '@/stores/swap.store';
import { formatGweiNumberStr, formatNumber } from '@/utils/format';
import {
  Address,
  ContractFunctionExecutionError,
  ContractFunctionRevertedError,
  TransactionExecutionError,
  UserRejectedRequestError,
  formatUnits,
  parseUnits,
} from 'viem';
import SwapIcon from '@/components/common/Icons/SwapIcon';
import Button from '@/components/common/Button';
import { vnstABI } from '@/web3/evm/abi';
import { useAccount, useBalance, useNetwork, useSwitchNetwork } from 'wagmi';
import {
  ChainMismatchError,
  WaitForTransactionResult,
  prepareWriteContract,
  readContract,
  waitForTransaction,
  writeContract,
} from '@wagmi/core';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { VNST_ADDRESS } from '@/web3/evm/constants';
import { delay, capitalizeFirstLetter, getBscScanLink } from '@/utils/helper';
import useOutputAmount from '../commons/useOutputAmount';
import { FunctionName } from '../types';
import { useTranslationClient } from '@/i18n/client';
import { WalletLogos } from '@/web3/evm/wallets';
import clsx from 'clsx';
import { ChevronDownTriangle } from '@/components/common/Icons/ChevronDown';
import useLang from '@/hooks/useLang';
import { getEventLogsByTransaction } from '@/services/event-log.api';
import { EventLog, EventName } from '@/@type/event-log.type';
import Tooltip from '@/components/common/Tooltip';
import QuestionMarkIcon from '@/components/common/Icons/QuestionMarkIcon';
import { LINK_DIRECT } from '@/components/common/utils/header';
import { LANGUAGE } from '@/utils/type';
import dayjs from '@/lib/dayjs';
import ExternalLink from '@/components/common/Icons/ExternalLink';
import Image from 'next/image';
import { mainChain } from '@/web3/evm/wagmiConfig';
import useNotiStore from '@/stores/noti.store';
import { Chain } from '@/web3/constants';
import { loadMarketPriceEVM } from '@/web3/evm/utils';

type ConfirmSwapProps = {
  amount: number;
  fromToken: Crypto;
  toToken: Crypto;
  functionName: FunctionName;
  onClick: () => void;
};

const ConfirmSwap = ({
  fromToken,
  toToken,
  amount,
  functionName,
  onClick,
}: ConfirmSwapProps) => {
  const lang = useLang();
  const { t } = useTranslationClient('mint_redeem');

  const [rate, redeemFeeRate, loadSwapInfo, otcDelta, fetchOtcDelta, mintFee] =
    useSwapStore((state) => [
      state.marketPrice,
      state.redeemFeeRate,
      state.loadContractInfo,
      state.otcDelta,
      state.fetchOtcDelta,
      state.mintFee,
    ]);
  const [currentRate, setCurrentRate] = useState(rate);
  const [isPriceUpdated, setisPriceUpdated] = useState(false);

  useEffect(() => {
    if (!rate || !currentRate || otcDelta < 0 || otcDelta > 1) return;
    const range = rate * otcDelta;

    if (rate !== currentRate && Math.abs(rate - currentRate) > range) {
      setisPriceUpdated(true);
    }
  }, [rate, currentRate, otcDelta]);

  useEffect(() => {
    const loadMarketPrice = async () => {
      const marketPrice = await loadMarketPriceEVM();
      setCurrentRate(marketPrice);
    };
    fetchOtcDelta();
    const internal = setInterval(loadMarketPrice, 5000);
    return () => {
      clearInterval(internal);
    };
  }, []);

  const toAmount = useOutputAmount(amount, functionName);
  return (
    <div className='flex flex-col gap-y-4 lg:gap-y-5'>
      <div className='rounded-md bg-gray-300 p-3 md:p-4'>
        <div className='flex items-center justify-between'>
          <img
            src={fromToken.logo}
            alt={fromToken.symbol}
            className='h-10 w-10'
          />
          <div
            className={clsx(
              'font-sf-pro-expanded text-lg font-bold leading-[22px] lg:text-xl lg:leading-6',
              fromToken.classNameCurrency
            )}
          >
            {formatNumber(amount)}
          </div>
        </div>
        <div className='my-2 font-semibold text-gray'>
          <div className='flex w-10 justify-center'>
            <ChevronDownTriangle />
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <img src={toToken.logo} alt={toToken.symbol} className='h-10 w-10' />
          <div
            className={clsx(
              'font-sf-pro-expanded text-lg font-bold leading-[22px] lg:text-xl lg:leading-6',
              toToken.classNameCurrency
            )}
          >
            {formatNumber(toAmount, 2)}
          </div>
        </div>
      </div>
      {isPriceUpdated && (
        <div className='my-4 flex items-center justify-between rounded-md bg-primary bg-opacity-20 px-3 py-3 md:my-5 md:px-4'>
          <div className='text-xs font-semibold'>{t('price_updated')}</div>
          <Button
            size='md'
            variant='primary'
            onClick={() => {
              loadSwapInfo(Chain.BNB);
              setisPriceUpdated(false);
            }}
          >
            {t('accept')}
          </Button>
        </div>
      )}

      <div className='flex flex-col rounded-md bg-gray-300 p-3 text-xs md:px-4 md:py-3'>
        <div className='flex justify-between'>
          <span className='font-semibold text-gray'>{t('price')}</span>
          <span className='flex items-center'>
            <span className='font-semibold text-gray'>1 USDT</span>{' '}
            <SwapIcon className='mx-1 h-3 w-3 font-semibold text-gray' />
            <span className='font-semibold text-warning'>
              {formatNumber(rate, 2)} VNST
            </span>
          </span>
        </div>

        <div className='flex items-center justify-between'>
          <div>
            <Tooltip
              content={t(`${functionName}.fee_tooltip`)}
              className='flex items-center justify-between gap-x-1 font-semibold text-gray'
            >
              <p>{t(`${functionName}.fee`)}</p>
              <QuestionMarkIcon className='inline' />
            </Tooltip>
          </div>
          <span className='font-semibold text-primary'>
            {functionName === 'redeem'
              ? `${formatNumber(toAmount * redeemFeeRate, 6)} USDT`
              : `${formatNumber(amount * mintFee, 6)} USDT`}
          </span>
        </div>
      </div>

      <div
        className='px-6 text-center text-xs font-semibold text-gray'
        dangerouslySetInnerHTML={{
          __html: t('confirm_modal.accept_legal_term'),
        }}
      />
      <Button
        variant='primary'
        size='md'
        className=' w-full'
        onClick={onClick}
        disabled={isPriceUpdated}
      >
        {t('confirm_modal.confirm_btn')}
      </Button>
      <div className=' text-center text-xs font-semibold text-primary'>
        <a
          href={LINK_DIRECT[lang as keyof LANGUAGE]?.vmm}
          target='_blank'
          className='hover:underline'
        >
          {t('confirm_modal.refer_exchange_rate')}
        </a>
      </div>
    </div>
  );
};

const ConfirmTransaction = ({ message }: { message?: string }) => {
  const { connector } = useAccount();
  const { t } = useTranslationClient('mint_redeem');

  if (!connector) return null;

  return (
    <div className='flex flex-col items-center bg-white'>
      <img className='h-[68px] w-[68px]' src={WalletLogos[connector.name]} />
      <p className='mt-1 text-center text-sm font-semibold leading-[18px] text-gray lg:text-base lg:leading-5'>
        {message ? (
          <span dangerouslySetInnerHTML={{ __html: message }} />
        ) : (
          t('confirm_modal.confirm_transaction_desc')
        )}
      </p>
    </div>
  );
};

const Success = ({
  eventLog,
  functionName,
  onOk,
}: {
  eventLog: EventLog | null;
  functionName: FunctionName;
  onOk: () => void;
}) => {
  const { t } = useTranslationClient('mint_redeem');
  const [redeemFeeRate, mintFee] = useSwapStore((state) => [
    state.redeemFeeRate,
    state.mintFee,
  ]);

  const symbolIn = functionName === 'mint' ? 'VNST' : 'USDT';
  const symbolOut = functionName === 'mint' ? 'USDT' : 'VNST';
  const outAmount = Number(
    formatUnits(
      BigInt((eventLog?.returnValues['amount_out'] as string) || 0),
      18
    )
  );
  const fee = useMemo(() => {
    const amountIn = Number(
      formatUnits(
        BigInt((eventLog?.returnValues['amount_in'] as string) || 0),
        18
      )
    );
    if (functionName === 'mint') {
      return amountIn * mintFee;
    } else return (outAmount / (1 - redeemFeeRate)) * redeemFeeRate;
  }, [eventLog]);

  return (
    <div className='flex flex-col items-center gap-y-4 lg:gap-y-5'>
      <Image
        width={120}
        height={120}
        alt='Success'
        className='h-[120px] w-[120px]'
        src='/assets/icons/success_bubble.png'
      />
      <div className='flex flex-col items-center justify-center'>
        <p className=' text-center text-sm font-semibold leading-[18px] text-gray md:text-base lg:leading-5'>
          {t(`confirm_modal.transaction_success_desc.${functionName}`)}
        </p>
        <p
          className={clsx(
            functionName === 'mint' ? 'text-warning' : 'text-primary',
            'font-sf-pro-expanded text-lg font-bold leading-[22px] md:text-xl lg:text-xl lg:leading-6'
          )}
        >
          {formatGweiNumberStr(eventLog?.returnValues['amount_out'], 3)}{' '}
          {symbolIn}
        </p>

        <p className='text-xs font-semibold text-gray'>
          ~ {formatGweiNumberStr(eventLog?.returnValues['amount_in'], 3)}{' '}
          {symbolOut}
        </p>
      </div>

      {eventLog && (
        <div className=' w-full rounded-md bg-gray-300 p-3 text-xs md:px-4 md:py-3'>
          <div className='flex justify-between py-0.5'>
            <div className='flex items-center text-xs font-semibold text-gray'>
              <span>{t('confirm_modal.time')}</span>
            </div>
            <a
              target='_blank'
              href={getBscScanLink(eventLog.transactionHash)}
              className='flex cursor-pointer items-center text-xs font-semibold text-gray hover:text-primary hover:underline'
            >
              {dayjs
                .unix(Number(eventLog.returnValues['created_at']))
                .format('HH:mm:ss - DD/MM/YYYY')}{' '}
              <ExternalLink className='ml-2 inline h-5 w-5' />
            </a>
          </div>
          <div className=' flex justify-between py-0.5'>
            <div>
              <Tooltip
                content={t(`${functionName}.fee_tooltip`)}
                className='hover:text-primary'
              >
                <div className='flex  items-center justify-between gap-x-1 font-semibold text-gray'>
                  <span>{t(`${functionName}.fee`)}</span>{' '}
                  <QuestionMarkIcon className='inline h-4 w-4' />
                </div>
              </Tooltip>
            </div>
            <span className='font-semibold text-primary'>
              {`${formatNumber(fee, 6)} USDT`}
            </span>
          </div>
        </div>
      )}

      {/* <Button className=' w-full' size='md' variant='primary' onClick={onOk}>
        {t('confirm_modal.close')}
      </Button> */}
    </div>
  );
};

const ErrorTransaction = ({
  message,
  onGoBlack,
}: {
  message: string;
  onGoBlack: () => void;
}) => {
  const { t } = useTranslationClient('mint_redeem');

  return (
    <div className='flex flex-col items-center'>
      <Image
        width={160}
        height={160}
        alt='Success'
        className='h-[120px] w-[120px]'
        src='/assets/icons/error_bubble.svg'
      />
      <p
        className='my-4 line-clamp-3 text-center text-sm font-semibold leading-[18px] text-gray md:my-5 lg:text-base lg:leading-5'
        dangerouslySetInnerHTML={{
          __html: message,
        }}
      />
      <Button
        className='w-full font-semibold'
        size='md'
        variant='primary'
        onClick={onGoBlack}
      >
        {t('confirm_modal.go_back')}
      </Button>
    </div>
  );
};

const LoadingTransaction = ({
  functionName,
}: {
  functionName: FunctionName;
}) => {
  const { t } = useTranslationClient('mint_redeem');

  return (
    <div className='flex flex-col items-center gap-y-4 lg:gap-y-5'>
      <LoadingSpinner className='h-[60px] w-[60px]' />
      <p className='text-center text-sm font-semibold leading-[18px] text-gray lg:text-base lg:leading-5'>
        {t('confirm_modal.loading_desc', {
          type: capitalizeFirstLetter(functionName),
        })}
      </p>
    </div>
  );
};

type Props = {
  amount: number;
  fromToken: Crypto;
  toToken: Crypto;
  contractAddress: Address;
  functionName: FunctionName;
  onClose: (success?: boolean) => void;
};

type ContentKey =
  | 'confirmSwap'
  | 'loading'
  | 'confirmTrasaction'
  | 'success'
  | 'error';

const watchTransaction = async (
  hash: Address,
  retry = 5
): Promise<WaitForTransactionResult> => {
  try {
    const result = await waitForTransaction({
      hash,
    });
    return result;
  } catch (error) {
    if (retry > 1) {
      await delay(1000);
      return watchTransaction(hash, retry - 1);
    }
    throw error;
  }
};

const ConfirmModal = ({
  fromToken,
  toToken,
  amount,
  functionName,
  onClose,
}: Props) => {
  const { t } = useTranslationClient('mint_redeem');
  const contractAddress = VNST_ADDRESS;
  const errorMessageRef = useRef('');
  const confirmMessageRef = useRef('');
  const eventLogRef = useRef<null | EventLog>(null);
  const { chain } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();
  const [loadNoti] = useNotiStore((state) => [state.load]);

  const [contentKey, setContentKey] = useState<ContentKey>('confirmSwap');
  const [currentStep, setCurrentStep] = useState(1);
  const { address } = useAccount({
    onDisconnect: () => onClose(false),
  });
  const fromBalance = useBalance({
    address,
    token: fromToken.token,
  });
  const toBalance = useBalance({
    address,
    token: toToken.token,
  });

  const onSwap = async () => {
    const amountIn = parseUnits(amount.toString(), 18);

    try {
      if (chain?.unsupported) {
        setContentKey('confirmTrasaction');
        confirmMessageRef.current = t('txn_errors.chain_miss_match');
        await switchNetworkAsync?.(mainChain.id);
        confirmMessageRef.current = '';
      }

      setContentKey('confirmTrasaction');
      setCurrentStep(2);

      if (fromToken.token !== contractAddress) {
        const allowance = (await readContract({
          abi: fromToken.abi,
          address: fromToken.token,
          functionName: 'allowance',
          args: [address, contractAddress],
        })) as unknown as bigint;

        if (allowance < amountIn) {
          const config = await prepareWriteContract({
            address: fromToken.token,
            abi: fromToken.abi,
            functionName: 'approve',
            args: [contractAddress, fromBalance.data?.value || amountIn],
          });

          const result = await writeContract(config);

          if (result.hash) {
            const { status } = await watchTransaction(result.hash);
          }
        }
      }

      const config = await prepareWriteContract({
        address: contractAddress,
        abi: vnstABI,
        functionName,
        args: [amountIn],
      });

      const result = await writeContract(config);

      setContentKey('loading');
      setCurrentStep(3);

      if (result.hash) {
        const { status, blockNumber, transactionHash, blockHash } =
          await watchTransaction(result.hash);
        if (status === 'reverted') {
          throw new Error('Your trasaction is reverted');
        }
        try {
          const eventLogs = await getEventLogsByTransaction({
            blockHash,
            transactionHash,
            blockNumber: Number(blockNumber),
          });
          if (eventLogs) {
            useNotiStore.getState().notiList = [];
            loadNoti({ limit: 10, offset: 0 });
          }
          const event =
            functionName === 'mint' ? EventName.MINT : EventName.REDEEM;
          const eventLog = eventLogs.find((log) => log.event === event);
          eventLogRef.current = eventLog || null;
        } catch (error) {
          console.error('Cannot get event logs: ', error);
        }
      }

      setContentKey('success');
      fromBalance.refetch();
      toBalance.refetch();
    } catch (error: any) {
      let reason = '';
      if (error instanceof UserRejectedRequestError) {
        reason = 'user_rejected_error';
      } else if (error instanceof TransactionExecutionError) {
        if (error.cause instanceof UserRejectedRequestError) {
          reason = 'user_rejected_error';
        } else if (error.cause instanceof ChainMismatchError) {
          reason = 'chain_miss_match';
        }
      } else if (error instanceof ContractFunctionExecutionError) {
        if (error.cause instanceof ContractFunctionRevertedError) {
          if (error.cause.reason === 'ERC20: insufficient allowance')
            reason = 'insufficient_allowance';
          else if (error.cause.reason) reason = error.cause.reason;
        }
      }
      setContentKey('error');
      errorMessageRef.current = reason
        ? t(`txn_errors.${reason}`, {
            type: capitalizeFirstLetter(functionName),
          })
        : t('txn_errors.something_went_wrong');
    } finally {
      setCurrentStep(4);
    }
  };

  const Contents = {
    confirmSwap: {
      title: (
        <div className='text-lg font-semibold leading-[22px] text-black lg:text-xl lg:leading-6'>
          {t('confirm_modal.confirm_transaction')}
        </div>
      ),
      Component: () => (
        <div>
          <ConfirmSwap
            {...{
              fromToken,
              toToken,
              amount,
              functionName,
            }}
            onClick={onSwap}
          />
        </div>
      ),
    },
    confirmTrasaction: {
      title: (
        <div className='text-lg font-semibold leading-[22px] text-black lg:text-xl lg:leading-6'>
          {t('confirm_modal.confirm_transaction')}
        </div>
      ),
      Component: () => (
        <ConfirmTransaction message={confirmMessageRef.current} />
      ),
    },
    loading: {
      title: (
        <div className='text-lg font-semibold leading-[22px] text-black lg:text-xl lg:leading-6'>
          {t('confirm_modal.loading')}
        </div>
      ),
      Component: () => <LoadingTransaction functionName={functionName} />,
    },
    success: {
      title: (
        <div className='text-lg font-semibold leading-[22px] text-primary lg:text-xl lg:leading-6'>
          {t(`confirm_modal.transaction_success_title`)}
        </div>
      ),
      Component: () => (
        <Success
          functionName={functionName}
          eventLog={eventLogRef.current}
          onOk={() => onClose(true)}
        />
      ),
    },
    error: {
      title: (
        <div className='text-lg font-semibold leading-[22px] text-error-100 lg:text-xl lg:leading-6'>
          {t('confirm_modal.transaction_failed_title')}
        </div>
      ),
      Component: () => (
        <ErrorTransaction
          message={errorMessageRef.current}
          onGoBlack={() => {
            setCurrentStep(1);
            setContentKey('confirmSwap');
            errorMessageRef.current = '';
          }}
        />
      ),
    },
  };

  const { title, Component } = useMemo(() => {
    return Contents[contentKey];
  }, [contentKey]);

  return (
    <ModalStatus
      isOpen={true}
      title={title}
      variant={contentKey === 'error' ? 'danger' : 'primary'}
      totalStep={4}
      onRequestClose={
        currentStep === 1 || currentStep === 4 ? () => onClose() : undefined
      }
      currentStep={currentStep}
    >
      <Component />
    </ModalStatus>
  );
};

export default ConfirmModal;
