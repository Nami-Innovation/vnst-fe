/* eslint-disable react-hooks/rules-of-hooks */
import { Params as GhostParams } from '@tryghost/content-api';
import { getPosts, getTags } from '@/services/GhostClient';
import BlogsPage from '@/components/blogs';
import { notFound } from 'next/navigation';
import { handleParseData } from '@/components/common/utils/constant';
import { Metadata } from 'next';
import { useTranslation } from '@/i18n';

type SearchParams = { [key: string]: string | string[] | undefined };

type BlogsProps = {
  params: { lang: string };
  searchParams: SearchParams;
};

export default async function Page({ params, searchParams }: BlogsProps) {
  const data: any = await getData(searchParams, params?.lang);
  const { posts, featurePost } = handleParseData(
    data.posts,
    data.resFeaturedPost
  );
  return (
    <BlogsPage
      pagination={data.pagination}
      dataBlogs={posts}
      tags={data.tags}
      lang={params.lang}
      searchParams={searchParams}
      dataBlogsFeatured={featurePost}
    />
  );
}

export const generateMetadata = async ({
  params: { lang },
}: BlogsProps): Promise<Metadata> => {
  const { t } = await useTranslation(lang, 'blogs');

  return {
    description: t('meta_description'),
  };
};

export const dynamic = 'force-dynamic';

const IgnoredTags = ['hash-vi', 'hash-en'];

async function getData(searchParams: SearchParams, locale: string) {
  const page = searchParams?.page ? Number(searchParams.page) : 1;

  let filter = `tag:hash-${locale}`;
  const fields =
    'id,title,slug,feature_image,created_at,updated_at,excerpt,published_at,featured';
  const resFeaturedPost = await getPosts({
    filter: `featured:true+tag:hash-${locale}`,
    include: ['tags'],
    limit: 3,
    fields,
    order: 'published_at DESC',
  });

  if (searchParams.tag !== 'all' && searchParams.tag) {
    filter += `+tag:${searchParams.tag}`;
  }
  if (resFeaturedPost.length > 0) {
    filter += resFeaturedPost.map((post) => `+slug:-${post.slug}`).join('');
  }

  const options: GhostParams = {
    limit: 9,
    include: ['tags'],
    page,
    filter,
    fields,
    order: 'published_at DESC',
  };

  try {
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
