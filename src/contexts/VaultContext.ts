import { createContext, useContext } from 'react';

import { VaultData } from 'types';

export type VaultContextProps = {
  vaultData: VaultData;
  setVaultData: (value: VaultData) => void;
};

export const VaultContext = createContext<VaultContextProps>({
  vaultData: {} as VaultData,
  setVaultData: () => {},
});

export const useVaultContext = () => useContext(VaultContext);
