'use client';

import { Social_Icon } from '@/components/common/Icons/SocialIcon';
import { useTranslationClient } from '@/i18n/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BASE_URL } from '@/utils/constants';

type SharePlatform = 'facebook' | 'linkedIn' | 'twitter' | 'reddit';

const shareSocials: Record<
  SharePlatform,
  { url: string; children: JSX.Element }
> = {
  facebook: {
    url: 'https://www.facebook.com/sharer/sharer.php?u',
    children: <Social_Icon.Facebook width={32} height={32} />,
  },
  linkedIn: {
    url: 'https://www.linkedin.com/shareArticle?mini=true&url',
    children: <Social_Icon.Linkedin width={32} height={32} />,
  },
  twitter: {
    url: 'https://twitter.com/intent/tweet?url',
    children: <Social_Icon.Twitter width={32} height={32} />,
  },
  reddit: {
    url: 'https://www.reddit.com/submit?url',
    children: <Social_Icon.Reddit width={32} height={32} />,
  },
};

export default function BlogDetailShare() {
  const { t } = useTranslationClient('blogs');
  const pathname = usePathname();
  const blogURL = `${BASE_URL}${pathname}`;

  const handleShare = (shareURLSocial: string) => {
    const shareURL = `${shareURLSocial}=${encodeURIComponent(blogURL)}`;
    return shareURL;
  };

  return (
    <div className='mt-3 flex w-full items-center justify-between md:mt-6'>
      <h3 className='font-sf-pro-expanded text-xl font-bold leading-6 text-black'>
        {t('share_post')}
      </h3>

      <div className='flex items-center gap-x-1 text-dark-2'>
        {Object.keys(shareSocials).map((social) => {
          const platform = social as SharePlatform;
          return (
            <Link
              key={social}
              className='text-primary-dark hover:text-primary'
              href={handleShare(shareSocials[platform]?.url)}
              target='_blank'
            >
              {shareSocials[platform]?.children}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
