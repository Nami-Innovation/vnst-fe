import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { usePopper } from 'react-popper';
import clsx from 'clsx';
import { Placement } from '@popperjs/core';
import ChevronBottomTriangle from '../Icons/ChevronBottomTriangle';

type Props = {
  className?: string;
  popperClassname?: string;
  children?: React.ReactNode;
  placement?: Placement;
  content?: React.ReactNode;
  disabled?: boolean;
  showArrow?: boolean;
};

const Tooltip = forwardRef(
  (
    {
      children,
      content,
      className,
      placement = 'bottom',
      popperClassname,
      disabled,
      showArrow = true,
    }: Props,
    ref
  ) => {
    const [referenceElement, setReferenceElement] =
      useState<HTMLSpanElement | null>(null);

    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
      null
    );
    const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(
      null
    );
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
      modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
      placement,
    });

    const toggle = (bool?: boolean) =>
      setIsOpen((isOpen) => (bool !== undefined ? bool : !isOpen));

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

    // useEffect(() => {
    //   if (!isOpen || !popperElement || !referenceElement) return;

    //   function handleClickOutside(event: any) {
    //     if (
    //       !popperElement?.contains(event.target) &&
    //       !referenceElement?.contains(event.target)
    //     ) {
    //       setIsOpen(false);
    //     }
    //   }
    //   document.addEventListener("mousedown", handleClickOutside);
    //   return () => {
    //     // Unbind the event listener on clean up
    //     document.removeEventListener("mousedown", handleClickOutside);
    //   };
    // }, [popperElement, isOpen]);

    useEffect(() => {
      if (!referenceElement) return;
      const open = () => {
        if (!disabled) setIsOpen(true);
      };
      const close = (event: any) => {
        if (!popperElement?.contains(event.target)) {
          setIsOpen(false);
        }
      };
      referenceElement.addEventListener('mouseover', open);
      referenceElement.addEventListener('mouseleave', close);
      return () => {
        referenceElement.removeEventListener('mouseover', open);
        referenceElement.removeEventListener('mouseleave', close);
      };
    }, [referenceElement, disabled]);

    return (
      <>
        <span
          ref={setReferenceElement}
          className={clsx('group cursor-pointer', className)}
        >
          {children}
        </span>
        {isOpen && (
          <div
            ref={setPopperElement}
            style={styles.popper}
            className={clsx(
              'z-10 mt-2.5 max-w-xs animate-fade rounded-md bg-primary-dark p-3 text-xs text-white animate-duration-200 animate-once animate-ease-linear',
              popperClassname
            )}
            {...attributes.popper}
          >
            {content}
            {showArrow ? (
              <div
                ref={setArrowElement}
                style={styles.arrow}
                className='-top-2 select-none text-primary-dark'
              >
                <ChevronBottomTriangle className='h-4 w-4 rotate-180' />
              </div>
            ) : null}
          </div>
        )}
      </>
    );
  }
);

export default Tooltip;
