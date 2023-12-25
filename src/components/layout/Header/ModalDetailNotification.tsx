import ModalStatus from "@/components/common/Modal/ModalStatus";
import { useTranslationClient } from "@/i18n/client";
import { NOTIFICATION_TYPE } from "./type";
import clsx from "clsx";
import { formatNumber } from "@/utils/format";
import TransferIcon from "@/components/common/Icons/TransferIcon";
import dayjs from "dayjs";
import ExternalIcon from "@/components/common/Icons/ExternalIcon";
import Link from "next/link";
import { getBscScanLink } from "@/utils/helper";

type TProps = {
  open: boolean;
  handleClose: () => void;
  title: string;
  infoNotification: NOTIFICATION_TYPE;
};

const ModalDetailNotification = ({
  open,
  handleClose,
  title,
  infoNotification,
}: TProps) => {
  const { t } = useTranslationClient(['mint_redeem', 'common']);
  return (
    <ModalStatus isOpen={open} onRequestClose={handleClose} title={title}>
      <div>
        <div className='flex w-full items-center justify-center'>
          <img
            src='/assets/icons/success_bubble.png'
            alt='Success Icon'
            className='h-[120px] w-[120px] object-cover'
          />
        </div>
        <div className='flex w-full flex-col space-y-1 text-center'>
          <p className='w-full font-semibold'>
            {t(
              infoNotification?.type === 'mint'
                ? 'common:success_mint'
                : 'common:success_redeem'
            )}
          </p>
          <p
            className={clsx('w-full font-sf-pro-expanded text-xl font-bold', {
              'text-vnst': infoNotification.type === 'mint',
              'text-primary': infoNotification.type !== 'mint',
            })}
          >
            {`${formatNumber(infoNotification.metadata.amountOut, 2)} ${
              infoNotification?.type === 'mint' ? 'VNST' : 'USDT'
            } `}
          </p>
          <p className='text-xs text-dark-4'>
            {`${formatNumber(infoNotification.metadata.amountIn, 2)} ${
              infoNotification?.type === 'mint' ? 'USDT' : 'VNST'
            }`}
          </p>
        </div>
        <div className="bg-black text-xs p-4 flex flex-col space-y-4 items-start mt-5 rounded-md">
          <div className="w-full flex items-center justify-between">
            <p className="text-dark-4 capitalize">{t("mint_redeem:price")}</p>
            <div className="flex items-center justify-end space-x-1">
              <span className="text-primary">1 USDT</span>
              <p className="text-dark-4">
                <TransferIcon />
              </p>
              <p className='text-vnst'>
                {infoNotification?.type === 'mint'
                  ? `${formatNumber(
                      infoNotification.metadata.amountOut /
                        infoNotification.metadata.amountIn,
                      2
                    )} VNST`
                  : `${formatNumber(
                      infoNotification.metadata.amountIn /
                        infoNotification.metadata?.amountOut,
                      2
                    )} VNST`}
              </p>
            </div>
          </div>
          <div className='flex w-full items-center justify-between'>
            <p className='text-dark-4'>{t('mint_redeem:confirm_modal:time')}</p>
            <div className='flex items-center justify-end space-x-1'>
              <p>
                {dayjs.unix(infoNotification.metadata?.timestamp as number)
                  .format("HH:mm:ss - DD/MM/YYYY")}
              </p>
              <Link
                href={getBscScanLink(infoNotification.metadata?.transactionHash as string)}
                target="_blank"
                className="text-white"
              >
                <ExternalIcon size="12.5" color="currentColor" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ModalStatus>
  );
};
export default ModalDetailNotification;
