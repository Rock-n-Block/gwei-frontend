import { createContext, FC, useCallback, useContext, useEffect, useMemo, useRef } from 'react';

import { observer } from 'mobx-react-lite';
import { rootStore } from 'store';

import { chains } from 'config';

import { WalletService } from 'services/WalletService';
import { chainsEnum } from 'types';

declare global {
  interface Window {
    ethereum: any;
  }
}

const WalletConnectContext = createContext<{
  connect: (
    chainName: chainsEnum,
    providerName: 'MetaMask' | 'WalletConnect' | string,
  ) => Promise<void>;
  disconnect: () => void;
  walletService: WalletService;
}>({
  connect: async (): Promise<void> => {},
  disconnect: (): void => {},
  walletService: new WalletService(),
});

const Connect: FC = observer(({ children }) => {
  const provider = useRef<WalletService>(new WalletService(chains.Ethereum.network.rpc as string));

  const disconnect = useCallback(() => {
    // USE THIS: delete localStorage.project_name_logged;
    delete localStorage.gwei_logged;
    rootStore.user.disconnect();
  }, []);

  const connect = useCallback(
    async (chainName: chainsEnum, providerName: 'MetaMask' | 'WalletConnect' | string) => {
      try {
        const isConnected = await provider.current.initWalletConnect(
          chainName,
          providerName as any,
        );

        if (isConnected) {
          try {
            const { address }: any = await provider.current.getAccount();
            console.log('getAccount address:', address);
            provider.current.setAccountAddress(address);
            rootStore.user.setAddress(address);
            localStorage.gwei_logged = true;

            const eventSubs = provider.current.connectWallet.eventSubscriber().subscribe(
              (res: any) => {
                if (res.name === 'accountsChanged' && rootStore.user.address !== res.address) {
                  disconnect();
                }
              },
              (err: any) => {
                // eslint-disable-next-line no-console
                console.log(err);
                eventSubs.unsubscribe();
                disconnect();
              },
            );
          } catch (err: any) {
            console.error('getAccount wallet connect - get user account err: ', err);
            if (!(err.code && err.code === 6)) {
              disconnect();
            }
          }
        }
      } catch (err) {
        console.error(err);
        disconnect();
      }
    },
    [disconnect, provider],
  );

  const walletConnectValue = useMemo(() => {
    return { connect, disconnect, walletService: provider.current };
  }, [connect, disconnect, provider]);

  useEffect(() => {
    if (window.ethereum && localStorage.gwei_logged) {
      connect(chainsEnum.Ethereum, 'MetaMask');
    }
  }, [connect]);

  return (
    <WalletConnectContext.Provider value={walletConnectValue}>
      {children}
    </WalletConnectContext.Provider>
  );
});
export default Connect;

export const useWalletConnectorContext = () => {
  return useContext(WalletConnectContext);
};
