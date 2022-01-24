import { FC, memo, useCallback, useEffect, useMemo } from 'react';
import Modal from 'react-modal';

import cn from 'classnames';

import { CloseIcon } from 'components/Icons';
import { wallets } from './WalletModal.mock';

import s from './WalletModal.module.scss';
import { useWalletConnectorContext } from 'services';
import { chainsEnum } from 'types';
import { useMst } from '../../../store';

interface WalletModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const WalletModal: FC<WalletModalProps> = ({ isOpen, closeModal }) => {
  const { connect } = useWalletConnectorContext();
  const { user } = useMst();

  const connectToWallet = useCallback(
    (providerName) => {
      if (providerName === 'MetaMask') {
        connect(chainsEnum.Ethereum, providerName).then(() => closeModal());
      }
      if (providerName === 'WalletConnect') {
        connect(chainsEnum.Ethereum, providerName).catch();
        closeModal();
        user.setAddress(json?.accounts[0]);
      }
    },
    [connect],
  );

  //@ts-ignore
  const json = JSON.parse(localStorage.getItem('walletconnect'));

  useEffect(() => {
    user.setAddress(json?.accounts[0]);
  }, [json]);

  const showList = useMemo(
    () => (
      <>
        {wallets.map(({ icon, title }, index) => (
          <div
            onClick={() => connectToWallet(title)}
            key={`${title}_${index}`}
            className={s.modal_wallet__item}
          >
            <div className={s.modal_wallet__item_name}>{title}</div>
            <div className={s.modal_wallet__item_logo}>{icon}</div>
          </div>
        ))}
      </>
    ),
    [],
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className={s.modal_wallet}
      overlayClassName={s.overlay}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div onClick={closeModal} className={s.modal_wallet__close}>
        <CloseIcon />
      </div>
      <div className={cn(s.modal_wallet__title, 'text', 'sm')}>Select a wallet</div>

      <div className={s.modal_wallet__list}>{showList}</div>

      <div className={s.modal_wallet__footer}>
        <div className={s.modal_wallet__new}>New to Ethereum?</div>
        <a href="/" className={s.modal_wallet__learn}>
          Learn more about wallets
        </a>
      </div>
    </Modal>
  );
};

export default memo(WalletModal);
