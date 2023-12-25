import React, { PropsWithChildren, useEffect } from 'react';

import clsx from 'clsx';

interface IDrawer {
  isOpen: boolean;
  className?: string;
  classParent?: string;
}

const Drawer: React.FC<PropsWithChildren<IDrawer>> = ({
  isOpen,
  children,
  className,
  classParent,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div
      className={clsx(
        'fixed top-0 z-[2] h-full w-full overflow-y-auto bg-black pt-[60px] transition-all duration-300 ease-in-out',
        {
          '-right-full opacity-0': !isOpen,
          'right-0 opacity-100': isOpen,
        },
        classParent
      )}
    >
      <div className={clsx('border-t-[2px] border-dark-1', className)}>
        {children}
      </div>
    </div>
  );
};

export default Drawer;
