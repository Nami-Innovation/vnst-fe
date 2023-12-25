import clsx from 'clsx';
import Image from 'next/image';

const LanguageItem = ({
  title,
  active = false,
  className,
  onClick,
  lang,
}: {
  title: string;
  active?: boolean;
  className?: string;
  onClick?: () => void;
  lang: string;
}) => {
  return (
    <div
      className={clsx(
        'hover:bg-black-border-gradient cursor-pointer overflow-hidden rounded-[5px] border border-transparent font-semibold',
        className
      )}
      onClick={onClick}
    >
      <div className='bg-dark-1 p-2'>
        <div
          className={clsx(
            active && 'text-gradient',
            'flex flex-nowrap items-center justify-between'
          )}
        >
          <p>{title}</p>
          {lang === 'vi' ? (
            <Image
              src={`/assets/images/lang/vi.svg`}
              width={20}
              height={20}
              alt='Language image'
            />
          ) : (
            <Image
              src={`/assets/images/lang/en.svg`}
              width={20}
              height={20}
              alt='Language image'
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LanguageItem;
