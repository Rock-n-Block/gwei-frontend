import { types } from 'mobx-state-tree';

const User = types
  .model({
    address: types.maybeNull(types.string),
    balance: types.maybeNull(types.string),
  })
  .actions((self) => ({
    setAddress: (address: string) => {
      self.address = address;
    },
    setBalance: (balance: string) => {
      self.balance = balance;
    },
    disconnect: () => {
      self.address = null;
    },
  }));
export default User;
