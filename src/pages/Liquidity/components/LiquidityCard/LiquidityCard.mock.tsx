export interface CardI {
  status: string;
  version: string;
  pair: string;
}

export type CardT = CardI[];

export const cardInfo: CardT = [
  {
    status: 'Active',
    version: 'V1',
    pair: 'WBTC/USDC',
  },
  {
    status: 'Active',
    version: 'V1',
    pair: 'ETH/USDC',
  },
];
