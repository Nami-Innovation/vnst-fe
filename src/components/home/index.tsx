/* eslint-disable react-hooks/rules-of-hooks */

import React from 'react';
import Banner from './Banner';
import Content from './Content';
import BannerRoadMap from './BannerRoadMap';
import { useTranslation } from '@/i18n';
import VolumeContent from './VolumeContent';
import '../../styles/home.scss';
type TProps = {
  lang: string;
  dataStats: any;
};
const HomePage = async ({ lang, dataStats }: TProps) => {
  const { t } = await useTranslation(lang, 'homepage');
  return (
    <>
      <div className='flex h-max w-full flex-col items-center justify-start border-none bg-grayBackground'>
        <Banner lang={lang} dataStats={dataStats} />
        <Content lang={lang} />
        <div className='mt-24 block w-full'>
          <BannerRoadMap
            title={t('title_map')}
            content={t('content_map')}
            titleRoadmap={t('title_road_map')}
            totalVNST={dataStats.totalVNST}
            totalUSDT={dataStats.totalUSDT}
            operationPool={dataStats.operationPool}
            operationPoolTitle={t('operation_pool')}
          />
        </div>
        <div className='block w-full'>
          <VolumeContent />
        </div>
      </div>
    </>
  );
};
export default HomePage;
