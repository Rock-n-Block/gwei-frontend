export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const SHOW_LOGS = !IS_PRODUCTION;

const INFURA_KEY = '579f676938414709905652124fd1be95';

export const ETHEREUM_CHAIN = {
  chainId: IS_PRODUCTION ? 1 : 4,
  rpc: IS_PRODUCTION
    ? `https://mainnet.infura.io/v3/${INFURA_KEY}`
    : `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
  blockExplorerUrl: IS_PRODUCTION ? 'https://etherscan.io/' : 'https://rinkeby.etherscan.io/',
};
