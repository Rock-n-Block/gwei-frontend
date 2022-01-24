import { ReactElement } from 'react';

import {
  MetamaskIcon,
  WalletConnectIcon,
} from 'components/Icons';

interface WalletsI {
  icon: ReactElement;
  title: string;
}

type WalletsT = WalletsI[];

export const wallets: WalletsT = [
  {
    icon: <MetamaskIcon />,
    title: 'MetaMask',
  },
  {
    icon: <WalletConnectIcon />,
    title: 'WalletConnect',
  },
];
