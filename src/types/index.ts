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
  reserve0: string;
  reserve1: string;
  currentPool: PoolInfo;
}

export interface VaultInfo {
  name: string;
  address: string;
  totalSupply: string;
  maxTotalSupply: string;
}

export interface PoolData {
  fee: string;
  tick: string;
}
