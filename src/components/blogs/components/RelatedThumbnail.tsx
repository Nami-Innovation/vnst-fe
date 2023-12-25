import useLang from '@/hooks/useLang';
import { Tag } from '@/types/blogs';
import Link from 'next/link';

type RelatedThumbnailProps = {
  imageFeatured: string;
  title: string;
  tags: Tag[];
  slug: string;
};

export default function RelatedThumbnail({
  imageFeatured,
  title,
  tags,
  slug,
}: RelatedThumbnailProps) {
  const lang = useLang();

  return (
    <Link
      className='hover:bg-black-related-thumbnail-border-gradient inline-block rounded-md border border-transparent '
      href={`/${lang}/blogs/${slug}`}
    >
      <div className='bg-thumbnail grid grid-cols-12 rounded-md bg-center'>
        <div className='col-span-5'>
          <img
            src={imageFeatured}
            alt='Image Featured'
            className='aspect-[150/82] h-24 w-full rounded-md object-cover md:aspect-[177/94]'
          />
        </div>
        <div className='col-span-7 p-3'>
          <h1 className='title-blogs-thumbnail line-clamp-1 text-sm font-semibold leading-5 text-white md:text-base'>
            {title}
          </h1>
          <div className='mt-2 flex gap-3'>
            {tags.map((tag) => {
              if (tag?.slug === 'hash-en' || tag?.slug === 'hash-vi') {
                return null;
              }
              return (
                <p
                  className='bg-brown-border-gradient rounded-full px-2 py-1 text-xs font-medium leading-[14px] text-white'
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
