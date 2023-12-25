import GhostContentAPI from '@tryghost/content-api';
import { Params as GhostParams } from '@tryghost/content-api';

const apiGhost = new GhostContentAPI({
  url: process.env.NEXT_PUBLIC_GHOST_URL as string,
  key: process.env.NEXT_PUBLIC_GHOST_KEY as string,
  version: process.env.NEXT_PUBLIC_GHOST_VERSION as 'v5.0',
});

export function getPosts(options: GhostParams) {
  return apiGhost.posts.browse(options);
}

export function getSinglePost(postSlug: string) {
  return apiGhost.posts
    .read(
      {
        slug: postSlug,
      },
      { include: ['tags', 'authors'] }
    )
    .then((response) => response);
}

export function getTags(options: GhostParams) {
  return apiGhost.tags.browse(options);
}
