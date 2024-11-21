'use client';
import React from 'react';
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
    <div className='h-full w-full rounded-xxl border border-gray-200 bg-white  shadow-md'>
      <div className='relative h-full w-full pb-6 pt-2 lg:pb-8 lg:pt-3'>
        <Image
          src={imageInfo.imgSrc}
          alt={imageInfo.alt}
          className={clsx(
            'translate absolute right-2 h-[140px] w-[127px] -translate-y-1/4 object-cover lg:h-[177px] lg:w-[160px] lg:-translate-y-1/3'
          )}
          width={160}
          height={177}
        />
        <div className='flex h-full flex-col items-start justify-between  gap-y-5 px-2 lg:px-3'>
          <p className='w-full rounded-lg bg-gray-300 px-4 pb-3 pt-12 text-start font-sf-pro-expanded text-2xl font-bold leading-[30px] text-secondary-darkest lg:pb-4 lg:pt-[69px] lg:text-[30px] lg:leading-9'>
            {title}
          </p>
          <div className=''>
            <p className='px-3 text-sm font-semibold leading-[18px] text-gray lg:text-base lg:leading-5'>
              {content}
            </p>
          </div>
          <div className='flex w-full items-start justify-start px-3'>
            {index === 0 ? (
              <Link
                href={LINK_DIRECT[lang as keyof LANGUAGE].vmm}
                target='_blank'
              >
                <div className='w-max rounded-[8px] border border-primary px-5 py-2.5 font-semibold leading-5 text-primary-dark hover:bg-primary hover:text-white'>
                  {btnTitle}
                </div>
              </Link>
            ) : (
              <button
                className='rounded-[8px] border border-primary px-5 py-2.5 font-semibold leading-5 text-primary-dark hover:bg-primary hover:text-white'
                onClick={handleClick}
              >
                {btnTitle}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentItem;
