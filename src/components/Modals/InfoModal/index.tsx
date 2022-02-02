import { FC, memo } from 'react';
import Modal from 'react-modal';

import { useMst } from '../../../store';
import { observer } from 'mobx-react-lite';

import Button from 'components/Button';
import { CloseIcon, SuccessIcon } from 'components/Icons';

import s from './InfoModal.module.scss';

const InfoModal: FC = observer(() => {
  const { modals } = useMst();

  const closeModal = () => {
    modals.info.close();
  };

  return (
    <Modal
      isOpen={!!modals.info.msg}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick
      closeTimeoutMS={350}
      className={s.modal}
      overlayClassName={s.overlay}
      contentLabel="Example Modals"
      ariaHideApp={false}
    >
      <div onClick={closeModal} className={s.modal__close}>
        <CloseIcon />
      </div>
      <div className={s.modal__inner}>
        {modals.info.status === 'success' ? <SuccessIcon /> : ''}
        <div>{modals.info.msg}</div>
        <Button onClick={closeModal} color="filled">
          {modals.info.status === 'success' ? 'GOT IT' : 'OK'}
        </Button>
      </div>
    </Modal>
  );
});

export default memo(InfoModal);
