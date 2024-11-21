import SearchBlogsPage from '@/components/blogs/search';
import { searchArticles } from '@/services/algolia.api';
import { getPosts, getTags } from '@/services/GhostClient';

import { notFound } from 'next/navigation';

type SearchParams = { [key: string]: string | string[] | undefined };

type SearchBlogsProps = {
  params: { lang: string };
  searchParams: SearchParams;
};

export default async function SearchBlogs({
  params,
  searchParams,
}: SearchBlogsProps) {
  // const { posts, resFeaturedPost, tags, pagination }: any = getData(
  //   searchParams,
  //   params.lang
  // );
  const data: any = await getData(searchParams, params.lang);

  return (
    <SearchBlogsPage
      dataBlogs={data?.posts}
      dataBlogsFeatured={data?.resFeaturedPost}
      pagination={data?.pagination}
      tags={data?.tags}
      lang={params.lang}
      searchParams={searchParams}
    />
  );
}

export const dynamic = 'force-dynamic';

const IgnoredTags = ['hash-vi', 'hash-en'];

async function getData(searchParams: SearchParams, locale: string) {
  const page = searchParams?.page ? Number(searchParams.page) : 1;
  const limit = 20;
  const search = searchParams?.q ? searchParams?.q : '';
  const searchTag = (searchParams?.tag as string)?.slice(3);
  const tag = searchParams?.tag
    ? `${searchTag.charAt(0).toUpperCase()}${searchTag.slice(1)}`
    : undefined;

  const fields =
    'id,title,slug,feature_image,created_at,updated_at,excerpt,published_at,featured';

  try {
    let dataSource: any = {
      articles: [],
      metadata: {},
    };
    const resFeaturedPost = await getPosts({
      filter: `featured:true+tag:hash-${locale}`,
      include: ['tags'],
      limit: 3,
      fields,
      order: 'published_at DESC',
    });

    const resTags = await getTags({});
    const ignoredTagSet = new Set(IgnoredTags);

    const tagList = resTags.filter(
      (tag: { slug: string; [x: string]: any }) =>
        !ignoredTagSet.has(tag.slug) &&
        tag.slug.startsWith(locale as unknown as string)
    );

    if (search) {
      const dataSearch = await searchArticles({
        language: locale,
        page: page as unknown as number,
        limit,
        query: String(search),
        tag: tag,
      });
      dataSource = {
        articles: dataSearch.hits,
        metadata: {
          total: dataSearch.nbHits,
          limit: dataSearch.hitsPerPage,
          page: dataSearch.page + 1,
          pages: dataSearch.nbPages,
          next: 2,
          prev: null,
        },
      };
    }
    return {
      posts: dataSource.articles,
      resFeaturedPost,
      tags: tagList,
      pagination: dataSource?.metadata || null,
    };
  } catch (error) {
    console.log(error);

    // notFound();
  }
}
