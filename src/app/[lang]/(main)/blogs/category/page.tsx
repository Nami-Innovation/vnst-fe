import { getPosts, getTags } from '@/services/GhostClient';
import { notFound } from 'next/navigation';
import { Params as GhostParams, Pagination, Tag } from '@tryghost/content-api';
import CategoryPage from '@/components/blogs/category';

type SearchParams = { [key: string]: string | string[] | undefined };

type CategoryProps = {
  params: { lang: string };
  searchParams: SearchParams;
};

export default async function Category({
  params,
  searchParams,
}: CategoryProps) {
  const data: any = await getData(searchParams, params?.lang);
  return (
    <CategoryPage
      dataBlogs={data.posts}
      dataBlogsFeatured={data.resFeaturedPost}
      pagination={data.pagination}
      tags={data.tags}
      lang={params.lang}
      searchParams={searchParams}
    />
  );
}

export const dynamic = 'force-dynamic';

const IgnoredTags = ['hash-vi', 'hash-en'];

async function getData(searchParams: SearchParams, locale: string) {
  const page = searchParams?.page ? Number(searchParams.page) : 1;
  let filter = `tag:hash-${locale}`;
  const fields =
    'id,title,slug,feature_image,created_at,updated_at,excerpt,published_at,featured';
  if (searchParams.tag !== 'all' && searchParams.tag) {
    filter += `+tag:${searchParams.tag}`;
  }
  try {
    const resFeaturedPost = await getPosts({
      filter: `featured:true+tag:hash-${locale}`,
      include: ['tags'],
      limit: 3,
      fields,
      order: 'published_at DESC',
    });
    if (resFeaturedPost.length > 0) {
      filter += resFeaturedPost.map((post) => `+slug:-${post.slug}`).join('');
    }

    const options: GhostParams = {
      limit: 20,
      include: ['tags'],
      page,
      filter,
      fields,
      order: 'published_at DESC',
    };

    const [resPosts, resTags] = await Promise.all([
      getPosts(options),
      getTags({}),
    ]).then((res) => res);
    const ignoredTagSet = new Set(IgnoredTags);

    const tagList = resTags.filter(
      (tag: { slug: string; [x: string]: any }) =>
        !ignoredTagSet.has(tag.slug) &&
        tag.slug.startsWith(locale as unknown as string)
    );

    return {
      posts: resPosts,
      resFeaturedPost,
      tags: tagList,
      pagination: resPosts?.meta?.pagination || null,
    };
  } catch (error) {
    notFound();
  }
}
