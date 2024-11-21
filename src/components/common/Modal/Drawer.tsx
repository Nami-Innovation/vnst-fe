import { useIsTablet } from '@/hooks/useMediaQuery';
import CancelIcons from '../Icons/CancleIcons';
import {
  DrawerContext,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
  DrawerHeader,
  DialogProps,
} from './ui';
import { cn } from '@/utils/helper';

interface TProps extends DialogProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  title?: React.ReactNode;
  closeClassName?: string;
  contentClassName?: string;
}

const Drawer = ({
  trigger,
  children,
  footer,
  title,
  contentClassName,
  ...rest
}: TProps) => {
  const isTablet = useIsTablet();
  return (
    <DrawerContext {...rest}>
      <DrawerTrigger asChild={isTablet as boolean}>
        <div>{trigger}</div>
      </DrawerTrigger>
      <DrawerContent
        className={cn('bg-white px-4 pb-8 pt-6', contentClassName)}
      >
        <DrawerClose
          className={cn(
            'flex w-full flex-row-reverse text-gray hover:text-primary',
            !title && 'pb-4 lg:pb-0',
            rest?.closeClassName
          )}
        >
          <CancelIcons className='h-5 w-5' />
        </DrawerClose>
        {!!title ? <DrawerHeader>{title}</DrawerHeader> : null}
        {children}
        {!!footer ? <DrawerFooter>{footer}</DrawerFooter> : null}
      </DrawerContent>
    </DrawerContext>
  );
};
export default Drawer;
