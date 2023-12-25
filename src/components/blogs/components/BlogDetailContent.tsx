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
      {/* <img
        src={featuredImage}
        className="w-full aspect-auto object-cover rounded-xxl"
      /> */}
      <h1 className='mt-3 font-sf-pro-expanded text-2xl font-bold leading-6 text-white md:mt-5 md:text-3xl md:leading-[30px]'>
        {title}
      </h1>
      <div className='mt-2 flex items-center gap-3 md:mt-5'>
        {/* <button className="flex text-dark-3">
          <LikeIcon />
          <p className="text-base font-semibold leading-6 ">123</p>
        </button> */}
        {tags.map((tag: Tag) => {
          if (!tag.name.includes('#')) {
            return (
              <p
                key={tag?.id}
                className='bg-brown-border-gradient rounded px-2 py-1 text-xs font-medium leading-[14px] text-white'
              >
                {tag?.name}
              </p>
            );
          }
          return null;
        })}
        <p className='text-sm font-semibold leading-6 text-primary'>{date}</p>
      </div>
      <div className='relative grid md:grid-cols-12 md:px-0'>
        <div className='md:col-span-8 md:col-start-1 md:pr-4'>
          <div
            dangerouslySetInnerHTML={{ __html: mainContent }}
            className='detail-post-styles mt-5 border-b border-t border-dark-2 py-5 font-sf-pro font-semibold text-[#888] md:mt-5'
          ></div>
          <BlogDetailShare />
        </div>
        <div className='sticky right-0 top-0 mt-10 md:col-span-4 md:col-start-9 md:mt-0 md:pl-4'>
          {dataRelatedPost.length > 0 && (
            <div className='sticky top-4'>
              <RelatedPost dataRelatedPost={dataRelatedPost} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailContent;
