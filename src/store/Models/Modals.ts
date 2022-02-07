import { types } from 'mobx-state-tree';

const InfoModal = types
  .model({
    msg: types.optional(types.string, ''),
    status: types.optional(types.string, 'success'),
  })
  .actions((self) => ({
    setMsg: (str: string, status: 'error' | 'success') => {
      self.msg = str;
      self.status = status;
    },
    close: () => {
      self.msg = '';
    },
  }));

const WalletModal = types
  .model({
    isOpen: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    open: () => {
      self.isOpen = true;
    },
    close: () => {
      self.isOpen = false;
    },
  }));

const MintModal = types
  .model({
    isOpen: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    open: () => {
      self.isOpen = true;
    },
    close: () => {
      self.isOpen = false;
    },
  }));

const Modals = types
  .model({
    info: InfoModal,
    wallet: WalletModal,
    mint: MintModal,
  })
  .actions((self) => ({
    closeAll: () => {
      self.info.close();
      self.wallet.close();
      self.mint.close();
    },
  }));

export default Modals;
