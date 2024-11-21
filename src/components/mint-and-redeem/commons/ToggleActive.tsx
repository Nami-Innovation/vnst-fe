import ConvertIcon from '@/components/common/Icons/ConvertIcon';
import SwitchIcon from '@/components/common/Icons/SwitchIcon';
import { cn } from '@/utils/helper';

type ToggleActiveProps = {
  onToggle?: () => void;
  isTma?: boolean;
};
const ToggleActive = ({ onToggle, isTma }: ToggleActiveProps) => {
  return (
    <div
      className={cn(
        'my-2 flex w-full justify-center lg:my-2.5',
        isTma && 'my-1'
      )}
    >
      <div
        className={cn(
          'btn relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-300 text-gray',
          isTma && 'h-9 w-9'
        )}
        onClick={onToggle}
      >
        <ConvertIcon className='btn-swap w-4' />
        <SwitchIcon className='btn-switch' />
      </div>
    </div>
  );
};

export default ToggleActive;
