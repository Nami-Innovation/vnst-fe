/* eslint-disable react-hooks/exhaustive-deps */
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
import '@/styles/notification.scss';
import useNotiStore from '@/stores/noti.store';
import useWindowSize from '@/components/common/hooks/useWindowSize';
import ModalDetailNotification from './ModalDetailNotification';
import EmailIcon from '@/components/common/Icons/EmailIcon';
import { useIsTablet } from '@/hooks/useMediaQuery';
import Drawer from '@/components/common/Modal/Drawer';
import ModalStatus from '@/components/common/Modal/ModalStatus';
import { NOTIFICATION_TYPE } from '@/types/notification';
enum STEP {
  MAIN,
  UPDATE,
  CREATE,
  DETAIL,
  VERIFY,
  STATUS,
}
const Notification = () => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const { wallet, setWallet } = useWalletStore();
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
    setErrorMessage({ email: '', message: '' });
  };
  const { width, height } = useWindowSize();
  const [openModalVerifyEmail, setOpenModalVerifyEmail] = useState(false);
  const [email, setEmail] = useState('');
  const popupRef = useRef<HTMLDivElement | null>(null);
  const [openNotifi, setOpenNotifi] = useState(false);
  const [notiList, load, total, updatedRead, reset] = useNotiStore((state) => [
    state.notiList,
    state.load,
    state.total,
    state.updatedRead,
    state.reset,
  ]);

  const [step, setStep] = useState(STEP.MAIN);
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
  const isTablet = useIsTablet();
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
      setStep(STEP.CREATE);
      setOpenModalUpdateEmail(true);

      if (!isTablet) {
        //@ts-ignore
        popupRef.current?.toggle(false);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value !== ownEmail) {
      setErrorMessage({ email: '', message: '' });
    }
  };

  useEffect(() => {
    if (wallet?.walletAddress) {
      reset();
      handleGetNotify();
    }
  }, [wallet?.walletAddress]);

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
      console.log('email1: ', email);

      try {
        const res = await verifyEmail({ email });
        console.log('res: ', res);

        if (res) {
          setOpenModalUpdateEmail(false);
          setOpenModalVerifyEmail(true);
          setStep(STEP.VERIFY);
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
        if (isTablet) {
          setStep(STEP.VERIFY);
        }
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
        if (isTablet) {
          setStep(STEP.STATUS);
        }
      }
    } catch (err) {
      setErrorMessage({ message: t('common:error_otp'), email: '' });
    }
  };
  // useEffect(() => {
  //   if (step !== STEP.CREATE || step !== STEP.CREATE) {
  //     setEmail('');
  //   }
  // }, [step]);
  const content = useCallback(() => {
    return (
      <div
        className='flex h-max flex-col rounded-[20px] !bg-white py-5 lg:h-auto lg:border lg:border-gray-200 lg:py-6'
        id='notification'
      >
        <p
          className={clsx(
            'mb-5  w-full px-4 text-center font-sf-pro-expanded text-xl font-bold leading-6 text-black lg:text-xl lg:leading-6'
          )}
        >
          {t('homepage:notification')}
        </p>
        <div
          className={clsx(
            'flex max-h-[70px] items-center justify-between border-b border-gray-200 pb-4 lg:px-4'
          )}
        >
          <div className='flex w-2/3 flex-row items-center gap-x-2 lg:w-1/2'>
            <div className='text-gray'>
              <EmailIcon />
            </div>
            <div className=''>
              <div className='text-xs'>
                {wallet?.email ? (
                  <div className='flex flex-nowrap items-center justify-start gap-x-2'>
                    <p className='line-clamp-1 inline w-full truncate font-semibold leading-4 text-gray'>
                      {' '}
                      {wallet.email}
                    </p>{' '}
                    <button
                      className='font-semibold capitalize leading-4 text-primary hover:underline'
                      onClick={() => {
                        setOpenModalChangeEmail(true);

                        if (!isTablet) {
                          //@ts-ignore
                          popupRef.current.toggle(false);
                        } else {
                          setStep(STEP.UPDATE);
                        }
                      }}
                    >
                      {t('homepage:change')}
                    </button>
                  </div>
                ) : (
                  <span className='font-semibold leading-[14px] text-gray'>
                    {t('homepage:to_email')}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div>
            <ToggleSwitch
              toggle={wallet?.enabledNoti as boolean}
              setToggle={handleSwitch}
            />
          </div>
        </div>
        <div
          className={clsx({
            'h-max': notiList?.length === 0,
            'h-[606px] lg:h-[306px]': notiList?.length > 0,
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
              height={width < 968 ? 606 : 306}
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
                    setStep(STEP.DETAIL);
                  }}
                  key={index}
                  className='flex-rows flex cursor-pointer items-center justify-start gap-x-3 py-4 lg:px-4'
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
                        'text-warning': item?.type === 'mint',
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
                              ? 'text-warning'
                              : 'text-primary',
                        }),
                      }}
                      className='text-xs font-semibold text-gray'
                    />
                    <p className='text-xs font-semibold text-gray'>
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
            <div className='my-auto flex h-full w-full flex-col items-center justify-center pt-4'>
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
      </div>
    );
  }, [notiList, offset, total, wallet]);
  const { title, Component } = useMemo(() => {
    switch (step) {
      case STEP.MAIN: {
        return {
          title: '',
          Component: () => content(),
        };
      }
      case STEP.CREATE: {
        return {
          title: t('homepage:create_email'),
          Component: () => (
            <ModalUpdateEmail
              content={t('homepage:create_email_content')}
              placeholder={t('homepage:create_email_placeholder')}
              onChange={handleChange}
              btnContent={t('homepage:btn_update')}
              onSubmit={handleSubmitEmail}
              error={errorMessage}
              type='update_email'
              email={email}
            />
          ),
        };
      }
      case STEP.UPDATE: {
        return {
          title: t('homepage:update_email'),
          Component: () => (
            <ModalUpdateEmail
              content={t('homepage:update_email_content')}
              placeholder={t('homepage:update_email_placeholder')}
              onChange={handleChange}
              btnContent={t('homepage:btn_update')}
              onSubmit={handleUpdateEmail}
              error={errorMessage}
              type='change_email'
              email={email}
            />
          ),
        };
      }
      case STEP.DETAIL: {
        return {
          title:
            detailNoti?.type === 'mint'
              ? t('common:mint_success')
              : t('common:redeem_success'),
          Component: () => (
            <ModalDetailNotification
              infoNotification={detailNoti as NOTIFICATION_TYPE}
            />
          ),
        };
      }
      case STEP.VERIFY: {
        return {
          title: t('homepage:verify_email'),
          Component: () => (
            <ModalVerifyEmail
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
          ),
        };
      }
      case STEP.STATUS: {
        return {
          title: t('homepage:verify_email'),
          Component: () => <ModalSuccessVerify />,
        };
      }
      default: {
        return {
          title: '',
          Component: () => content(),
        };
      }
    }
  }, [step, email, detailNoti, errorMessage, verifyCode, wallet]);

  if (!wallet) return null;

  if (isTablet)
    return (
      <Drawer
        trigger={
          <IconButton
            className='relative flex text-gray'
            ref={setReferenceElement}
          >
            <NotiIcon
              className={
                notiList?.some((item) => item?.read === false)
                  ? 'fill-primary'
                  : ''
              }
            />
            {notiList?.some((item) => item?.read === false) ? (
              <div className='relative -top-2.5 right-0.5 h-1 w-1 rounded-full bg-primary text-primary'></div>
            ) : null}
          </IconButton>
        }
        open={openNotifi}
        onOpenChange={(open) => {
          if (step === STEP.MAIN) {
            setOpenNotifi(open);
          } else setStep(STEP.MAIN);
        }}
        title={
          title !== '' ? (
            <p
              className={clsx(
                step === STEP.STATUS || step === STEP.DETAIL
                  ? 'text-primary'
                  : 'text-black',
                'w-full text-center font-sf-pro-expanded text-lg font-bold leading-[22px] sm:mb-4'
              )}
            >
              {title}
            </p>
          ) : null
        }
        closeClassName='!pb-0'
      >
        <Component />
      </Drawer>
    );
  return (
    <>
      <IconButton className='relative flex text-gray' ref={setReferenceElement}>
        <NotiIcon
          className={
            notiList?.some((item) => item?.read === false) ? 'fill-primary' : ''
          }
        />
        {notiList?.some((item) => item?.read === false) ? (
          <div className='relative -top-2.5 right-0.5 h-1 w-1 rounded-full bg-primary text-primary'></div>
        ) : null}
      </IconButton>
      <Popup
        ref={popupRef}
        referenceElement={referenceElement}
        className={clsx(
          'noti-popup mt-2.5 w-full !rounded-[20px] !border-0 lg:mt-8 lg:w-[400px]',
          {
            'fix-height': notiList.length === 0,
            'h-max': notiList.length > 0,
          }
        )}
        placement='bottom'
        showArrow={false}
      >
        {content()}
      </Popup>
      {isOpenModalUpdateEmail && !isTablet ? (
        <ModalStatus
          title={
            <div className='font-sf-pro-expanded text-xl font-bold leading-6 text-black'>
              {t('homepage:create_email')}
            </div>
          }
          isOpen={isOpenModalUpdateEmail}
          onRequestClose={handleCloseModalUpdateEmail}
        >
          <ModalUpdateEmail
            content={t('homepage:create_email_content')}
            placeholder={t('homepage:create_email_placeholder')}
            onChange={handleChange}
            btnContent={t('homepage:btn_update')}
            onSubmit={handleSubmitEmail}
            error={errorMessage}
            type='update_email'
            email={email}
          />
        </ModalStatus>
      ) : null}
      {openModalChangeEmail && !isTablet ? (
        <ModalStatus
          title={
            <div className='font-sf-pro-expanded text-xl font-bold leading-6 text-black'>
              {t('homepage:update_email')}
            </div>
          }
          isOpen={openModalChangeEmail}
          onRequestClose={() => {
            setOpenModalChangeEmail(false);
            setEmail('');
            setErrorMessage({ email: '', message: '' });
          }}
        >
          <ModalUpdateEmail
            content={t('homepage:update_email_content')}
            placeholder={t('homepage:update_email_placeholder')}
            onChange={handleChange}
            btnContent={t('homepage:btn_update')}
            onSubmit={handleUpdateEmail}
            error={errorMessage}
            type='change_email'
            email={email}
          />
        </ModalStatus>
      ) : null}
      {openModalVerifyEmail && !isTablet ? (
        <ModalStatus
          title={
            <div className='font-sf-pro-expanded font-bold text-black'>
              {t('homepage:verify_email')}
            </div>
          }
          isOpen={openModalVerifyEmail}
          onRequestClose={() => {
            setOpenModalVerifyEmail(false);
            setVerifyCode('');
            setErrorMessage({ email: '', message: '' });
          }}
        >
          <ModalVerifyEmail
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
        </ModalStatus>
      ) : null}
      {modalSuccess && !isTablet ? (
        <ModalStatus
          title={
            <div className='font-sf-pro-expanded text-xl font-bold leading-6 text-primary'>
              {t('common:success_verify')}
            </div>
          }
          isOpen={modalSuccess}
          onRequestClose={() => {
            setModalSuccess(false);
            setEmail('');
            setErrorMessage({ email: '', message: '' });
          }}
        >
          <ModalSuccessVerify />
        </ModalStatus>
      ) : null}
      {openModalDetail && !isTablet ? (
        <ModalStatus
          isOpen={openModalDetail}
          onRequestClose={() => {
            setOpenModalDetail(false);
            if (openModalChangeEmail) {
              setOpenModalChangeEmail(false);
            }
          }}
          title={
            <div className='font-sf-pro-expanded text-xl font-bold leading-6 text-primary'>
              {detailNoti?.type === 'mint'
                ? t('common:mint_success')
                : t('common:redeem_success')}
            </div>
          }
        >
          <ModalDetailNotification
            infoNotification={detailNoti as NOTIFICATION_TYPE}
          />
        </ModalStatus>
      ) : null}
    </>
  );
};

export default Notification;
