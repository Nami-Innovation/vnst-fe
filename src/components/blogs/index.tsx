'use client';

import GHOST_DETAIL, { Tag } from '@/types/blogs';
import '../../styles/blogs.scss';
import BlogListByTag from './components/BlogListByTag';
import BlogComponentCommon from './common';
import { useSearchParams } from 'next/navigation';

type BlogsPageProps = {
  dataBlogs: { [key: string]: GHOST_DETAIL[] };
  dataBlogsFeatured: GHOST_DETAIL[];
  tags: Tag[];
  lang: string;
  searchParams: { [key: string]: string | string[] | undefined };
};

const BlogsPage = ({
  dataBlogs,
  dataBlogsFeatured,
  tags,
  lang,
}: BlogsPageProps) => {
  return (
    <div className='bg-blogs bg-secondary-lightest'>
      <div className='mx-auto flex max-w-screen-xl justify-center'>
        <main className='w-full px-4 xl:px-0 '>
          <BlogComponentCommon
            dataBlogsFeatured={dataBlogsFeatured}
            tags={tags}
            lang={lang}
          />
          <section className='mb-20 mt-8 md:mt-4'>
            <div>
              {tags.map((tag: Tag) => {
                return (
                  <BlogListByTag
                    key={tag.slug}
                    title={tag.name}
                    listBlog={dataBlogs[tag.slug as string]}
                    tag={tag}
                  />
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default BlogsPage;
