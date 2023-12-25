'use client';

import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Input from '../common/Input';
import { useTranslationClient } from '@/i18n/client';
import Button from '../common/Button';
import Image from 'next/image';
import clsx from 'clsx';
import { isTelegram, isEmail } from './constant';
import ModalStatus from '../common/Modal/ModalStatus';
import nl2br from 'react-nl2br';
import { TParams, subcriberMerchant } from '@/services/subcriber.api';

type FormValues = {
  name: string;
  email: string;
};
const initialState = {
  name: '',
  email: '',
};

type TProps = {
  className?: string;
};

const FormSendMail = ({ className }: TProps) => {
  const { t } = useTranslationClient('homepage');
  const {
    handleSubmit,
    control,
    reset,
    getValues,
    setError,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: initialState,
    mode: 'onChange',
    reValidateMode: 'onSubmit',
  });
  const [openModal, setOpenModal] = useState(false);
  const handleValidate = (name: string, email: string) => {
    if (!name) {
      setError('name', { type: 'onSubmit', message: t('homepage:error:name') });
      return false;
    }
    if (!email) {
      setError('email', {
        type: 'onSubmit',
        message: t('homepage:error:email'),
      });
      return false;
    }
    if (!isEmail(email) && isTelegram(email)) {
      return true;
    } else if (isTelegram(email) || isEmail(email)) {
      return true;
    } else if (isEmail(email) === false) {
      setError('email', {
        type: 'onSubmit',
        message: t('homepage:error:email_invalid'),
      });
      return false;
    } else if (isTelegram(email) === false) {
      setError('email', {
        type: 'onSubmit',
        message: t('homepage:error:telegram_invalid'),
      });
      return false;
    }
    return true;
  };
  const handleSendMail = async (data: FormValues) => {
    const name = getValues('name');
    const email = getValues('email');
    const isValidate = handleValidate(name, email);
    let params: TParams = {
      name: name.trim(),
    };
    if (isTelegram(email)) {
      params.telegramId = email.trim();
    }
    if (isEmail(email)) {
      params.email = email.trim();
    }
    if (!isValidate) {
    } else {
      await subcriberMerchant(params)
        .then((res) => {
          setOpenModal(true);
          reset();
        })
        .catch((err) => {
          setError('email', {
            type: 'onSubmit',
            message: t(`homepage:submit:${err.response.data.message}`),
          });
        });
    }
  };
  const onSubmit = async (data: FormValues) => {
    await handleSendMail(data);
  };
  return (
    <div
      className={clsx(
        'mx-auto h-max w-full px-4 xl:max-w-screen-xl xl:px-0',
        className
      )}
      id='form-mail'
    >
      <div className='relative w-full pb-4 text-start font-semibold lg:px-[30px] lg:pb-10'>
        <div className='mb-2 w-full lg:mb-6'>
          <p className='leading-mb-large lg:leading-large font-sf-pro-expanded text-mb-large font-bold capitalize text-white lg:text-large'>
            {t('form_title')}
          </p>
          <div className=' leading-mb-large w-full break-keep font-sf-pro-expanded text-mb-large font-bold capitalize lg:whitespace-nowrap lg:text-large lg:leading-[58px]'>
            <span className='text-gradient'> {t('form_title_1')}</span>
          </div>
        </div>
        <div className='text-sm lg:text-base'>
          <p dangerouslySetInnerHTML={{ __html: t('form_sub_title') }}></p>
          <p
            dangerouslySetInnerHTML={{ __html: t('form_sub_title_1') }}
            className='text-primary'
          ></p>
        </div>
        <div
          className='absolute bottom-0 h-48 w-48 translate-y-1/2 rounded-full bg-primary'
          style={{ filter: 'blur(150px)' }}
        />
      </div>
      <div
        id='form-submit'
        className='relative grid w-full grid-cols-1 gap-x-8 rounded-xl border border-primary-dark bg-cover bg-no-repeat lg:grid-cols-2 lg:rounded-xxl lg:border-0'
      >
        <form
          className={clsx(
            'relative flex w-full flex-col items-end justify-center px-4 pb-0 pt-5 md:pt-[30px] lg:items-start lg:gap-x-10 lg:px-[30px] lg:pb-[30px]',
            !isValid ? 'gap-y-3' : 'gap-y-4 md:gap-y-5'
          )}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='flex w-full flex-col'>
            <Controller
              control={control}
              name='name'
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder={t('homepage:placeholder:name')}
                  value={value}
                  onChange={onChange}
                  classNameInput='border-0 px-4 rounded-md w-full bg-black placeholder:text-dark-3 outline-none h-10 placeholder:text-xs md:placeholder:text-base'
                />
              )}
            />
            {errors.name ? (
              <p className='mt-1 pl-2 text-xs text-error-200'>
                {errors.name.message}
              </p>
            ) : null}
          </div>
          <div className='flex w-full flex-col'>
            <Controller
              control={control}
              name='email'
              render={({ field: { onChange, value } }) => (
                <Input
                  classNameInput='border-0 px-4 rounded-md w-full bg-black placeholder:text-dark-3 outline-none h-10 placeholder:text-xs md:placeholder:text-base'
                  placeholder={t('homepage:placeholder:mail')}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {errors.email ? (
              <p className='mt-1 pl-2 text-xs text-error-200'>
                {errors.email.message}
              </p>
            ) : null}
          </div>
          <div className='flex w-full items-end justify-end xl:w-auto'>
            <Button
              type='submit'
              size={'md'}
              className='w-max rounded-md capitalize xl:w-auto'
            >
              {t('homepage:send_mail')}
            </Button>
          </div>
        </form>
        <div className='relative hidden lg:block'>
          <Image
            src='/assets/images/vnst-icon.png'
            width={584}
            height={564}
            quality={80}
            alt='VNST'
            className='relative bottom-0 right-0 w-full object-cover lg:absolute'
          />
        </div>
        <div className='relative block lg:hidden'>
          <Image
            src='/assets/images/vnst-icon-mobile.png'
            width={537}
            height={539}
            quality={80}
            alt='VNST'
            className='relative bottom-0 right-0 w-full object-cover lg:absolute'
          />
        </div>
      </div>
      {openModal ? (
        <ModalStatus
          title={
            <span className='!text-xl'>
              {nl2br(t('homepage:submit:success_title'))}
            </span>
          }
          variant={'primary'}
          isOpen={openModal}
          className='bg-dark-1'
          onRequestClose={() => setOpenModal(false)}
        >
          <div className='flex flex-col items-center justify-center'>
            <img
              src='/assets/icons/success_bubble.png'
              width={120}
              height={120}
              alt='Image error'
              className='aspect-[1/1] w-2/3 object-cover'
            />
            <div className='w-full text-center'>
              <span className='font-semibold text-white'>
                {t('homepage:submit:success_content')}
              </span>
            </div>
            <div className='text-gradient mt-2 w-full text-center text-base font-semibold'>
              <span>{t('homepage:submit:success_content_1')}</span>
            </div>
          </div>
        </ModalStatus>
      ) : null}
    </div>
  );
};
export default FormSendMail;
