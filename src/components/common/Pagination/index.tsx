import React from 'react';
import clsx from 'clsx';
import Button from '../Button';
import ChevronLeft from '../Icons/ChevronLeft';
import ChevronRight from '../Icons/ChevronRight';
import ButtonPagination from './ButtonPagination';
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
        'flex items-center justify-center gap-x-3',
        { 'pointer-events-none opacity-0': totalPages <= 1 },
        className
      )}
    >
      {hasArrowBtn && (
        <ButtonPagination
          variant={'inactive'}
          size='lg'
          className={clsx('!px-1.5 ', classArrow, {
            'disabled:border disabled:border-gray-200 disabled:bg-white disabled:text-gray disabled:opacity-30':
              !classArrow,
          })}
          disabled={currentPage === 1}
          onClick={() => onChangePage(currentPage - 1)}
        >
          <ChevronLeft width={20} height={20} />
        </ButtonPagination>
      )}

      {startPage > 1 && (
        <>
          <ButtonPagination
            variant={currentPage === 1 ? 'active' : 'inactive'}
            size='lg'
            className={clsx('!px-2.5', classButton)}
            onClick={() => onChangePage(1)}
          >
            1
          </ButtonPagination>
          {startPage > 2 && (
            <ButtonPagination variant='inactive' size={'lg'}>
              ...
            </ButtonPagination>
          )}
        </>
      )}
      {pages.map((page, index) => {
        const isSelected = currentPage === page;
        return (
          <ButtonPagination
            key={index}
            variant={isSelected ? 'active' : 'inactive'}
            size='lg'
            className={clsx('!px-2.5', classButton)}
            onClick={() => onChangePage(page)}
          >
            {page}
          </ButtonPagination>
        );
      })}
      {endPage < totalPages - 1 && (
        <ButtonPagination variant='inactive' size={'lg'}>
          ...
        </ButtonPagination>
      )}
      {endPage < totalPages && (
        <>
          <ButtonPagination
            variant={currentPage === totalPages ? 'active' : 'inactive'}
            size='lg'
            className={clsx('!px-2.5', classButton)}
            onClick={() => onChangePage(totalPages)}
          >
            {totalPages}
          </ButtonPagination>
        </>
      )}
      {hasArrowBtn && (
        <ButtonPagination
          variant={'inactive'}
          size='lg'
          className={clsx('!px-1.5 ', classArrow, {
            'disabled:border disabled:border-gray-200 disabled:bg-white disabled:text-gray disabled:opacity-30':
              !classArrow,
          })}
          disabled={currentPage === totalPages}
          onClick={() => onChangePage(currentPage + 1)}
        >
          <ChevronRight width={20} height={20} />
        </ButtonPagination>
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
