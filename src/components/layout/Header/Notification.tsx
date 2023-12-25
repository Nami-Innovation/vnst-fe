/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import IconButton from '@/components/common/Button/IconButton';
import NotiIcon from '@/components/common/Icons/NotiIcon';
import Popup from '@/components/common/Popup';
import { useTranslationClient } from '@/i18n/client';
import Image from 'next/image';
import dayjs from 'dayjs';
import { formatNumber } from '@/utils/format';
import clsx from 'clsx';
import useWalletStore from '@/stores/wallet.store';
import ToggleSwitch from '@/components/common/Switch/index';
import { useAccount } from 'wagmi';
import ModalUpdateEmail from './ModalUpdateEmail';
import { isValidInput } from '@/components/home/constant';
import { toast } from 'react-toastify';
import ModalVerifyEmail from './ModalVerifyEmail';
import {
  updateEmailNotify,
  verifyEmail,
  verifyOTP,
} from '@/services/notification.api';
import InfinityScroll from '@/components/common/InfinityScroll';
import ModalSuccessVerify from './ModalSuccessVerify';
import '../../../styles/notification.scss';
import CancelIcons from '@/components/common/Icons/CancleIcons';
import useNotiStore from '@/stores/noti.store';
import useWindowSize from '@/components/common/hooks/useWindowSize';
import { NOTIFICATION_TYPE } from './type';
import ModalDetailNotification from './ModalDetailNotification';

const Notification = () => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const { wallet, setWallet } = useWalletStore();
  const { isConnected } = useAccount();
  const [isOpenModalUpdateEmail, setOpenModalUpdateEmail] = useState(false);
  const [openModalChangeEmail, setOpenModalChangeEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    message: '',
  });
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [detailNoti, setDetailNotifi] = useState<NOTIFICATION_TYPE>();
  const [offset, setOffet] = useState(0);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');
  const handleChangeVerifyCode = (e: string) => {
    setVerifyCode(e);
  };
  const { width, height } = useWindowSize();
  const [openModalVerifyEmail, setOpenModalVerifyEmail] = useState(false);
  const [email, setEmail] = useState('');
  const popupRef = useRef<HTMLDivElement | null>(null);

  const [notiList, load, total, updatedRead, reset] = useNotiStore((state) => [
    state.notiList,
    state.load,
    state.total,
    state.updatedRead,
    state.reset,
  ]);
  const ownEmail = wallet?.email;
  const handleGetNotify = async (_offset?: number) => {
    const params = {
      offset: _offset || offset,
      limit: 10,
    };
    load(params);
  };
  const handleCloseModalUpdateEmail = () => {
    setOpenModalUpdateEmail(false);
    setErrorMessage({ email: '', message: '' });
  };
  const handleSwitch = async () => {
    let params: { email: string; enabledNoti: boolean } = {
      email: wallet?.email as string,
      enabledNoti: false,
    };
    if (wallet?.email) {
      if (wallet?.enabledNoti === true) {
        params = {
          ...params,
          enabledNoti: false,
        };
      } else {
        params = {
          ...params,
          enabledNoti: true,
        };
      }
      const res = await updateEmailNotify(params)
        .then((response) => response)
        .catch((err) => toast.error(t('common:update_notification_error')));
      if (res) {
        setWallet(res);
        toast.success(t('common:update_notification_success'));
      }
    } else {
      setOpenModalUpdateEmail(true);
      //@ts-ignore
      popupRef.current?.toggle(false);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value !== ownEmail) {
      setErrorMessage({ email: '', message: '' });
    }
  };

  useEffect(() => {
    if (isConnected && wallet?.walletAddress) {
      reset();
      handleGetNotify();
    }
  }, [isConnected, wallet?.walletAddress]);

  const handleUpdateReadNotifi = async (id: string) => {
    try {
      const res = await updatedRead(id);
      if (res) {
        toast.success(t('common:update_notification_success'));
      }
    } catch (err) {
      toast.error(t('common:update_notification_error'));
    }
  };
  const { t } = useTranslationClient();
  const handleSubmitEmail = async () => {
    if (isValidInput(email)) {
      try {
        const res = await verifyEmail({ email });
        if (res) {
          setOpenModalUpdateEmail(false);
          setOpenModalVerifyEmail(true);
        }
      } catch (err) {
        toast.error(t('homepage:error:email_invalid'));
      }
    } else {
      setErrorMessage({
        email: t('homepage:error:email_invalid'),
        message: '',
      });
    }
  };
  const handleUpdateEmail = async () => {
    const params = {
      email,
    };
    if (isValidInput(email) && email !== ownEmail) {
      const res = await verifyEmail(params)
        .then((response) => response)
        .catch((err) => console.log(err));
      if (res) {
        setOpenModalChangeEmail(false);
        setOpenModalVerifyEmail(true);
      }
    }
    if (email === ownEmail) {
      setErrorMessage({
        email: t('homepage:error:email_same'),
        message: '',
      });
    } else {
      setErrorMessage({
        email: t('homepage:error:email_invalid'),
        message: '',
      });
    }
  };
  const handleVerifyOTP = async () => {
    const params = {
      email,
      otp: verifyCode,
    };
    try {
      const res = await verifyOTP(params);
      if (res) {
        setModalSuccess(true);
        setWallet(res);
        setOpenModalVerifyEmail(false);
        setVerifyCode('');
      }
    } catch (err) {
      setErrorMessage({ message: t('common:error_otp'), email: '' });
    }
  };
  if (!wallet || !isConnected) return null;

  return (
    <>
      <IconButton
        className='relative flex text-dark-3'
        ref={setReferenceElement}
      >
        <NotiIcon
          className={
            notiList?.some((item) => item?.read === false)
              ? 'fill-gradient'
              : ''
          }
        />
        {notiList?.some((item) => item?.read === false) ? (
          <div className='relative -top-2.5 right-0.5 h-1 w-1 rounded-full bg-primary text-primary'></div>
        ) : null}
      </IconButton>
      <Popup
        ref={popupRef}
        referenceElement={referenceElement}
        className={clsx('noti-popup mt-2.5 w-full lg:mt-8 lg:w-[300px] border border-dark-2 ' , {
          "fix-height": notiList.length === 0,
          "max-height": notiList.length > 0
        })}
        placement='bottom'
        showArrow={false}
      >
        <div className='flex h-full flex-col lg:h-auto !bg-dark-1 !rounded-md' id='notification'>
          <p
            className={clsx(
              'hidden w-full px-4 py-2.5 text-left font-sf-pro text-base font-semibold leading-5 text-white lg:block',
              {
                'text-center': notiList?.length === 0,
              }
            )}
          >
            {t('homepage:notification')}
          </p>
          <div
            className={clsx(
              'flex max-h-[70px] items-center justify-between border-b bg-dark-1 px-4 pb-4 pt-4 lg:hidden',
              { 'border-t border-dark-2': notiList?.length === 0 }
            )}
          >
            <div className='flex w-2/3 items-center gap-x-2'>
              <div className='text-dark-3'>
                <NotiIcon />
              </div>
              <div className='flex-1'>
                <p className='font-semibold text-white'>Email</p>
                <div className='text-xs'>
                  {wallet?.email ? (
                    <div className='flex flex-nowrap items-center justify-start  gap-x-3'>
                      <p className='line-clamp-1 inline w-full truncate text-dark-3'>
                        {' '}
                        {wallet.email}
                      </p>{' '}
                      <button
                        className='capitalize text-primary'
                        onClick={() => {
                          setOpenModalChangeEmail(true);
                          //@ts-ignore
                          popupRef.current.toggle(false);
                        }}
                      >
                        {t('homepage:change')}
                      </button>
                    </div>
                  ) : (
                    t('homepage:to_email')
                  )}
                </div>
              </div>
            </div>

            <div>
              <ToggleSwitch toggle={wallet?.enabledNoti} setToggle={handleSwitch} />
            </div>
          </div>
          <div className='flex items-center justify-between p-4 lg:hidden'>
            <div>
              <span className='text-gradient font-sf-pro-expanded text-lg font-bold'>
                {t('homepage:notification')}
              </span>
            </div>
            <div>
              <button
                onClick={() => {
                  //@ts-ignore
                  popupRef.current.toggle(false);
                }}
                className='text-dark-3'
              >
                <CancelIcons />
              </button>
            </div>
          </div>
          <div
            className={clsx({
              'h-max': notiList?.length === 0,
              'h-full lg:h-[306px]': notiList?.length > 0,
            })}
          >
            {notiList?.length > 0 ? (
              <InfinityScroll
                dataLength={notiList.length}
                hasMore={notiList.length < total}
                next={() => {
                  if (notiList.length < total) {
                    setOffet((prevOffset) => prevOffset + 10);
                    handleGetNotify(offset + 10);
                  }
                }}
                total={total}
                height={width < 968 ? height : 306}
                className='scroll-bar-primary'
                loader={
                  <button
                    type='button'
                    className='bg-indigo-500 inline-flex w-full cursor-not-allowed items-center justify-center rounded-md px-4 py-2 text-sm font-semibold leading-6 text-white shadow transition duration-150 ease-in-out'
                  >
                    <svg
                      className='-ml-1 mr-3 h-5 w-5 animate-spin text-primary'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        stroke-width='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                  </button>
                }
              >
                {notiList?.map((item, index) => (
                  <div
                    onClick={() => {
                      setDetailNotifi(item);
                      setOpenModalDetail(true);
                      if (item.read === false) {
                        handleUpdateReadNotifi(item._id);
                      }
                    }}
                    key={index}
                    className='flex-rows cursor-pointer flex items-center justify-start gap-x-3 border-t border-dark-2 p-4 hover:border-t hover:border-t-primary hover:bg-primary/20'
                  >
                    {item.type === 'mint' ? (
                      <Image
                        src='/assets/images/cryptos/vnst.png'
                        width={40}
                        height={40}
                        alt='VNST coin'
                      />
                    ) : (
                      <Image
                        src='/assets/images/cryptos/usdt.png'
                        width={40}
                        height={40}
                        alt='USDT coin'
                      />
                    )}
                    <div className='flex flex-1 flex-col gap-y-1'>
                      <p
                        className={clsx('font-semibold', {
                          'text-vnst': item?.type === 'mint',
                          'text-primary': item?.type === 'redeem',
                        })}
                      >
                        {item?.type === 'mint'
                          ? t('homepage:notifi_mint_vnst')
                          : t('homepage:notifi_redeem_usdt')}
                      </p>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: t('homepage:notifi_content', {
                            number: `${
                              item?.type === 'mint'
                                ? `${formatNumber(
                                    item?.metadata?.amountOut
                                  )} VNST`
                                : `${formatNumber(
                                    item?.metadata?.amountOut
                                  )} USDT`
                            }`,
                            // event:
                            //   item.type === 'mint'
                            //     ? 'Mint VNST'
                            //     : 'Redeem USDT',
                            class:
                              item?.type === 'mint'
                                ? 'text-vnst'
                                : 'text-primary',
                          }),
                        }}
                        className='text-xs text-white'
                      />
                      <p className='text-xs text-dark-3'>
                        {dayjs(item?.createdAt).format('DD/MM/YYYY')}
                      </p>
                    </div>
                    {item?.read === false ? (
                      <div className='h-2 w-2 rounded-full bg-primary text-primary'></div>
                    ) : null}
                  </div>
                ))}
              </InfinityScroll>
            ) : (
              <div className='my-auto flex h-full w-full flex-col items-center justify-center pb-4'>
                <Image
                  src='/assets/images/notification_empty.png'
                  width={120}
                  height={120}
                  alt='Notification empty'
                  className='h-[120px] w-[120px] object-cover'
                />
                <p className='font-semibold leading-5 text-dark-4'>
                  {t('homepage:notification_empty')}
                </p>
              </div>
            )}
          </div>
          <div
            className={clsx(
              'hidden max-h-[70px] items-center justify-between px-4 pt-4 pb-2 lg:flex border-t border-dark-2',
            )}
          >
            <div className='text-dark-3'>
              <NotiIcon />
            </div>
            <div className='w-2/3'>
              <p className='font-semibold leading-5 text-white'>Email</p>
              <div className='text-xs'>
                {wallet?.email ? (
                  <div className='flex flex-nowrap items-center justify-start gap-x-2'>
                    <p className='line-clamp-1 inline w-full truncate leading-5 text-dark-4'>
                      {' '}
                      {wallet.email}
                    </p>{' '}
                    <button
                      className='capitalize leading-5 text-primary'
                      onClick={() => {
                        setOpenModalChangeEmail(true);
                        //@ts-ignore
                        popupRef.current.toggle(false);
                      }}
                    >
                      {t('homepage:change')}
                    </button>
                  </div>
                ) : (
                  <span className='leading-[14px] text-dark-4'>
                    {t('homepage:to_email')}
                  </span>
                )}
              </div>
            </div>
            <div>
              <ToggleSwitch toggle={wallet?.enabledNoti} setToggle={handleSwitch} />
            </div>
          </div>
        </div>
      </Popup>
      {isOpenModalUpdateEmail ? (
        <ModalUpdateEmail
          title={t('homepage:create_email')}
          open={isOpenModalUpdateEmail}
          handleClose={handleCloseModalUpdateEmail}
          content={t('homepage:create_email_content')}
          placeholder={t('homepage:create_email_placeholder')}
          onChange={handleChange}
          btnContent={t('homepage:btn_update')}
          onSubmit={handleSubmitEmail}
          error={errorMessage}
          type='update_email'
          email={email}
        />
      ) : null}
      {openModalChangeEmail ? (
        <ModalUpdateEmail
          title={t('homepage:update_email')}
          open={openModalChangeEmail}
          handleClose={() => {
            setOpenModalChangeEmail(false);
            setEmail('');
            setErrorMessage({ email: '', message: '' });
          }}
          content={t('homepage:update_email_content')}
          placeholder={t('homepage:update_email_placeholder')}
          onChange={handleChange}
          btnContent={t('homepage:btn_update')}
          onSubmit={handleUpdateEmail}
          error={errorMessage}
          type='change_email'
          email={email}
        />
      ) : null}
      {openModalVerifyEmail ? (
        <ModalVerifyEmail
          title={t('homepage:verify_email')}
          open={openModalVerifyEmail}
          handleClose={() => {
            setOpenModalVerifyEmail(false);
            setVerifyCode('');
            setErrorMessage({ email: '', message: '' });
          }}
          content={t('homepage:verify_email_content')}
          onChange={handleChangeVerifyCode}
          btnContent={t('common:confirm')}
          onSubmit={handleVerifyOTP}
          error={errorMessage.message as string}
          type='change_email'
          email={email}
          value={verifyCode}
          onResend={handleSubmitEmail}
        />
      ) : null}
      {modalSuccess ? (
        <ModalSuccessVerify
          open={modalSuccess}
          handleClose={() => {
            setModalSuccess(false);
            setEmail('');
            setErrorMessage({ email: '', message: '' });
          }}
        />
      ) : null}
      {openModalDetail ? (
        <ModalDetailNotification
          open={openModalDetail}
          handleClose={() => setOpenModalDetail(false)}
          title={
            detailNoti?.type === 'mint'
              ? t('common:mint_success')
              : t('common:redeem_success')
          }
          infoNotification={detailNoti as NOTIFICATION_TYPE}
        />
      ) : null}
    </>
  );
};

export default Notification;
