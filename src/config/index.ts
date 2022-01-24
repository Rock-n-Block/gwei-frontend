import { INetwork } from '@amfi/connect-wallet/dist/interface';

import { chainsEnum, IConnectWallet, IContracts } from 'types';

import { stakingAbi } from './abi';

export const is_production = false;

const INFURA_KEY = '579f676938414709905652124fd1be95';

export const chains: {
  [key: string]: {
    name: chainsEnum;
    network: INetwork;
    provider: {
      [key: string]: any;
    };
    explorer: string;
  };
} = {
  [chainsEnum.Ethereum]: {
    name: chainsEnum.Ethereum,
    network: {
      chainID: is_production ? 1 : 42,
      chainName: is_production ? 'Ethereum' : 'Kovan Testnet',
      nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
      },
      rpc: is_production
        ? `https://mainnet.infura.io/v3/${INFURA_KEY}`
        : `https://kovan.infura.io/v3/${INFURA_KEY}`,
      blockExplorerUrl: is_production ? 'https://etherscan.io/' : 'https://kovan.etherscan.io/',
    },
    provider: {
      MetaMask: { name: 'MetaMask' },
      WalletConnect: {
        img: '',
        name: 'WalletConnect',
        useProvider: 'rpc',
        provider: {
          rpc: {
            rpc: {
              [is_production ? 1 : 42]: is_production
                ? `https://mainnet.infura.io/v3/${INFURA_KEY}`
                : `https://kovan.infura.io/v3/${INFURA_KEY}`,
            },
            chainId: is_production ? 1 : 42,
          },
        },
      },
    },
    explorer: is_production ? 'https://etherscan.io/' : 'https://kovan.etherscan.io/',
  },
};

export const connectWallet = (chainName: chainsEnum): IConnectWallet => {
  const chain = chains[chainName];

  return {
    network: chain.network,
    provider: chain.provider,
    settings: { providerType: true },
  };
};

export const contracts: IContracts = {
  type: is_production ? 'mainnet' : 'testnet',
  names: ['STAKING'],
  params: {
    STAKING: {
      mainnet: {
        address: '0xfab0fd2586e287746aaec8397109b5fe6d2ff053',
        abi: stakingAbi,
      },
      testnet: {
        address: '0x3bEeA65fdf4C0C51055675800B142045Ed4c76A2',
        abi: stakingAbi,
      },
    },
  },
};
