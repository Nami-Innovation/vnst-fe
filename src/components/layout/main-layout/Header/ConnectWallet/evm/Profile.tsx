import ChevronBottomTriangle from '@/components/common/Icons/ChevronBottomTriangle';
import React, { useRef, useState, useMemo } from 'react';
import ShortAddress from './ShortAddress';
import Popup from '@/components/common/Popup';
import Balances from './Balances';
import useDisconnectWallet from '@/hooks/useDisconnectWallet';
import DisconnectIcon from '@/components/common/Icons/DisconnectIcon';
import { useIsTablet } from '@/hooks/useMediaQuery';
import Drawer from '@/components/common/Modal/Drawer';

type Props = {};

const Profile = ({}: Props) => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);

  const popupRef = useRef<any>();
  const [isOpenRef, setIsOpenRef] = useState<boolean>(false);
  const disconnect = useDisconnectWallet();
  const isTablet = useIsTablet();

  const content = useMemo(() => {
    return (
      <>
        <ShortAddress
          afterIcon={
            <button
              className='mt-1 text-gray hover:text-primary'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                disconnect();
              }}
            >
              <DisconnectIcon />
            </button>
          }
          bgClassName='bg-white'
          isPopup={true}
        />
        <Balances itemClassname='bg-black' />
      </>
    );
  }, []);

  if (isTablet)
    return (
      <Drawer
        trigger={
          <img
            src='/assets/images/avatar.png'
            className='relative h-6 w-6'
            alt='avatar'
          />
        }
        closeClassName='hidden'
      >
        {content}
      </Drawer>
    );
  return (
    <>
      <ShortAddress
        afterIcon={<ChevronBottomTriangle />}
        buttonProps={{
          ref: setReferenceElement,
        }}
        isOpen={isOpenRef}
      />

      <Popup
        ref={popupRef}
        referenceElement={referenceElement}
        className='mt-6 w-72 p-3'
        setIsOpenRef={setIsOpenRef}
      >
        {content}
      </Popup>
    </>
  );
};

export default Profile;
