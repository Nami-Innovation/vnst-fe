'use client';

import GHOST_DETAIL, { Tag } from '@/types/blogs';
import { Pagination as PaginationProps } from '@tryghost/content-api';
import BlogComponentCommon from '../common';
import BlogThumbnail from '../components/BlogThumbnail';
import Pagination from '@/components/common/Pagination';
import { usePathname, useRouter } from 'next/navigation';
import NoDataSearch from '../common/NoDataSearch';
import { useTranslationClient } from '@/i18n/client';

type SearchBlogsPageProps = {
  dataBlogs: any[];
  dataBlogsFeatured: GHOST_DETAIL[];
  pagination: PaginationProps;
  tags: Tag[];
  lang: string;
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function SearchBlogsPage({
  dataBlogs,
  dataBlogsFeatured,
  pagination,
  tags,
  lang,
  searchParams,
}: SearchBlogsPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslationClient('blogs');
  const handleChangePage = (pageNumber: number) => {
    router.replace(
      `${pathname}?tag=${searchParams.tag}&page=${pageNumber}&q=${searchParams.q}`,
      {
        scroll: false,
      }
    );
  };

  const tag = searchParams.tag?.slice(3) as string;
  return (
    <main className='mx-auto max-w-screen-xl'>
      <section className='px-4 pb-0 lg:px-0 lg:pb-4'>
        <BlogComponentCommon
          dataBlogsFeatured={dataBlogsFeatured}
          tags={tags}
          lang={lang}
        />
      </section>
      <section className='mb-20 px-4 pt-10 lg:border-t lg:border-solid lg:border-gray-200 lg:px-0 lg:pt-[30px]'>
        {pagination.total > 0 ? (
          <div className='text-sm font-semibold leading-[18px] text-gray lg:text-base lg:leading-5'>
            {t('blogs:result_search', {
              num: pagination.total || 0,
              search: searchParams.q,
            })}
          </div>
        ) : null}
        {dataBlogs?.length > 0 ? (
          <>
            <h1 className=' font-sf-pro-expanded text-xl font-bold text-black'>
              {tag ? `${tag.charAt(0).toUpperCase()}${tag.slice(1)}` : ''}
            </h1>
            <div className='mt-5 grid grid-cols-1 gap-[30px] lg:mt-6 lg:grid-cols-4'>
              {(dataBlogs || []).map((blog) => {
                return (
                  <BlogThumbnail
                    key={blog?.id}
                    size='sm'
                    title={blog._highlightResult.title.value}
                    date={blog?.createdAt}
                    tags={blog?._tags}
                    description={blog?.description}
                    slug={blog?.slug}
                    featureImage={blog?.imageUrl}
                  />
                );
              })}
            </div>
            <div className='mt-[30px]'>
              {pagination && (
                <Pagination
                  currentPage={pagination.page}
                  onChangePage={handleChangePage}
                  total={pagination.total}
                  size={pagination.limit}
                  hasArrowBtn
                />
              )}
            </div>
          </>
        ) : (
          <NoDataSearch />
        )}
      </section>
    </main>
  );
}
