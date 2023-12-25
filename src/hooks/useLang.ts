import { fallbackLng } from '@/i18n/settings';
import { useParams } from 'next/navigation';

const useLang = () => {
  const { lang } = useParams();

  return (lang as string) || fallbackLng;
};

export default useLang;
