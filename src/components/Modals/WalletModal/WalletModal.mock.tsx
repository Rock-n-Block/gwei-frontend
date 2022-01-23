import { ReactElement } from 'react';

import {
  BinanceIcon,
  CoinbaseIcon,
  FormaticIcon,
  KeyStoneIcon,
  LatticeIcon,
  MetamaskIcon,
  PortisIcon,
  TorusIcon,
  WalletConnectIcon,
} from '../../Icons';

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
  {
    icon: <KeyStoneIcon />,
    title: 'Keystone',
  },
  {
    icon: <LatticeIcon />,
    title: 'Lattice',
  },
  {
    icon: <CoinbaseIcon />,
    title: 'CoinbaseWallet',
  },
  {
    icon: <FormaticIcon />,
    title: 'Fortmatic',
  },
  {
    icon: <PortisIcon />,
    title: 'Portis',
  },
  {
    icon: <TorusIcon />,
    title: 'Torus',
  },
  {
    icon: <BinanceIcon />,
    title: 'Binance',
  },
];
