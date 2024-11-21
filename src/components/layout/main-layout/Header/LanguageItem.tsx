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
        'cursor-pointer overflow-hidden px-4 font-semibold text-gray hover:bg-primary-light hover:text-primary-dark lg:px-0',
        className,
        active && 'bg-transparent text-primary hover:bg-primary-light'
      )}
      onClick={onClick}
    >
      <div className='bg-transparent p-2'>
        <div
          className={clsx(
            active && 'text-primary ',
            'flex flex-nowrap items-center justify-between text-xs'
          )}
        >
          <p>{title}</p>
          <Image
            src={`/assets/images/lang/${lang}.png`}
            width={20}
            height={20}
            alt={title}
          />
        </div>
      </div>
    </div>
  );
};

export default LanguageItem;
