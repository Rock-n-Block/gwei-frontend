import { createContext, FC, useCallback, useContext, useEffect, useMemo, useRef } from 'react';

import { observer } from 'mobx-react-lite';
import { rootStore } from 'store';

import { chains, contracts } from 'config';
import { clog, clogError } from 'utils/logger';

import { WalletService } from 'services/WalletService';
import { chainsEnum, WalletT } from 'types';

declare global {
  interface Window {
    ethereum: any;
  }
}

const log = (...content: unknown[]) => clog('services/WalletConnect[debug]:', ...content);
const logErr = (...content: unknown[]) => clogError('services/WalletConnect[debug]:', ...content);

const { names, type, params } = contracts;

const WalletConnectContext = createContext<{
  connect: (chainName: chainsEnum, providerName: WalletT) => Promise<void>;
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
    delete localStorage.gwei_logged;
    provider.current.connectWallet.resetConect();
    rootStore.user.disconnect();
  }, []);

  const connect = useCallback(
    async (chainName: chainsEnum, providerName: WalletT) => {
      try {
        const isConnected = await provider.current.initWalletConnect(
          chainName,
          providerName as any,
        );

        if (isConnected) {
          try {
            const { address }: any = await provider.current.getAccount();
            log('getAccount address:', address);
            provider.current.setAccountAddress(address);
            rootStore.user.setAddress(address);
            localStorage.gwei_logged = true;
            const balance = await provider.current.getTokenBalance(params.MockToken1[type].address);
            log('balance: ', balance);
            rootStore.user.setBalance(balance);
            // eslint-disable-next-line array-callback-return
            names.map((name) => {
              provider.current.connectWallet
                .addContract({
                  address: params[name][type].address,
                  abi: params[name][type].abi,
                  name,
                })
                .then((status) => log(`is contract ${name} added?:`, status));
            });

            const eventSubs = provider.current.connectWallet.eventSubscriber().subscribe(
              (res: any) => {
                if (res.name === 'accountsChanged' && rootStore.user.address !== res.address) {
                  disconnect();
                }
              },
              (err: any) => {
                logErr(err);
                eventSubs.unsubscribe();
                disconnect();
              },
            );
          } catch (err: any) {
            logErr('getAccount wallet connect - get user account err: ', err);
            if (!(err.code && err.code === 6)) {
              disconnect();
            }
          }
        }
      } catch (err) {
        logErr('connect: provider.initWalletConnect', err);
        disconnect();
      }
    },
    [disconnect],
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
