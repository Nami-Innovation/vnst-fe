import React from 'react';
import clsx from 'clsx';
import Button from '../Button';
import ChevronLeft from '../Icons/ChevronLeft';
import ChevronRight from '../Icons/ChevronRight';
// import { Arrow, IconArrowDouble } from 'components/atoms/Icons';

type Props = {
  currentPage: number;
  className?: string;
  onChangePage: (page: number) => void;
  total: number;
  size: number;
  maxShowItem?: number;
  hasArrowBtn?: boolean;
  classArrow?: string;
  classButton?: string;
};

const Pagination = ({
  currentPage,
  className,
  classArrow,
  onChangePage,
  total,
  size,
  hasArrowBtn = false,
  maxShowItem = 5,
  classButton,
}: Props) => {
  const { totalPages, startPage, endPage, pages } = GetPager(
    total,
    currentPage,
    size,
    maxShowItem
  );
  if (totalPages <= 1) return null;

  return (
    <div
      className={clsx(
        'flex items-center justify-center gap-x-2',
        { 'pointer-events-none opacity-0': totalPages <= 1 },
        className
      )}
    >
      {hasArrowBtn && (
        <Button
          variant={'secondary'}
          size='sm'
          className={clsx('!px-1.5 ', classArrow, {
            'border-dark-2 disabled:border disabled:bg-dark-1 disabled:text-dark-3 disabled:opacity-60':
              !classArrow,
          })}
          disabled={currentPage === 1}
          onClick={() => onChangePage(currentPage - 1)}
        >
          <ChevronLeft width={20} height={20} />
        </Button>
      )}

      {startPage > 1 && (
        <>
          <Button
            variant={currentPage === 1 ? 'primary' : 'secondary'}
            size='sm'
            className={clsx('!px-3', classButton)}
            onClick={() => onChangePage(1)}
          >
            1
          </Button>
          {startPage > 2 && <div>...</div>}
        </>
      )}
      {pages.map((page, index) => {
        const isSelected = currentPage === page;
        return (
          <Button
            key={index}
            variant={isSelected ? 'primary' : 'secondary'}
            size='sm'
            className={clsx('!px-3', classButton)}
            onClick={() => onChangePage(page)}
          >
            {page}
          </Button>
        );
      })}
      {endPage < totalPages - 1 && <div>...</div>}
      {endPage < totalPages && (
        <>
          <Button
            variant={currentPage === totalPages ? 'primary' : 'secondary'}
            size='sm'
            className={clsx('!px-3', classButton)}
            onClick={() => onChangePage(totalPages)}
          >
            {totalPages}
          </Button>
        </>
      )}
      {hasArrowBtn && (
        <Button
          variant={'secondary'}
          size='sm'
          className={clsx('!px-1.5 ', classArrow, {
            'border-dark-2 disabled:border disabled:bg-dark-1 disabled:text-dark-3 disabled:opacity-60':
              !classArrow,
          })}
          disabled={currentPage === totalPages}
          onClick={() => onChangePage(currentPage + 1)}
        >
          <ChevronRight width={20} height={20} />
        </Button>
      )}
    </div>
  );
};

function GetPager(
  totalItems: number,
  currentPage: number,
  pageSize: number,
  paginationSize: number
) {
  const distance = Math.floor(paginationSize / 2);
  currentPage = currentPage || 1;

  const totalPages = Math.ceil(totalItems / pageSize);

  let startPage, endPage;

  if (totalPages <= paginationSize) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= Math.ceil(paginationSize / 2)) {
      startPage = 1;
      endPage = paginationSize;
    } else if (currentPage + distance >= totalPages) {
      startPage = totalPages - (paginationSize - 1);
      endPage = totalPages;
    } else {
      startPage = currentPage - distance;
      endPage = currentPage + distance;
    }
  }

  let pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return {
    totalPages,
    startPage,
    endPage,
    pages,
  };
}

export default React.memo(Pagination);
