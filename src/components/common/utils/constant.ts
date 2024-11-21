export const handleConvertSlug = (
  inputString: string,
  prefixToRemove: string
) => {
  let resultString = '';
  if (inputString.includes(prefixToRemove)) {
    resultString = inputString.slice(prefixToRemove.length);
  } else {
    resultString = inputString;
  }
  return resultString;
};

export const handleGenerateSlug = (slug: string, lang: string) => {
  if (lang === 'en' && slug.includes('vi-')) {
    return handleConvertSlug(slug, `vi-`);
  } else if (lang === 'vi' && !slug.includes(lang)) {
    return `${lang}-${slug}`;
  } else return slug;
};

export const handleParseData = (post: any[], featurePost: any[]) => {
  let newFeaturePost = featurePost;
  let newPost = post;
  if (post.length >= 5 && featurePost.length < 3) {
    const sortPost = post
      .filter((item) => !featurePost.find((ele) => ele?.id === item.id))
      .slice(0, 3 - featurePost.length);
    newFeaturePost = [...featurePost, ...sortPost];
    // newPost = newPost.slice(3 - featurePost.length, post.length);
    return {
      posts: newPost,
      featurePost: newFeaturePost,
    };
  } else if (post.length < 5 && featurePost.length < 3) {
    return {
      posts: newPost,
      featurePost: [],
    };
  } else
    return {
      posts: newPost,
      featurePost: newFeaturePost,
    };
};
