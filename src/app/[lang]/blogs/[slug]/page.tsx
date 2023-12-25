import BlogDetail from '@/components/blogs/components/BlogDetail';
import { getPosts, getSinglePost } from '@/services/GhostClient';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { handleGenerateSlug } from '@/components/common/utils/constant';
import { PostOrPage } from '@tryghost/content-api';
import { handleParseDescription } from '@/utils/helper';
import { BASE_URL } from '@/utils/constants';

type Props = {
  params: { slug: string; lang: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug, lang } = params;
  const slugParams = handleGenerateSlug(slug, lang);
  let post: PostOrPage;
  try {
    post = await getSinglePost(slugParams);
  } catch (error) {
    notFound();
  }

  // optionally access and extend (rather than replace) parent metadata
  const _parrent = await parent;
  const previousImages = _parrent.openGraph?.images || [];
  const url = `${BASE_URL}/${lang}/blogs/${slug}`;
  return {
    title: post.title,
    description: handleParseDescription(post.excerpt as string),
    colorScheme: _parrent.colorScheme,
    themeColor: _parrent.themeColor,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      title: post?.title,
      description: handleParseDescription(post?.excerpt as string),
      url: url,
      siteName: _parrent.openGraph?.siteName,
      images: [
        {
          url: post.feature_image || '',
          width: 1200,
          height: 674,
          alt: post.feature_image_alt || post.title,
        },
        ...previousImages,
      ],
    },
    twitter: {
      site: _parrent.twitter?.site || undefined,
      title: post.twitter_title || post.title,
      description: post.twitter_description || undefined,
      card: 'summary_large_image',
      images: [
        {
          url: post.feature_image || '',
          width: 1200,
          height: 674,
          alt: post.feature_image_alt || post.title,
        },
      ],
    },
    authors: post.authors?.map((author) => ({
      name: author.name,
    })),
  };
}

async function getData(params: { slug: string; lang: string }) {
  const { slug, lang } = params;
  const slugParams = handleGenerateSlug(slug, lang);
  try {
    const [post, relatedPosts] = await Promise.all([
      getSinglePost(slugParams),
      getPosts({
        include: ['tags'],
        filter: `tag:hash-${lang}+slug:-${slugParams}`,
        limit: 5,
        order: 'published_at DESC',
      }),
    ]);

    return {
      post: post,
      relatedPosts,
    };
  } catch (error) {
    notFound();
  }
}

const index = async ({
  params,
}: {
  params: {
    slug: string;
    lang: string;
  };
}) => {
  const data: any = await getData(params);

  return (
    <main className='w-full'>
      <BlogDetail data={data} params={params} />
    </main>
  );
};

export const revalidate = 3600; //revalidate cache

export default index;
