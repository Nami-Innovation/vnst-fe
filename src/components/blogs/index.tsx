'use client';

import Button from '@/components/common/Button';
import SearchIcons from '@/components/common/Icons/SearchIcons';
import InputIcon from '@/components/common/Input/InputIcon';
import BlogThumbnail from './components/BlogThumbnail';
import GHOST_DETAIL, { Tag } from '@/types/blogs';
import { Pagination } from '@tryghost/content-api';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { useTranslationClient } from '@/i18n/client';
import { useState } from 'react';
import '../../styles/blogs.scss';
import BlogFeatured from './components/BlogFeatured';
import PaginationCustom from '../common/Pagination';
import CancelIcons from '../common/Icons/CancleIcons';
import clsx from 'clsx';

type BlogsPageProps = {
  dataBlogs: GHOST_DETAIL[];
  dataBlogsFeatured: GHOST_DETAIL[];
  pagination: Pagination;
  tags: Tag[];
  lang: string;
  searchParams: { [key: string]: string | string[] | undefined };
};

const BlogsPage = ({
  dataBlogs,
  dataBlogsFeatured,
  pagination,
  tags,
  lang,
}: BlogsPageProps) => {
  const { t } = useTranslationClient('common');
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag') || 'all';
  const [inputValue, setInputValue] = useState<string>(
    // searchParams.get("search") || ""
    ''
  );

  const router = useRouter();
  const pathname = usePathname();

  const handlePostByTag = (tagSlug: string) => {
    router.replace(`${pathname}?tag=${tagSlug}&page=1`, { scroll: false });
  };

  const handleChangePage = (pageNumber: number) => {
    router.replace(`${pathname}?tag=${tag}&page=${pageNumber}`, {
      scroll: false,
    });
  };

  const handleSearch = () => {
    if (inputValue) {
      // router.replace(
      //   `${pathname}?tag=${tag}&page=1${
      //     inputValue ? `&search=${inputValue}` : ""
      //   }`,
      //   { scroll: false }
      // );
    }
  };

  const handleClearInputValue = () => {
    setInputValue('');
    router.replace(`${pathname}?tag=${tag}&page=1`, { scroll: false });
  };

  return (
    <div className='bg-blogs'>
      <div className='mx-auto flex max-w-screen-xl justify-center'>
        <main className='w-full px-4 xl:px-0 '>
          <section className='mt-10'>
            <BlogFeatured dataFeatured={dataBlogsFeatured} />
          </section>
          <section className='mt-10'>
            <div
              className={clsx(
                'flex w-full flex-col items-start gap-4 md:flex-row md:items-center md:justify-end'
              )}
              // onKeyDown={(e) => {
              //   if (e.key === "Enter") {
              //     handleSearch();
              //   }
              // }}
            >
              {/* <div className="flex-1">
                <InputIcon
                  placeholder={t("common:input:sfa")}
                  prevIcon={
                    <SearchIcons className="w-5 h-5" onClick={handleSearch} />
                  }
                  nextIcon={
                    <CancelIcons
                      onClick={handleClearInputValue}
                      className={`absolute right-3 cursor-pointer text-dark-3 ${
                        inputValue ? "" : "hidden"
                      }`}
                      width={16}
                      height={16}
                    />
                  }
                  value={inputValue}
                  className="relative pr-1 pl-2 !rounded bg-dark-1 text-dark-3 text-base w-full md:w-[277px] h-10 !justify-start border border-dark-2 focus-within:bg-brown-border-gradient focus-within:text-primary"
                  classNameInput="bg-dark-1 outline-none flex pl-2 h-full font-semibold text-white placeholder-dark-3"
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div> */}
              <div className='flex gap-x-2'>
                <Button
                  onClick={() => handlePostByTag('all')}
                  className={clsx({
                    'from-primary-dark via-primary to-primary-dark bg-[length:200%] bg-left hover:!border-primary hover:bg-gradient-to-r hover:bg-right hover:text-white hover:shadow-[0_0_26px_0_rgba(0,192,150,0.6)]':
                      tag !== 'all',
                  })}
                  size='sm'
                  variant={!tag || tag === 'all' ? 'primary' : 'secondary'}
                >
                  {t('common:btn:all')}
                </Button>
                {tags.map((t: Tag) => (
                  <Button
                    onClick={() => handlePostByTag(t.slug)}
                    key={t.id}
                    className={clsx({
                      'from-primary-dark via-primary to-primary-dark bg-[length:200%] bg-left hover:!border-primary hover:bg-gradient-to-r hover:bg-right hover:text-white hover:shadow-[0_0_26px_0_rgba(0,192,150,0.6)]':
                        tag !== t.slug,
                    })}
                    size='sm'
                    variant={tag === t.slug ? 'primary' : 'secondary'}
                  >
                    {t.name}
                  </Button>
                ))}
              </div>
            </div>
          </section>
          <section className='mb-20 mt-10 md:mt-6'>
            <div className='grid grid-cols-1 gap-x-7 gap-y-11 md:grid-cols-2 lg:grid-cols-3 '>
              {dataBlogs?.map((blog) => (
                <BlogThumbnail
                  key={blog?.id}
                  size='sm'
                  title={blog.title}
                  date={blog?.created_at}
                  tags={blog?.tags}
                  description={blog?.excerpt}
                  slug={blog?.slug}
                  featureImage={blog?.feature_image}
                />
              ))}
            </div>
          </section>
          <section className='pb-10'>
            <PaginationCustom
              total={pagination?.total}
              onChangePage={handleChangePage}
              currentPage={pagination?.page}
              size={pagination?.limit}
            />
          </section>
        </main>
      </div>
    </div>
  );
};

export default BlogsPage;
