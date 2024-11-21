import React from 'react';
import { useParams } from 'next/navigation';
import { memo } from 'react';
import clsx from 'clsx';

const Fader = ({ text }: { text: string }) => {
  const { lang } = useParams();
  return text.split(' ').map((item, index) => (
    <React.Fragment key={item}>
      <span
        className={clsx(
          'mr-2 !text-[32px] !leading-8 text-secondary-darkest lg:mr-3 lg:!text-[70px] lg:!leading-[70px]',
          {
            // 'after:float-right after:mb-1 after:mt-[-10px] after:h-1.5 after:w-[calc(100%-20px)] after:rounded-[3px] after:bg-blueUnder after:text-blueUnder lg:after:mt-[-16px]':
            //   item === 'Backed' || item === 'by' || item === "Stability",
            'mt-3':
              (lang === 'vi' && index > 3) ||
              (lang === 'en' && index > 1 && item !== 'Trust'),
            '!mr-0': lang === 'en' && item === 'Transactions',
          }
        )}
      >
        {item}
      </span>
      {lang === 'vi' ? (
        index === 3 && <br />
      ) : item === 'Trust' || item === 'Solution' || item == 'Transactions' ? (
        <br />
      ) : null}
    </React.Fragment>
  ));
};

export default memo(Fader);
