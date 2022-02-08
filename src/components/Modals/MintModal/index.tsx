import { FC, memo, useEffect, useState } from 'react';
import Modal from 'react-modal';

import { observer } from 'mobx-react-lite';
import { useMst } from 'store';

import cn from 'classnames';

import { CloseIcon } from 'components/Icons';
import { clog } from 'utils/logger';

import { Button, Input } from '../../index';

import { useWalletConnectorContext } from 'services';

import s from './MintModal.module.scss';

const MintModal: FC = observer(() => {
  const [isLoading, setLoading] = useState(false);
  const [addressInput, setAddressInput] = useState('');
  const [addressInputError, setAddressInputError] = useState('');
  const [tokenUriInput, setTokenUriInput] = useState('');
  const { modals, user } = useMst();
  const { walletService } = useWalletConnectorContext();

  const log = (...content: unknown[]) => clog('components/MintModal[debug]:', content);
  log('userAddress', addressInput);

  const closeModal = () => {
    modals.mint.close();
  };

  const handleMint = async () => {
    if (tokenUriInput && addressInput) {
      try {
        setLoading(true);
        await walletService.connectWallet
          .Contract('InvitationNFT')
          .methods.mint(tokenUriInput, addressInput)
          .send({ from: user.address });
        closeModal();
        modals.info.setMsg(
          'You have successfully minted Invitational NFT token to user',
          'success',
        );
        setLoading(false);
      } catch (e) {
        modals.info.setMsg('Something went wrong', 'error');
        log('handleMint', e);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (addressInput.slice(0, 2) !== '0x' || addressInput.length !== 42) {
      setAddressInputError('incorrect user address');
    } else if (addressInput.toLowerCase() === user.address.toLowerCase()) {
      setAddressInputError("you can't mint token to yourself");
    } else setAddressInputError('');
  }, [addressInput, user.address]);

  return (
    <Modal
      className={s.modal_mint}
      isOpen={modals.mint.isOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick
      overlayClassName="overlay"
      ariaHideApp={false}
    >
      <div className={s.modal_mint__close} onClick={closeModal}>
        <CloseIcon />
      </div>
      <div className={cn(s.modal_mint__title, 'text', 'sm')}>Mint Invitational NFT</div>
      <div className={s.block}>
        <div className={s.block__group}>
          <div>
            <label className={cn(s.label, 'text-descr')}>User address</label>
            <Input
              className={s.input}
              placeholder="0x..."
              value={addressInput}
              error={addressInputError}
              onChange={(e) => setAddressInput(e.target.value)}
            />
          </div>
        </div>
        <div className={s.block__group}>
          <div>
            <label className={cn(s.label, 'text-descr')}>Token URI</label>
            <Input
              className={s.input}
              placeholder="Set your token URI"
              value={tokenUriInput}
              onChange={(e) => setTokenUriInput(e.target.value)}
            />
          </div>
        </div>
        <Button
          className={s.button}
          color="filled"
          disabled={!addressInput || !tokenUriInput || !!addressInputError}
          onClick={handleMint}
        >
          {isLoading ? 'In progress...' : 'Mint'}
        </Button>
      </div>
    </Modal>
  );
});

export default memo(MintModal);
