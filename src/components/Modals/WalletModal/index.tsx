import { FC, memo, useMemo } from 'react';
import Modal from 'react-modal';

import cn from 'classnames';

import { CloseIcon } from '../../Icons';
import { wallets } from './WalletModal.mock';

import s from './WalletModal.module.scss';

interface WalletModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const WalletModal: FC<WalletModalProps> = ({ isOpen, closeModal }) => {
  const showList = useMemo(
    () => (
      <>
        {wallets.map(({ icon, title }, index) => (
          <div key={`${title}_${index}`} className={s.modal_wallet__item}>
            <div className={s.modal_wallet__item_name}>{title}</div>
            <div className={s.modal_wallet__item_logo}>{icon}</div>
          </div>
        ))}
      </>
    ),
    [],
  );

  return (
    <div>
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
    </div>
  );
};

export default memo(WalletModal);
