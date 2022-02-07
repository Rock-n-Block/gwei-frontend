import { types } from 'mobx-state-tree';

const User = types
  .model({
    address: types.optional(types.string, ''),
    balance: types.optional(types.string, '0'),
  })
  .actions((self) => ({
    setAddress: (address: string) => {
      self.address = address;
    },
    setBalance: (balance: string) => {
      self.balance = balance;
    },
    disconnect: () => {
      self.address = '';
      self.balance = '0';
    },
  }));
export default User;
