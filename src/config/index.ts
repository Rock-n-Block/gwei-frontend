import { INetwork } from '@amfi/connect-wallet/dist/interface';

import { chainsEnum, IConnectWallet, IContracts } from 'types';

import { erc20Abi, InvitationNFTAbi, PoolAbi, VaultAbi } from './abi';

export const is_production = false;
export const SHOW_LOGS = !is_production;

const INFURA_KEY = '579f676938414709905652124fd1be95';

export const MORALIS_APP_ID = 'IrSE8Cfvy8NbwfQg4MY4dS0skMa9wM6bbyQp6p9X';
export const MORALIS_SERVER_URL = 'https://lzmhty23wiot.usemoralis.com:2053/server';

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

export const vaults: Array<{ address: string }> = [
  {
    address: is_production ? '' : '0xf38EB14Ec56897d741844E296Ced1860c79047A9',
  },
  {
    address: is_production
      ? '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640'
      : '0xA0975640870f306B3d849AC042Decb46EFa01A44',
  },
];

export const contracts: IContracts = {
  type: is_production ? 'mainnet' : 'testnet',
  names: ['MockToken1', 'MockToken2', 'Pool500', 'Pool3000', 'Pool10000', 'Vault', 'InvitationNFT'],
  params: {
    MockToken1: {
      mainnet: {
        address: '',
        abi: erc20Abi,
      },
      testnet: {
        address: '0x32f7815c5854FE5826449344Fc6d400927D9CFDB',
        abi: erc20Abi,
      },
    },
    MockToken2: {
      mainnet: {
        address: '',
        abi: erc20Abi,
      },
      testnet: {
        address: '0xc2963fD186B4A269C5EbFd9dD7f5F8C4575656Be',
        abi: erc20Abi,
      },
    },
    Pool500: {
      mainnet: {
        address: '',
        abi: PoolAbi,
      },
      testnet: {
        address: '0xDaAD8A10d7c518fA0AeF5850B68E25fFc01e4461',
        abi: PoolAbi,
      },
    },
    Pool3000: {
      mainnet: {
        address: '',
        abi: PoolAbi,
      },
      testnet: {
        address: '0x25A921ECdD3aaf5eD91F723fC49e34559976c724',
        abi: PoolAbi,
      },
    },
    Pool10000: {
      mainnet: {
        address: '',
        abi: PoolAbi,
      },
      testnet: {
        address: '0x458B95Cd8A5349278594205451843dc6aF333C7F',
        abi: PoolAbi,
      },
    },
    Vault: {
      mainnet: {
        address: '',
        abi: VaultAbi,
      },
      testnet: {
        address: '',
        abi: VaultAbi,
      },
    },
    InvitationNFT: {
      mainnet: {
        address: '',
        abi: InvitationNFTAbi,
      },
      testnet: {
        address: '0xC29926D5e610fab184001636A9DEdE094Fa1e2c7',
        abi: InvitationNFTAbi,
      },
    },
  },
};
