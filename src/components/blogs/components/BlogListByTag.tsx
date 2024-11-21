import GHOST_DETAIL, { Tag } from '@/types/blogs';
import BlogThumbnail from './BlogThumbnail';
import ChevronRightTriangle from '@/components/common/Icons/ChevronRightTriangle';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import ChevronLeftTriangle from '@/components/common/Icons/ChevronLeftTriangle';
import { useTranslationClient } from '@/i18n/client';

type Props = {
  title: string;
  listBlog: GHOST_DETAIL[];
  tag: Tag;
};

export default function BlogListByTag({ title, listBlog, tag }: Props) {
  const { t } = useTranslationClient('blogs');
  const pathname = usePathname();
  return (
    <div className='border-gray-200 pb-8 lg:border-t lg:py-[30px] [&:not(:first-child)]:border-t [&:not(:first-child)]:py-[30px]'>
      <div className='flex items-center justify-between'>
        <h1 className='font-sf-pro-expanded text-lg font-bold leading-[22px] text-black lg:text-xl lg:leading-6'>
          {title}
        </h1>
        <Link
          href={{
            pathname: `${pathname}/category`,
            query: { tag: tag.slug, page: 1 },
          }}
          className=' flex items-center text-gray hover:text-primary'
        >
          <span className='text-sm font-semibold leading-[18px] lg:text-base lg:leading-5'>
            {t('blogs:view_all')}
          </span>
          <ChevronLeftTriangle className='ml-1 h-4 w-4 rotate-180' />
        </Link>
      </div>
      <div className='mt-5 grid grid-cols-1 gap-y-5 lg:mt-6 lg:grid-cols-4 lg:gap-x-[30px]'>
        {listBlog.map((blog) => {
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
              className='h-max'
            />
          );
        })}
      </div>
    </div>
  );
}
