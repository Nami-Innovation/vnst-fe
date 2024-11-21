import useLang from '@/hooks/useLang';
import clsx from 'clsx';
import Link from 'next/link';

type BlogFeatureThumbnailProps = {
  imageFeature: string;
  title: string;
  className?: string;
  slug: string;
};

export default function BlogFeatureThumbnail({
  imageFeature,
  title,
  className,
  slug,
}: BlogFeatureThumbnailProps) {
  const lang = useLang();
  return (
    <Link
      href={`/${lang}/blogs/${slug}`}
      className='relative  block bg-cover bg-no-repeat'
    >
      <img
        src={imageFeature}
        className={clsx('h-full w-full rounded-xxl object-cover', className)}
        alt={title}
      />
      <div className='absolute bottom-0 w-full bg-black bg-opacity-80 px-4 py-3 rounded-b-xxl md:px-5'>
        <div className='line-clamp-1 font-sf-pro lg:text-base font-semibold lg:leading-5 text-white text-sm leading-[18px]'>
          {title}
        </div>
      </div>
    </Link>
  );
}
