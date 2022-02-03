export * from './connect';

export type TNullable<T> = T | null;
export type TOptionable<T> = T | undefined;

export interface TokenInfo {
  address: string;
  symbol: string;
  balance: string;
}

export interface VaultData {
  totalSupply: string;
  maxTotalSupply: string;
  balance: string;
  token0: TokenInfo;
  token1: TokenInfo;
  reserve0: string;
  reserve1: string;
  currentPool: string;
}

export interface VaultInfo {
  name: string;
  address: string;
  totalSupply: string;
  maxTotalSupply: string;
}
