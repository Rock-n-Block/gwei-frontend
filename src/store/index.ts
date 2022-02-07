import { createContext, useContext } from 'react';

import makeInspectable from 'mobx-devtools-mst';
import { Instance, onSnapshot, types } from 'mobx-state-tree';

import { clog } from 'utils/logger';

import { ModalsModel, UserModel } from './Models';

const RootModel = types.model('RootModel', {
  user: UserModel,
  modals: ModalsModel,
});

export const rootStore = RootModel.create({
  user: {
    address: '',
    balance: '0',
  },
  modals: {
    info: {
      status: 'success',
      msg: '',
    },
    wallet: {
      isOpen: false,
    },
  },
});

makeInspectable(rootStore);

export type RootInstance = Instance<typeof RootModel>;

const RootStoreContext = createContext<RootInstance | null>(null);

export const { Provider } = RootStoreContext;

onSnapshot(rootStore, (snapshot) => {
  clog('store: ', snapshot);
});

export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw Error('Store cannot be null, please add a context provider');
  }
  return store;
}

export default rootStore;
