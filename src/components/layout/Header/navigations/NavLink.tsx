import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

type Props = {
  active?: boolean;
  className?: string;
  href: string;
  children?: React.ReactNode;
  isTarget?: boolean;
};

const NavLink = ({ active, className, href, children, isTarget }: Props) => {
  return (
    <Link
      href={href}
      className={clsx(
        'text-sm font-semibold hover:text-primary md:text-base',
        active && 'text-primary',
        className
      )}
      target={isTarget === true ? '_blank' : undefined}
    >
      {children}
    </Link>
  );
};

export default NavLink;
