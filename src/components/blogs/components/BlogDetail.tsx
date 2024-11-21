import BackToSection from './BackToSection';
import BlogDetailContent from './BlogDetailContent';
import GHOST_DETAIL from '@/types/blogs';
import dayjs from '@/lib/dayjs';
import '@/styles/blogs.scss';

type BlogDetailProps = {
  data: {
    post: GHOST_DETAIL;
    relatedPosts: GHOST_DETAIL[];
  };
  params: {
    slug: string;
    lang: string;
  };
};

const BlogDetail = ({ data }: BlogDetailProps) => {
  return (
    <main className='bg-blogs w-full'>
      <section className='pb-20 pt-5 lg:pt-[52px]'>
        <div className='mx-auto max-w-screen-xl px-4 xl:px-0'>
          <div className='mb-3 md:mb-4'>
            <BackToSection />
          </div>
          <BlogDetailContent
            title={data?.post?.title}
            date={dayjs(new Date(data?.post?.created_at)).format('YYYY-MM-DD')}
            featuredImage={data?.post?.feature_image}
            tags={data?.post?.tags}
            mainContent={data?.post?.html}
            dataRelatedPost={data?.relatedPosts}
          />
        </div>
      </section>
    </main>
  );
};

export default BlogDetail;
