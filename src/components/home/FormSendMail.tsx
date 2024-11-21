'use client';

import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Input from '../common/Input';
import { useTranslationClient } from '@/i18n/client';
import Button from '../common/Button';
import clsx from 'clsx';
import { isTelegram, isEmail } from './constant';
import ModalStatus from '../common/Modal/ModalStatus';
import nl2br from 'react-nl2br';
import { TParams, subcriberMerchant } from '@/services/subcriber.api';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { useParams } from 'next/navigation';

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
  const { lang } = useParams();
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
  const isMobile = useIsMobile();
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
        'h-[636px] w-full rounded-xxl bg-[url(/assets/images/bg_formMB.png)] bg-cover bg-center bg-no-repeat lg:h-max lg:bg-[url(/assets/images/bg-form.png)]',
        className
      )}
      id='form-mail'
    >
      <div className='flex w-full flex-col gap-y-2 p-6 lg:gap-y-6 lg:px-10 lg:py-[30px]'>
        <div className='font-semibold'>
          <div className='font-sf-pro-expanded text-mb-large font-bold leading-9 text-primary lg:text-[50px] lg:leading-[54px]'>
            {t('form_title')}

            <p
              className='block text-white'
              dangerouslySetInnerHTML={{
                __html: t('form_title_1'),
              }}
            ></p>
          </div>
        </div>
        <div className='text-sm font-semibold leading-[18px] lg:text-base lg:leading-5'>
          <p dangerouslySetInnerHTML={{ __html: t('form_sub_title') }}></p>
          <p
            dangerouslySetInnerHTML={{ __html: t('form_sub_title_1') }}
            className='text-primary'
          ></p>
        </div>
        <div className=' grid w-full grid-cols-1 gap-x-8 rounded-xl lg:grid-cols-2 '>
          <form
            className={clsx(
              ' flex w-full flex-col items-start justify-center lg:gap-x-10',
              !isValid ? 'gap-y-4' : 'gap-y-4 md:gap-y-5'
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
                    classNameInput={clsx(
                      'lg:px-4 px-3 lg:py-3 py-2 rounded-md focus:border-primary focus:border text-base lg:leading-5 leading-[18px] w-full bg-gray-300 placeholder:text-gray font-semibold outline-none h-10 placeholder:text-sm md:placeholder:text-base',
                      !!errors?.name
                        ? 'text-error-100 border border-error-100'
                        : 'text-black border-0 '
                    )}
                  />
                )}
              />
              {errors.name ? (
                <p className='mt-1 pl-2 text-xs text-error-100'>
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
                    classNameInput={clsx(
                      'lg:px-4 px-3 lg:py-3 py-2 rounded-md text-base lg:leading-5 leading-[18px] w-full bg-gray-300 placeholder:text-gray font-semibold outline-none h-10 placeholder:text-sm md:placeholder:text-base',
                      !!errors?.email
                        ? 'text-error-100 border border-error-100'
                        : 'text-black border-0 '
                    )}
                    placeholder={t('homepage:placeholder:mail')}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              {errors.email ? (
                <p className='mt-1 pl-2 text-xs text-error-100'>
                  {errors.email.message}
                </p>
              ) : null}
            </div>
            <div className='mt-2 flex w-full items-start justify-start xl:w-auto'>
              <Button
                type='submit'
                size={'md'}
                className='w-max !rounded-[8px] px-5 py-2.5 font-semibold capitalize !leading-5 lg:font-semibold xl:w-auto'
              >
                {t('homepage:send_mail')}
              </Button>
            </div>
          </form>
        </div>
      </div>
      {openModal ? (
        <ModalStatus
          title={
            <span className='text-lg leading-[22px] text-primary lg:text-xl lg:leading-6'>
              {nl2br(t('homepage:submit:success_title'))}
            </span>
          }
          variant={'primary'}
          isOpen={openModal}
          className=''
          onRequestClose={() => setOpenModal(false)}
        >
          <div className='flex flex-col items-center justify-center'>
            <img
              src='/assets/icons/success_bubble.png'
              width={120}
              height={120}
              alt='Image error'
              className='aspect-[1/1] h-[120] w-[120] object-cover'
            />
            <div className='w-full text-center'>
              <span className='text-sm font-semibold leading-[18px] text-gray lg:text-base lg:leading-5'>
                {t('homepage:submit:success_content')}
              </span>
            </div>
            <div className='mt-2 w-full text-center text-sm font-semibold leading-[18px] text-primary lg:text-base lg:leading-5'>
              <span>{t('homepage:submit:success_content_1')}</span>
            </div>
          </div>
        </ModalStatus>
      ) : null}
    </div>
  );
};
export default FormSendMail;
