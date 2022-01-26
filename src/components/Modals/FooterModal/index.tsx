import { FC, memo } from 'react';
import Modal from 'react-modal';
import s from './FooterModal.module.scss';
import { CloseIcon } from 'components/Icons';
import cn from 'classnames';

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
      overlayClassName={s.overlay}
      contentLabel="Example Modal"
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
