import colors from '@/colors';
import { useIsTablet } from '@/hooks/useMediaQuery';
import Image from 'next/image';

const LogoIcons = () => {
  const isMobile = useIsTablet();
  if (isMobile !== null && isMobile)
    return (
      <div className='h-[36px] w-[47px]'>
        <Image
          src='/assets/images/logo_short.png'
          width={47}
          height={36}
          alt='Logo Short'
          className='h-full w-full'
        />
      </div>
    );
  return (
    <Image
      src='/assets/images/logo_full.png'
      width={130}
      height={36}
      alt='Logo Short'
      className='h-[36px] w-[130px]'
    />
  );
};

export default LogoIcons;
