import GHOST_DETAIL from '@/types/blogs';
import BlogFeatureThumbnail from './BlogFeatureThumbnail';

type BlogFeatured = {
  dataFeatured: GHOST_DETAIL[];
};

export default function BlogFeatured({ dataFeatured }: BlogFeatured) {
  const [post1, post2, post3] = dataFeatured.sort((a, b) => {
    const aPinned = a.tags.some((tag) => tag.slug === 'pinned');
    const bPinned = b.tags.some((tag) => tag.slug === 'pinned');
    if (aPinned && !bPinned) {
      return -1;
    } else if (!aPinned && bPinned) {
      return 1;
    }
    return 0;
  });

  return (
    <div className='grid grid-cols-1 gap-x-[30px] gap-y-5 lg:h-[442px] lg:grid-cols-3'>
      <div className='col-span-1 h-full lg:col-span-2'>
        {post1 && (
          <BlogFeatureThumbnail
            imageFeature={post1.feature_image}
            title={post1.title}
            className='aspect-[358/200] lg:aspect-[790/442]'
            slug={post1.slug}
          />
        )}
      </div>
      <div className='col-span-1 flex h-full flex-col gap-y-[18px] lg:col-span-1 lg:gap-y-[18px]'>
        <div>
          {post2 && (
            <BlogFeatureThumbnail
              imageFeature={post2.feature_image}
              title={post2.title}
              className='aspect-[358/200] lg:aspect-[380/212]'
              slug={post2.slug}
            />
          )}
        </div>
        {post3 && (
          <div>
            <BlogFeatureThumbnail
              imageFeature={post3.feature_image}
              title={post3.title}
              className='aspect-[358/200] lg:aspect-[380/212]'
              slug={post3.slug}
            />
          </div>
        )}
      </div>
    </div>
  );
}
