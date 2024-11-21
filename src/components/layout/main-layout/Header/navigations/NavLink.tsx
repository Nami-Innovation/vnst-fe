import { cn } from '@/utils/helper';
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
      className={cn(
        'border-y-[3px] border-transparent text-sm font-semibold hover:text-primary md:text-base',
        active ? 'border-b-primary text-primary' : 'text-dark-4',
        className
      )}
      target={isTarget === true ? '_blank' : undefined}
    >
      {children}
    </Link>
  );
};

export default NavLink;
