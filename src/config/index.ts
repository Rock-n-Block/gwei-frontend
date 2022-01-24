import { INetwork } from '@amfi/connect-wallet/dist/interface';

import { chainsEnum, IConnectWallet, IContracts } from 'types';

import { stakingAbi } from './abi';
import { InvitationNFTAbi, MockToken1Abi, MockToken2Abi, Pool10000Abi, Pool3000Abi, Pool500Abi, VaultAbi } from './abi';

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
  names: ['MockToken1', 'MockToken2', 'Pool500', 'Pool3000', 'Pool10000', 'Vault', 'InvitationNFT'],
  params: {
    MockToken1: {
      mainnet: {
        address: '',
        abi: MockToken1Abi,
      },
      testnet: {
        address: '0x32f7815c5854FE5826449344Fc6d400927D9CFDB',
        abi: MockToken1Abi,
      },
    },
    MockToken2: {
      mainnet: {
        address: '',
        abi: MockToken2Abi,
      },
      testnet: {
        address: '0xc2963fD186B4A269C5EbFd9dD7f5F8C4575656Be',
        abi: MockToken2Abi,
      },
    },
    Pool500: {
      mainnet: {
        address: '',
        abi: Pool500Abi,
      },
      testnet: {
        address: '0xDaAD8A10d7c518fA0AeF5850B68E25fFc01e4461',
        abi: Pool500Abi,
      },
    },
    Pool3000: {
      mainnet: {
        address: '',
        abi: Pool3000Abi,
      },
      testnet: {
        address: '0x25A921ECdD3aaf5eD91F723fC49e34559976c724',
        abi: Pool3000Abi,
      },
    },
    Pool10000: {
      mainnet: {
        address: '',
        abi: Pool10000Abi,
      },
      testnet: {
        address: '0x458B95Cd8A5349278594205451843dc6aF333C7F',
        abi: Pool10000Abi,
      },
    },
    Vault: {
      mainnet: {
        address: '',
        abi: VaultAbi,
      },
      testnet: {
        address: '0x1138a60211eAD0996E8c0F6c925ee9E61368Ac86',
        abi: VaultAbi,
      },
    },
    InvitationNFT: {
      mainnet: {
        address: '',
        abi: InvitationNFTAbi,
      },
      testnet: {
        address: '0x658dcfDDe53986819a6e18D714F8f4294C2DBE3A',
        abi: InvitationNFTAbi,
      },
    },
  },
};
