/* eslint-disable react-hooks/rules-of-hooks */

import { useTranslation } from '@/i18n';
import React from 'react';
import ContentItem from './ContentItem';

type TProps = {
  lang: string;
};
const contents = [
  {
    imageInfo: {
      src: '/assets/images/home_content_1.png',
      alt: 'default image',
    },
    title: 'title_content_1',
    content: 'content_1',
    btnTitle: 'btn_content_1',
  },
  {
    imageInfo: {
      src: '/assets/images/home_content_2.png',
      alt: 'default image',
    },
    title: 'title_content_2',
    content: 'content_2',
    btnTitle: 'btn_content_2',
  },
  {
    imageInfo: {
      src: '/assets/images/home_content_3.png',
      alt: 'default image',
    },
    title: 'title_content_3',
    content: 'content_3',
    btnTitle: 'btn_content_3',
  },
];

const Content = async ({ lang }: TProps) => {
  const { t } = await useTranslation(lang, 'homepage');

  return (
    <div className='flex max-w-screen-xl flex-col items-center gap-[60px] border-none px-4 pb-10 lg:mt-0 xl:w-full'>
      <div className='mb-20 flex flex-col items-center justify-center gap-y-2 text-center'>
        <p
          className='text-gradient-1 font-sf-pro-expanded text-mb-large font-bold uppercase leading-9 lg:text-large lg:leading-[60px]'
          dangerouslySetInnerHTML={{ __html: t('content_title') }}
        ></p>
      </div>
      <div className='grid w-full max-w-screen-xl grid-cols-1 grid-rows-3 items-center justify-center gap-y-[120px] lg:grid-cols-3 lg:grid-rows-1 lg:gap-x-[30px]'>
        {contents.map((item, index) => (
          <div key={index} className='h-full w-full'>
            <ContentItem
              title={t(item.title)}
              content={t(item.content)}
              imageInfo={{
                imgSrc: item.imageInfo.src,
                alt: item.imageInfo.alt,
              }}
              btnTitle={t(item.btnTitle)}
              index={index}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Content;
