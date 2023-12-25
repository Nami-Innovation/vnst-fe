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
    <div className='grid grid-cols-12 gap-7'>
      <div className='col-span-12 lg:col-span-7'>
        {post1 && (
          <BlogFeatureThumbnail
            imageFeature={post1.feature_image}
            title={post1.title}
            className='aspect-[241/125] lg:aspect-[3/2.31]'
            slug={post1.slug}
          />
        )}
      </div>
      <div className='col-span-12 flex flex-col gap-y-7 lg:col-span-5'>
        <div>
          {post2 && (
            <BlogFeatureThumbnail
              imageFeature={post2.feature_image}
              title={post2.title}
              className='aspect-[241/125]'
              slug={post2.slug}
            />
          )}
        </div>
        <div>
          {post3 && (
            <BlogFeatureThumbnail
              imageFeature={post3.feature_image}
              title={post3.title}
              className='aspect-[241/125]'
              slug={post3.slug}
            />
          )}
        </div>
      </div>
    </div>
  );
}
