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
        'hover:bg-black-thumbnail-border-gradient block w-full overflow-hidden rounded-xxl border-2 border-transparent',
        className
      )}
    >
      <div className={clsx('bg-thumbnail flex flex-col')}>
        <div className='w-full'>
          <img
            className='aspect-[3/1.7] rounded-b-xxl object-cover'
            src={featureImage || '/assets/images/bannerthumb.png'}
            alt='Banner Thumb'
            // style={{ aspectRatio: "376/200" }}
          />
        </div>
        <div className='h-[180px] px-[14px] py-4'>
          <h1 className='title-blogs-thumbnail line-clamp-2 h-[56px] w-full font-sf-pro-expanded text-lg font-bold leading-6 text-white md:text-xl '>
            {title}
          </h1>

          <span className='des-blogs-thumbnail my-3 line-clamp-2 text-sm font-semibold leading-5 text-dark-4 md:text-base'>
            {description}
          </span>

          <div className='flex items-center'>
            {tags?.map((tag: Tag) => {
              if (!tag?.name?.includes('#')) {
                return (
                  <p
                    key={tag?.id}
                    className='bg-brown-border-gradient mr-3 rounded px-2 py-1 text-xs font-medium leading-[14px] text-white'
                  >
                    {tag.name}
                  </p>
                );
              } else {
                return null;
              }
            })}
            <p className='pr-3 text-xs font-medium leading-[14px] text-primary'>
              {date ? dayjs(date).format('YYYY-MM-DD') : 'No Date'}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogThumbnail;
