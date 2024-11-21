const ExternalIcon = ({
  size,
  color,
  className,
}: {
  size?: string;
  color?: string;
  className?: string;
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size || '20'}
      height={size || '20'}
      viewBox='0 0 20 20'
      fill='none'
      className={className}
    >
      <path
        d='M8 4.8H6.56c-.896 0-1.344 0-1.687.174a1.6 1.6 0 0 0-.699.7C4 6.015 4 6.463 4 7.36v6.08c0 .896 0 1.344.174 1.686a1.6 1.6 0 0 0 .7.7c.341.174.79.174 1.684.174h6.085c.894 0 1.341 0 1.683-.174.301-.154.546-.399.7-.7.174-.342.174-.79.174-1.683V12m.8-4V4m0 0h-4m4 0-5.6 5.6'
        stroke={color || '#888'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ExternalIcon;
