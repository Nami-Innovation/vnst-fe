import ModalStatus from '@/components/common/Modal/ModalStatus';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Crypto } from './Pair';
import useSwapStore from '@/stores/swap.store';
import { formatNumber } from '@/utils/format';
import { formatUnits, parseUnits } from 'viem';
import SwapIcon from '@/components/common/Icons/SwapIcon';
import Button from '@/components/common/Button';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { capitalizeFirstLetter, getTonScanLink } from '@/utils/helper';
import useOutputAmount from '../commons/useOutputAmount';
import { FunctionName } from '../types';
import { useTranslationClient } from '@/i18n/client';
import clsx from 'clsx';
import { ChevronDownTriangle } from '@/components/common/Icons/ChevronDown';
import useLang from '@/hooks/useLang';
import Tooltip from '@/components/common/Tooltip';
import QuestionMarkIcon from '@/components/common/Icons/QuestionMarkIcon';
import { LINK_DIRECT } from '@/components/common/utils/header';
import { LANGUAGE } from '@/utils/type';
import ExternalLink from '@/components/common/Icons/ExternalLink';
import Image from 'next/image';
import useNotiStore from '@/stores/noti.store';
import { useTonConnect } from '@/hooks/useTonConnect';
import { Chain } from '@/web3/constants';
import { loadMarketPriceTON, waitForTransaction } from '@/web3/ton/utils';
import {
  SendTransactionResponse,
  UnknownAppError,
  UnknownError,
  UserRejectsError,
  useTonWallet,
} from '@tonconnect/ui-react';
import useJestonWalletData from '@/hooks/useJestonWallet';
import {
  JETTON_CONFIGS,
  JETTON_TRANSFER_GAS_FEES,
  TON_VNST_ADDRESS,
} from '@/web3/ton/constants';
import {
  Address,
  beginCell,
  Cell,
  JettonMaster,
  Sender,
  toNano,
  TonClient,
} from '@ton/ton';
import { VNSTJettonMinter } from '@/web3/ton/VNSTJettonMinter';
import { JettonWallet } from '@/web3/ton/JettonWallet';
import { AccountSubscriptionService } from '@/web3/ton/account-subscription.service';
import dayjs from 'dayjs';
import DrawerTma from '@/components/common/Drawer';

type ConfirmSwapProps = {
  amount: number;
  fromToken: Crypto;
  toToken: Crypto;
  functionName: FunctionName;
  onClick: () => void;
};

type TransactionResult = {
  hash: string;
  amountIn: number;
  amountOut: number;
  timestamp: number;
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
  const { tonClient } = useTonConnect();
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
    if (!tonClient) return;

    const loadMarketPrice = async () => {
      const marketPrice = await loadMarketPriceTON(tonClient);
      setCurrentRate(marketPrice);
    };
    fetchOtcDelta();
    const internal = setInterval(loadMarketPrice, 5000);
    return () => {
      clearInterval(internal);
    };
  }, [tonClient]);

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
              loadSwapInfo(Chain.TON, tonClient);
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
  const wallet = useTonWallet();
  const { t } = useTranslationClient('mint_redeem');
  const walletImageUrl = (wallet as any)?.imageUrl;

  if (!wallet) return null;

  return (
    <div className='flex flex-col items-center bg-white'>
      <img
        className='h-[68px] w-[68px]'
        src={walletImageUrl || '/assets/images/cryptos/ton.png'}
      />
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
  transaction,
  functionName,
  onOk,
}: {
  transaction: TransactionResult;
  functionName: FunctionName;
  onOk: () => void;
}) => {
  const { t } = useTranslationClient('mint_redeem');
  const [redeemFeeRate, mintFee] = useSwapStore((state) => [
    state.redeemFeeRate,
    state.mintFee,
  ]);

  const symbolIn = functionName === 'mint' ? 'USDT' : 'VNST';
  const symbolOut = functionName === 'mint' ? 'VNST' : 'USDT';

  const fee = useMemo(() => {
    if (functionName === 'mint') {
      const amountIn = transaction.amountIn;
      return amountIn * mintFee;
    } else return (transaction.amountOut / (1 - redeemFeeRate)) * redeemFeeRate;
  }, [transaction]);

  return (
    <div className='flex flex-col items-center gap-y-4 lg:gap-y-5'>
      <Image
        width={120}
        height={120}
        alt='Success'
        className='h-[120px] w-[120px]'
        src='/assets/icons/success_bubble.png'
      />
      <div className='flex flex-col items-center justify-center gap-y-1'>
        <p className=' text-center text-sm font-semibold leading-[18px] text-gray md:text-base lg:leading-5 '>
          {t(`confirm_modal.transaction_success_desc.${functionName}`)}
        </p>
        <p
          className={clsx(
            functionName === 'mint' ? 'text-warning' : 'text-primary',
            'font-sf-pro-expanded text-lg font-bold leading-[22px] md:text-xl lg:text-xl lg:leading-6'
          )}
        >
          {formatNumber(transaction.amountOut, 3)} {symbolOut}
        </p>

        <p className='text-xs font-semibold text-gray'>
          {formatNumber(transaction.amountIn, 3)} {symbolIn}
        </p>
      </div>

      {transaction && (
        <div className=' w-full rounded-md bg-gray-300 p-3 text-xs md:px-4 md:py-3'>
          <div className='flex justify-between py-0.5'>
            <div className='flex items-center text-xs font-semibold text-gray'>
              <span>{t('confirm_modal.time')}</span>
            </div>
            <a
              target='_blank'
              href={getTonScanLink(transaction.hash)}
              className='flex cursor-pointer items-center text-xs font-semibold text-gray hover:text-primary hover:underline'
            >
              {dayjs
                .unix(transaction.timestamp)
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
  contractAddress: string;
  functionName: FunctionName;
  onClose: (success?: boolean) => void;
  isTma?: boolean;
};

type ContentKey =
  | 'confirmSwap'
  | 'loading'
  | 'confirmTrasaction'
  | 'success'
  | 'error';

const ConfirmModal = ({
  fromToken,
  toToken,
  amount,
  functionName,
  onClose,
  isTma,
}: Props) => {
  const { t } = useTranslationClient('mint_redeem');
  const errorMessageRef = useRef('');
  const confirmMessageRef = useRef('');
  const transactionRef = useRef<null | TransactionResult>(null);
  const intervalRef = useRef<undefined | number>(undefined);
  const [loadNoti] = useNotiStore((state) => [state.load]);
  const [mintStatus, redeemStatus, mintCoveredAmount, redeemCoveredAmount] =
    useSwapStore((state) => [
      state.mintStatus,
      state.redeemStatus,
      state.mintCoveredAmount,
      state.redeemCoveredAmount,
    ]);
  const [contentKey, setContentKey] = useState<ContentKey>('confirmSwap');
  const [currentStep, setCurrentStep] = useState(1);

  const { tonClient, walletAddress, sender } = useTonConnect();

  const fromBalance = useJestonWalletData(
    fromToken.symbol as keyof typeof JETTON_CONFIGS
  );

  const toBalance = useJestonWalletData(
    toToken.symbol as keyof typeof JETTON_CONFIGS
  );

  const toAmount = useOutputAmount(amount, functionName);

  const isEnoughMintCoveredAmount =
    mintCoveredAmount !== undefined && toAmount < mintCoveredAmount;

  const isEnoughRedeemCoveredAmount =
    redeemCoveredAmount !== undefined && toAmount < redeemCoveredAmount;

  const subscribeWallet = useCallback(
    async (
      tonClient: TonClient,
      walletAddress: Address,
      queryId: number,
      lastlt: string
    ) => {
      if (!tonClient || !walletAddress) return;
      if (intervalRef.current) clearInterval(intervalRef.current);
      const jettonConfig =
        JETTON_CONFIGS[toToken.symbol as keyof typeof JETTON_CONFIGS];

      const jettonMaster = tonClient.open(
        JettonMaster.create(jettonConfig.address)
      );
      const address = await jettonMaster.getWalletAddress(walletAddress);

      return new Promise((resolve, reject) => {
        const accountSubscriptionService = new AccountSubscriptionService(
          tonClient,
          address,
          (txs) => {
            txs.forEach(async (tx) => {
              if (
                tx.inMessage?.info.type !== 'internal' ||
                tx.description.type !== 'generic' ||
                tx.description.computePhase?.type !== 'vm'
              ) {
                return;
              }

              const slice = tx.inMessage.body.beginParse();
              const opcode = slice.loadUint(32);
              if (opcode !== JettonWallet.OPCODES.INTERNAL_TRANSFER) {
                // jetton internal transfer
                return;
              }
              const hash = tx.hash().toString('hex');
              const _queryId = slice.loadUint(64);
              const jettonAmount = slice.loadCoins();
              if (_queryId === queryId) {
                clearInterval(intervalRef.current);
                resolve({
                  hash,
                  jettonAmount: formatUnits(
                    jettonAmount,
                    jettonConfig.decimals
                  ),
                  timestamp: tx.inMessage.info.createdAt,
                });
              }
              // }
            });
          },
          lastlt
        );

        intervalRef.current = accountSubscriptionService.start(2000);
        setTimeout(
          () => {
            clearInterval(intervalRef.current);
            reject('Timeout subcription');
          },
          5 * 60 * 1000
        );
      });
    },
    []
  );

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const onSwap = async () => {
    if (!tonClient || !walletAddress) return;
    const config =
      JETTON_CONFIGS[fromToken.symbol as keyof typeof JETTON_CONFIGS];
    const amountIn = parseUnits(amount.toString(), config.decimals);

    try {
      if (
        (functionName === 'mint' &&
          (!mintStatus || !isEnoughMintCoveredAmount)) ||
        (functionName === 'redeem' &&
          (!redeemStatus || !isEnoughRedeemCoveredAmount))
      ) {
        throw new Error('function_unavailable');
      }

      setContentKey('confirmTrasaction');
      setCurrentStep(2);

      let hash: string = '';

      const customSender: Sender = {
        send: async (args) => {
          const result = (await sender.send(
            args
          )) as unknown as SendTransactionResponse;
          hash = Cell.fromBase64(result.boc).hash().toString('base64');
        },
        address: walletAddress,
      };
      const queryId = Date.now();
      const jettonMaster = tonClient.open(JettonMaster.create(config.address));
      const userJestonAddress =
        await jettonMaster.getWalletAddress(walletAddress);
      const jettonWallet = tonClient.open(
        JettonWallet.createFromAddress(userJestonAddress)
      );

      if (functionName === 'mint') {
        const transferedOp = VNSTJettonMinter.VNST_OPCODES.MINT;
        const forwardPayload = beginCell()
          .storeUint(transferedOp, 32)
          .storeCoins(toNano('0.01')) //mint_ton_amount
          .storeCoins(toNano('0.04')) //mint_forward_ton_amount
          .endCell();

        await jettonWallet.sendTransfer(customSender, {
          fwdAmount: toNano('0.055'),
          queryId,
          jettonAmount: amountIn,
          toAddress: TON_VNST_ADDRESS,
          value: toNano('0.065'),
          forwardPayload,
        });
      } else {
        const transferedOp = VNSTJettonMinter.VNST_OPCODES.REDEEM;

        const forwardPayload = beginCell()
          .storeUint(transferedOp, 32)
          .storeCoins(toNano('0.01')) //redeem_ton_amount
          .storeCoins(toNano('0.03')) //redeem_forward_ton_amount
          .endCell();

        await jettonWallet.sendTransfer(customSender, {
          fwdAmount: toNano('0.045'),
          queryId,
          jettonAmount: amountIn,
          toAddress: TON_VNST_ADDRESS,
          value: toNano('0.055'),
          forwardPayload,
        });
      }

      setContentKey('loading');
      setCurrentStep(3);

      if (hash) {
        try {
          const txn = await waitForTransaction(
            {
              walletAddress,
              refetchLimit: 60 * 5,
              queryId,
            },
            tonClient
          );

          if (!txn) throw new Error('Transaction not found');

          const jestonTxn: any = await subscribeWallet(
            tonClient,
            walletAddress,
            queryId,
            txn.lt.toString()
          );
          transactionRef.current = {
            amountIn: amount,
            amountOut: parseFloat(jestonTxn.jettonAmount),
            hash: txn.hash().toString('hex'),
            timestamp: jestonTxn.timestamp,
          };
        } catch (error) {
          throw new Error('Transaction not found');
        }
      }

      setContentKey('success');
      fromBalance.refetch();
      toBalance.refetch();
    } catch (error: any) {
      console.error('Error: ', error);
      let reason = '';
      if (error instanceof UserRejectsError) {
        reason = 'user_rejected_error';
      } else if (error.message === 'function_unavailable') {
        reason = 'function_unavailable';
      } else if (
        error instanceof UnknownError ||
        error instanceof UnknownAppError
      ) {
        reason = 'something_went_wrong';
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
      Component: () =>
        transactionRef.current ? (
          <Success
            functionName={functionName}
            transaction={transactionRef.current}
            onOk={() => onClose(true)}
          />
        ) : null,
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

  return isTma ? (
    <DrawerTma
      variant={contentKey === 'error' ? 'danger' : 'primary'}
      title={title}
      isOpen={!!amount}
      onClose={
        currentStep === 1 || currentStep === 4 ? () => onClose() : undefined
      }
      totalStep={4}
      currentStep={currentStep}
    >
      <Component />
    </DrawerTma>
  ) : (
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
