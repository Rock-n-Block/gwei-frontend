export * from './connect';

export type TNullable<T> = T | null;
export type TOptionable<T> = T | undefined;

export interface TokenInfo {
  address: string;
  symbol: string;
  balance: string;
}

export interface PoolInfo {
  pool: string;
  baseLower: string;
  baseUpper: string;
  protocolFee: string;
}

export interface VaultData {
  totalSupply: string;
  maxTotalSupply: string;
  balance: string;
  token0: TokenInfo;
  token1: TokenInfo;
  total0: string;
  total1: string;
  reserve0: string;
  reserve1: string;
  price0: number;
  price1: number;
  currentPool: PoolInfo;
  operationMode: number;
  txCount: number;
  feesUsd: string;
}

export interface VaultInfo {
  name: string;
  address: string;
  totalSupply: string;
  maxTotalSupply: string;
  operationMode: string;
}

export interface PoolData {
  fee: string;
  tick: string;
}

export interface MoralisApiOptions {
  address: string;
  chain?:
    | 'eth'
    | 'kovan'
    | '0x1'
    | 'ropsten'
    | '0x3'
    | 'rinkeby'
    | '0x4'
    | 'goerli'
    | '0x5'
    | '0x2a'
    | 'polygon'
    | '0x89'
    | 'mumbai'
    | '0x13881'
    | 'bsc'
    | '0x38'
    | 'bsc testnet';
}

export interface FetchPriceOptions extends MoralisApiOptions {
  providerUrl?: string | undefined;
  exchange?: string | undefined;
  to_block?: number | undefined;
}
