'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Button from '../common/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useLang from '@/hooks/useLang';
import { LINK_DIRECT } from '../common/utils/header';
import { LANGUAGE } from '@/utils/type';
type Props = {
  title: string;
  content: string;
  btnTitle?: string;
  imageInfo: {
    imgSrc: string;
    alt: string;
  };
  index: number;
};

const ContentItem = ({ title, imageInfo, content, btnTitle, index }: Props) => {
  const router = useRouter();
  const lang = useLang();
  const handleClick = () => {
    switch (index) {
      case 1: {
        return router.push('/mint-and-redeem');
      }
      case 2: {
        const element = document.getElementById('form-mail');
        if (element) {
          return element?.scrollIntoView({ behavior: 'smooth' });
        }
      }
      default: {
        return;
      }
    }
  };
  return (
    <div className='h-full w-full'>
      <div className='mx-10 h-4 rounded-t-xxl bg-white opacity-30 '></div>
      <div className='mx-4 h-4 rounded-t-xxl bg-white opacity-50 '></div>
      <div className='relative h-full w-full rounded-xxl bg-white '>
        <Image
          src={imageInfo.imgSrc}
          alt={imageInfo.alt}
          className={clsx(
            'translate absolute w-1/2 -translate-y-1/2 translate-x-1/2 object-cover lg:w-[60%] lg:translate-x-1/3'
          )}
          width={222}
          height={222}
        />
        <div className='flex h-full flex-col items-center justify-between px-4 pb-9 pt-20 lg:pt-24'>
          <div className='text-center'>
            <p className='font-sf-pro-expanded text-2xl font-bold text-dark-5 lg:text-[30px]'>
              {title}
            </p>
            <p className='mt-4 text-sm font-semibold text-dark-3 lg:text-base'>
              {content}
            </p>
          </div>
          <div className='flex w-full items-center justify-center'>
            {index === 0 ? (
              <Link
                href={LINK_DIRECT[lang as keyof LANGUAGE].vmm}
                target='_blank'
              >
                <Button size='md' className='' variant='primary'>
                  {btnTitle}
                </Button>
              </Link>
            ) : (
              <Button
                size='md'
                className=''
                onClick={handleClick}
                variant='primary'
              >
                {btnTitle}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentItem;
