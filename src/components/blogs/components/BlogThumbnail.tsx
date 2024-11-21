import { FC } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import dayjs from '@/lib/dayjs';
import { Tag } from '@/types/blogs';
import useLang from '@/hooks/useLang';

interface BlogThumbnailProps {
  featureImage?: string;
  title: string;
  slug: string;
  date?: Date;
  description?: string;
  tags?: Tag[];
  size: 'lg' | 'sm' | 'xs';
  className?: string;
}

const BlogThumbnail: FC<BlogThumbnailProps> = ({
  featureImage,
  title,
  slug,
  date,
  description,
  tags,
  size,
  className,
}) => {
  const lang = useLang();
  return (
    <Link
      href={`/${lang}/blogs/${slug}`}
      className={clsx(
        'blog-thumbnail block h-[318px] overflow-hidden rounded-xxl border border-gray-200 bg-white p-2 shadow-box hover:border-primary',
        className
      )}
    >
      <div className='h-full'>
        <div className='w-full'>
          <img
            className='aspect-[3/1.7] rounded-md object-cover'
            src={featureImage || '/assets/images/bannerthumb.png'}
            alt='Banner Thumb'
          />
        </div>
        <div className='mt-3 flex flex-col gap-y-2 px-2 py-1'>
          <h1
            className='title-blog line-clamp-2 h-10 w-full text-sm font-semibold leading-[18px] text-black md:text-base lg:leading-5'
            dangerouslySetInnerHTML={{ __html: title }}
          ></h1>
          <span className='line-clamp-2 max-h-9 text-xs font-semibold leading-4 text-gray'>
            {description}
          </span>
          <div className='flex flex-col items-start gap-y-2'>
            <p className='pr-2 text-xs font-semibold leading-[14px] text-gray'>
              {date ? dayjs(date).format('YYYY-MM-DD') : 'No Date'}
            </p>
            <div className='flex-rows flex'>
              {!!tags && tags.length > 0
                ? tags?.map((tag: Tag) => {
                    if (!tag?.name?.includes('#')) {
                      return (
                        <p
                          key={tag?.id}
                          className='mr-2 rounded-[6px] bg-blog-tag px-2 py-1 text-xs font-semibold capitalize leading-[14px] text-white'
                        >
                          {tag?.name}
                        </p>
                      );
                    } else {
                      return null;
                    }
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogThumbnail;
