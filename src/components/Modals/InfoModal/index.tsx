import { FC, memo, useMemo } from 'react';
import Modal from 'react-modal';

import { observer } from 'mobx-react-lite';

import Button from 'components/Button';
import { CloseIcon, SuccessIcon } from 'components/Icons';

import s from './InfoModal.module.scss';

interface WalletModalProps {
  isOpen: boolean;
  closeModal: () => void;
  text: string;
  status: string;
}

const InfoModal: FC<WalletModalProps> = observer(({ isOpen, closeModal, text, status }) => {
  const icon = useMemo(() => {
    return status === 'success' ? <SuccessIcon /> : '';
  }, [status]);
  const button = useMemo(
    () => (
      <Button onClick={closeModal} color="filled">
        {status === 'success' ? 'GOT IT' : 'OK'}
      </Button>
    ),
    [status, closeModal],
  );
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      closeTimeoutMS={350}
      className={s.modal}
      overlayClassName={s.overlay}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div onClick={closeModal} className={s.modal__close}>
        <CloseIcon />
      </div>

      <div className={s.modal__inner}>
        {icon}
        <div>{text}</div>
        {button}
      </div>
    </Modal>
  );
});

export default memo(InfoModal);
