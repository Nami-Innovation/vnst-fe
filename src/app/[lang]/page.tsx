/* eslint-disable react-hooks/rules-of-hooks */
import { BASE_URL } from '@/utils/constants';
import HomePage from '@/components/home';
import { useTranslation } from '@/i18n';
import axios from '@/utils/axios.base';
import { Metadata } from 'next';

type Props = {
  params: { lang: string };
};

export const generateMetadata = async ({
  params: { lang },
}: Props): Promise<Metadata> => {
  const { t } = await useTranslation(lang, 'homepage');

  return {
    // title: t("title"),
    description: t('description'),
    alternates: {
      canonical: `${BASE_URL}/${lang}`,
      languages: {
        en: '/en',
        vi: '/vi',
      },
    },
  };
};

export const revalidate = 60;
const getStats = async () => {
  const res = await axios.get('/stats');
  return res.data;
};

export default async function Home({ params: { lang } }: Props) {
  const dataStats = await getStats();
  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <HomePage lang={lang} dataStats={dataStats} />
    </main>
  );
}
