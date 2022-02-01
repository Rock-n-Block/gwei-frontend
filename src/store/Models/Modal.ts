import { types } from 'mobx-state-tree';

const Modal = types
  .model({
    status: types.string,
    isOpen: types.boolean,
  })
  .actions((self) => ({
    setStatus: (status: string) => {
      self.status = status;
    },
    setIsOpen: () => {
      self.isOpen = !self.isOpen;
    },
  }));

export default Modal;
