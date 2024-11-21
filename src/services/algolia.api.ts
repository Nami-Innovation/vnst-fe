import algoliasearch from 'algoliasearch/lite';

const algoliaClient = algoliasearch(
  process.env.ALGOLIA_APP_ID || '',
  process.env.ALGOLIA_API_KEY || ''
);
export const algoliaIndex = algoliaClient.initIndex(
  process.env.ALGOLIA_INDEX_NAME ?? ''
);

export const searchArticles = async ({
  query = '',
  limit = 9,
  page = 1,
  language = 'en',
  tag,
}: {
  tag: string | undefined;
  language: string;
  page: number;
  limit: number;
  query: string;
}) => {
  const filter: { page: number; tagFilters: string[]; hitsPerPage?: number } = {
    page: page - 1,
    hitsPerPage: limit,
    tagFilters: tag ? [`#${language}`, `${tag}`] : [`#${language}`],
  };
  return await algoliaIndex.search(query, filter);
};
