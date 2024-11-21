import { FC } from 'react';
import GHOST_DETAIL, { Tag } from '@/types/blogs';

import './detail-blogs.scss';
import RelatedPost from './RelatedPost';
import BlogDetailShare from './BlogDetailShare';

interface BlogDetailContentProps {
  title: string;
  date: string;
  tags: Tag[];
  mainContent: string;
  featuredImage: string;
  dataRelatedPost: GHOST_DETAIL[];
}

const BlogDetailContent: FC<BlogDetailContentProps> = ({
  title,
  date,
  tags,
  mainContent,
  featuredImage,
  dataRelatedPost,
}) => {
  return (
    <div className=''>
      <div className='w-full border-b border-gray-200 pb-5 lg:w-2/3'>
        <h1 className='mt-3 font-sf-pro-expanded text-2xl font-bold leading-[30px] text-black md:mt-5 md:text-3xl'>
          {title}
        </h1>
        <div className='mt-2 flex items-center gap-3 md:mt-5'>
          {tags.map((tag: Tag) => {
            if (!tag.name.includes('#')) {
              return (
                <p
                  key={tag?.id}
                  className='rounded bg-[#5e6ad8] px-2 py-1 text-xs font-medium leading-4 text-white'
                >
                  {tag?.name}
                </p>
              );
            }
            return null;
          })}
          <p className='text-xs font-semibold leading-4 text-gray lg:text-sm lg:leading-6'>
            {date}
          </p>
        </div>
      </div>
      <div className='relative grid gap-x-[30px] md:grid-cols-12 md:px-0'>
        <div className='md:col-span-8 md:col-start-1 '>
          <div
            dangerouslySetInnerHTML={{ __html: mainContent }}
            className='detail-post-styles border-b border-[#cfcfcf] py-5 font-sf-pro font-semibold text-[#888]'
          ></div>
          <BlogDetailShare />
        </div>
        <div className='mt-10 md:col-span-4 md:col-start-9 md:mt-0'>
          {dataRelatedPost.length > 0 && (
            <div className='top-4'>
              <RelatedPost dataRelatedPost={dataRelatedPost} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailContent;
