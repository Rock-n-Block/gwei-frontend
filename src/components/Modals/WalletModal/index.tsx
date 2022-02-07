import { FC, memo } from 'react';
import Modal from 'react-modal';

import { observer } from 'mobx-react-lite';
import { useMst } from 'store';

import cn from 'classnames';

import { CloseIcon } from 'components/Icons';

import { useWalletConnectorContext } from 'services';
import { chainsEnum } from 'types';

import { wallets } from './WalletModal.mock';

import s from './WalletModal.module.scss';

const WalletModal: FC = observer(() => {
  const { modals } = useMst();
  const { connect } = useWalletConnectorContext();

  const closeModal = () => {
    modals.wallet.close();
  };

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
      isOpen={modals.wallet.isOpen}
      onRequestClose={closeModal}
      closeTimeoutMS={350}
      className={s.modal_wallet}
      overlayClassName="overlay"
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
