import { FC, memo } from 'react';
import Modal from 'react-modal';

import { observer } from 'mobx-react-lite';

import cn from 'classnames';

import { CloseIcon } from 'components/Icons';

import { useWalletConnectorContext } from 'services';
import { chainsEnum } from 'types';

import { wallets } from './WalletModal.mock';

import s from './WalletModal.module.scss';

interface WalletModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const WalletModal: FC<WalletModalProps> = observer(({ isOpen, closeModal }) => {
  const { connect } = useWalletConnectorContext();

  const connectToWallet = (providerName: 'MetaMask' | 'WalletConnect' | string) => {
    connect(chainsEnum.Ethereum, providerName).then(() => closeModal());
  };

  const showList = (
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
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      closeTimeoutMS={350}
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
});

export default memo(WalletModal);
