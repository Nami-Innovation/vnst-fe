import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { usePopper } from 'react-popper';
import clsx from 'clsx';
import { Placement } from '@popperjs/core';
import ChevronBottomTriangle from '../Icons/ChevronBottomTriangle';
import React from 'react';

type Props = {
  referenceElement: HTMLElement | null;
  className?: string;
  children?: React.ReactNode;
  placement?: Placement;
  showArrow?: boolean;
  handleClose?: () => void;
  setIsOpenRef?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Popup = forwardRef(
  (
    {
      referenceElement,
      children,
      className,
      placement = 'bottom',
      showArrow = false,
      handleClose = () => {},
      setIsOpenRef,
    }: Props,
    ref
  ) => {
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
      null
    );
    const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(
      null
    );
    const customModifier = React.useMemo(
      () => ({
        name: 'arrow',
        options: { element: arrowElement },
      }),
      [arrowElement]
    );
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
      modifiers: [customModifier],
      placement,
    });

    const toggle = (bool?: boolean) => {
      if (setIsOpenRef) {
        setIsOpenRef((isOpen) => (bool !== undefined ? bool : !isOpen));
      }
      setIsOpen((isOpen) => (bool !== undefined ? bool : !isOpen));
    };

    useImperativeHandle(
      ref,
      () => {
        return {
          toggle,
        };
      },
      []
    );

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      if (!isOpen || !popperElement || !referenceElement) return;

      function handleClickOutside(event: any) {
        if (
          !popperElement?.contains(event.target) &&
          !referenceElement?.contains(event.target)
        ) {
          if (setIsOpenRef) {
            setIsOpenRef(false);
          }
          setIsOpen(false);
          handleClose();
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [popperElement, isOpen]);

    useEffect(() => {
      if (!referenceElement) return;
      const toggleOpen = () => {
        if (setIsOpenRef) {
          setIsOpenRef((isOpenRef) => !isOpenRef);
        }
        setIsOpen((isOpen) => !isOpen);
      };
      referenceElement.addEventListener('mousedown', toggleOpen);
      return () => {
        referenceElement.removeEventListener('mousedown', toggleOpen);
      };
    }, [referenceElement]);
    if (!isOpen) return null;

    return (
      <div
        ref={setPopperElement}
        style={styles.popper}
        className={clsx(
          'z-10 animate-fade rounded-md border border-gray-200 bg-white shadow-lg animate-duration-200 animate-once animate-ease-linear',
          className
        )}
        {...attributes.popper}
      >
        {children}
        {showArrow ? (
          <div
            ref={setArrowElement}
            style={styles.arrow}
            className='-top-2 select-none text-white'
          >
            <ChevronBottomTriangle className='h-4 w-4 rotate-180' />
          </div>
        ) : null}
      </div>
    );
  }
);

export default Popup;
