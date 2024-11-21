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
    <div className='mt-20 flex max-w-screen-xl flex-col items-center gap-[50px] border-none px-4 lg:mt-[124px] lg:gap-[80px] lg:px-0 xl:w-full'>
      <div className='flex flex-col items-center justify-center gap-y-2 text-center'>
        <p
          className='font-sf-pro-expanded text-mb-large font-bold uppercase leading-9 text-primary lg:text-[50px] lg:leading-[54px]'
          dangerouslySetInnerHTML={{ __html: t('content_title') }}
        ></p>
      </div>
      <div className='grid w-full max-w-screen-xl grid-cols-1 grid-rows-3 items-center justify-center gap-y-[46px] lg:grid-cols-3 lg:grid-rows-1 lg:gap-x-[30px]'>
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
