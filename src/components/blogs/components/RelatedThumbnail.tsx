import useLang from '@/hooks/useLang';
import { Tag } from '@/types/blogs';
import Link from 'next/link';

type RelatedThumbnailProps = {
  imageFeatured: string;
  title: string;
  tags: Tag[];
  slug: string;
  date?: string;
};

export default function RelatedThumbnail({
  imageFeatured,
  title,
  tags,
  slug,
  date,
}: RelatedThumbnailProps) {
  const lang = useLang();
  return (
    <Link
      className=' inline-block rounded-md shadow-md '
      href={`/${lang}/blogs/${slug}`}
    >
      <div className='bg-thumbnail grid grid-cols-12 rounded-md bg-center'>
        <div className='col-span-6 px-2 py-2'>
          <img
            src={imageFeatured}
            alt='Image Featured'
            className='aspect-[150/82] h-full w-full rounded-md object-cover md:aspect-[165/96]'
          />
        </div>
        <div className='col-span-6 flex flex-col gap-y-1 p-3'>
          <h1 className='title-blogs-thumbnail line-clamp-2 text-sm font-semibold leading-5 text-black md:text-base'>
            {title}
          </h1>
          <p className='text-xs font-semibold text-gray'>{date}</p>
          <div className='flex gap-3'>
            {tags.map((tag) => {
              if (tag?.slug === 'hash-en' || tag?.slug === 'hash-vi') {
                return null;
              }
              return (
                <p
                  className='rounded-[6px] bg-[#5e6ad8] px-2 py-1 text-xs font-medium leading-[14px] text-white '
                  key={tag?.id}
                >
                  {tag?.name}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </Link>
  );
}
