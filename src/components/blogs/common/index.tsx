'use client';

import Button from '@/components/common/Button';
import BlogFeatured from './BlogFeatured';
import clsx from 'clsx';
import InputIcon from '@/components/common/Input/InputIcon';
import SearchIcons from '@/components/common/Icons/SearchIcons';
import CancelIcons from '@/components/common/Icons/CancleIcons';
import { Tag } from '@tryghost/content-api';
import { useTranslationClient } from '@/i18n/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

type Props = {
  dataBlogsFeatured: any;
  tags: any[];
  lang: string;
};

export default function BlogComponentCommon({
  dataBlogsFeatured,
  tags,
  lang,
}: Props) {
  const { t } = useTranslationClient('common');
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag') || 'all';
  const [inputValue, setInputValue] = useState<string>(
    searchParams.get('q') || ''
  );
  const router = useRouter();
  const pathname = usePathname();

  const handlePostByTag = (tagSlug: string) => {
    if (tagSlug === 'all') {
      router.replace(`/${lang}/blogs?tag=${tagSlug}`, { scroll: false });
    } else {
      router.push(`/${lang}/blogs/category?tag=${tagSlug}&page=1`, {
        scroll: false,
      });
    }
  };

  const handleSearch = () => {
    if (inputValue) {
      router.replace(
        `/${lang}/blogs/search?tag=${tag}&page=1&q=${inputValue}`,
        { scroll: false }
      );
    } else {
      router.replace(`/${lang}/blogs`, { scroll: false });
    }
  };

  const handleClearInputValue = () => {
    setInputValue('');
    router.replace(`${pathname}?tag=${tag}&page=1`, { scroll: false });
  };
  return (
    <div>
      <section className='mt-[30px]'>
        {dataBlogsFeatured && <BlogFeatured dataFeatured={dataBlogsFeatured} />}
      </section>

      <section className='mt-10 lg:mt-[60px]'>
        <h3 className=' font-sf-pro-expanded text-2xl font-bold leading-[30px] text-black lg:text-3xl'>
          VNST blogs
        </h3>
        <div
          className={clsx(
            'mt-4 flex w-full flex-col-reverse items-start gap-y-5 overflow-hidden md:flex-row md:items-center md:justify-between'
          )}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        >
          <div className='no-scrollbar flex w-full gap-x-2 overflow-x-scroll lg:overflow-x-hidden'>
            <Button
              onClick={() => handlePostByTag('all')}
              className={clsx(
                'whitespace-pre break-keep text-xs font-semibold leading-4'
              )}
              size='sm'
              variant={!tag || tag === 'all' ? 'primary' : 'chip'}
            >
              {t('common:btn:all')}
            </Button>
            {(tags || []).map((t: Tag) => (
              <Button
                onClick={() => handlePostByTag(t.slug)}
                key={t.id}
                className={clsx(
                  'whitespace-pre break-keep text-xs font-semibold leading-4'
                )}
                size='sm'
                variant={tag === t.slug ? 'primary' : 'chip'}
              >
                {t.name}
              </Button>
            ))}
          </div>
          <div className='w-full lg:w-max'>
            <InputIcon
              placeholder={t('common:input:sfa')}
              nextIcon={
                <button
                  onClick={handleSearch}
                  className='flex items-center justify-center rounded bg-primary p-2.5'
                >
                  <SearchIcons className='h-5 w-5 text-white hover:!text-white' />
                </button>
              }
              //  prevIcon={
              //     <CancelIcons
              //       onClick={handleClearInputValue}
              //       className={`absolute right-2 cursor-pointer text-dark-3 ${
              //         inputValue ? '' : 'hidden'
              //       }`}
              //       width={16}
              //       height={16}
              //     />
              //   }
              value={inputValue}
              className='h-10 w-full !justify-between !rounded border border-gray-200 bg-white pl-2 pr-0 text-base !text-gray shadow-box focus-within:text-gray md:w-[277px]'
              classNameInput='bg-white outline-none flex lg:text-base lg:leading-5 text-sm leading-[18px] pl-2 !pr-0 h-full font-semibold text-primary-dark placeholder:text-gray'
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
