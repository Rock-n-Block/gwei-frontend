import { FC, memo } from 'react';
import Modal from 'react-modal';

import cn from 'classnames';

import { CloseIcon } from 'components/Icons';

import s from './FooterModal.module.scss';

interface FooterModalProps {
  title: JSX.Element;
  children: JSX.Element;
  isOpen: boolean;
  handleClose: () => void;
}

const FooterModal: FC<FooterModalProps> = ({ title, children, isOpen, handleClose }) => {
  return (
    <Modal
      onRequestClose={handleClose}
      closeTimeoutMS={350}
      isOpen={isOpen}
      className={cn(s.modal, s.modal_open)}
      overlayClassName="overlay"
      contentLabel="Example Modals"
      ariaHideApp={false}
    >
      <div className={s.modal_title}>
        <div onClick={handleClose} className={s.modal_close}>
          <CloseIcon />
        </div>
        {title}
      </div>

      {children}
    </Modal>
  );
};

export default memo(FooterModal);
