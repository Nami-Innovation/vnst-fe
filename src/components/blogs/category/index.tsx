'use client';

import GHOST_DETAIL, { Tag } from '@/types/blogs';
import { Pagination as PaginationProps } from '@tryghost/content-api';
import BlogComponentCommon from '../common';
import BlogThumbnail from '../components/BlogThumbnail';
import Pagination from '@/components/common/Pagination';
import { usePathname, useRouter } from 'next/navigation';

type BlogsPageProps = {
  dataBlogs: GHOST_DETAIL[];
  dataBlogsFeatured: GHOST_DETAIL[];
  pagination: PaginationProps;
  tags: Tag[];
  lang: string;
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function CategoryPage({
  dataBlogs,
  dataBlogsFeatured,
  pagination,
  tags,
  lang,
  searchParams,
}: BlogsPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const handleChangePage = (pageNumber: number) => {
    router.replace(`${pathname}?tag=${searchParams.tag}&page=${pageNumber}`, {
      scroll: false,
    });
  };

  const tag = tags.filter((item) => item.slug === searchParams.tag);

  return (
    <main className='mx-auto max-w-screen-xl'>
      <section className='px-4 pb-4 lg:px-0'>
        <BlogComponentCommon
          dataBlogsFeatured={dataBlogsFeatured}
          tags={tags}
          lang={lang}
        />
      </section>
      <section className='mb-20 border-t border-solid border-gray-200 px-4 pt-[30px] lg:px-0'>
        <h1 className=' font-sf-pro-expanded text-xl font-bold text-black'>
          {tag.length > 0 ? tag[0].name : ''}
        </h1>
        <div className='mt-6 grid grid-cols-1 gap-[30px] lg:grid-cols-4'>
          {(dataBlogs || []).map((blog) => {
            return (
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
      </section>
    </main>
  );
}
