import { languages } from '@/i18n/settings';
import { getPosts } from '@/services/GhostClient';
import { BASE_URL } from '@/utils/constants';
import { MetadataRoute } from 'next';

export const revalidate = 2 * 60 * 60; // 2 hour

// export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls = [BASE_URL];
  const paths = ['mint-and-redeem', 'merchant', 'blogs'];
  const blogSiteMap: MetadataRoute.Sitemap = [];
  for (const lang of languages) {
    const langBaseUrl = BASE_URL + '/' + lang;
    urls.push(langBaseUrl);
    paths.forEach((path) => {
      urls.push(`${langBaseUrl}/${path}`);
    });
    try {
      const posts = await getPosts({
        fields: 'slug,updated_at',
        filter: `visibility:public+tag:hash-${lang}`,
        limit: 'all',
      });
      posts.forEach((post) => {
        blogSiteMap.push({
          url: `${langBaseUrl}/blogs/${post.slug}`,
          lastModified: post.updated_at as string,
        });
      });
    } catch (error) {
      console.error('Cannot get posts', error);
    }
  }

  return [
    ...urls.map((url) => ({
      url,
      lastModified: new Date().toISOString(),
    })),
    ...blogSiteMap,
  ];
}
