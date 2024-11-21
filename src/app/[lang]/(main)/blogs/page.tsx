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
  const { posts, resFeaturedPost } = data;
  // handleParseData(
  //   data.posts,
  //   data.resFeaturedPost
  // );
  return (
    <BlogsPage
      // pagination={data.pagination}
      dataBlogs={posts}
      tags={data.tags}
      lang={params.lang}
      searchParams={searchParams}
      dataBlogsFeatured={resFeaturedPost}
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

  // let filter = `tag:hash-${locale}`;
  const fields =
    'id,title,slug,feature_image,created_at,updated_at,excerpt,published_at,featured';
  const resFeaturedPost = await getPosts({
    filter: `tag:hash-${locale}`,
    include: ['tags'],
    limit: 3,
    fields,
    order: 'published_at DESC',
  });

  try {
    const resTags = await getTags({ limit: 999 });
    const ignoredTagSet = new Set(IgnoredTags);
    const tagList = resTags.filter(
      (tag: { slug: string; [x: string]: any }) =>
        !ignoredTagSet.has(tag.slug) &&
        tag.slug.startsWith(locale as unknown as string)
    );

    const resPosts: any = {};

    for (const tag of tagList) {
      let filter = `tag:hash-${locale}`;
      if (searchParams.tag !== 'all' && searchParams.tag) {
        filter += `+tag:${searchParams.tag}`;
      }
      if (resFeaturedPost.length > 0) {
        filter += resFeaturedPost.map((post) => `+slug:-${post.slug}`).join('');
      }
      filter += `+tag:${tag.slug}`;

      const options: GhostParams = {
        limit: 4,
        include: ['tags'],
        page,
        filter,
        fields,
        order: 'published_at DESC',
      };
      const posts = await getPosts(options);
      resPosts[tag.slug as string] = posts;
    }

    return {
      posts: resPosts,
      resFeaturedPost,
      tags: tagList,
      // pagination: resPosts?.meta?.pagination || null,
    };
  } catch (error) {
    notFound();
  }
}
