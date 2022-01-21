export interface CardI {
  status: string;
  version: string;
  pair: string;
  TVL: string;
  capacity: string;
}

export type CardT = CardI[];

export const cardInfo: CardT = [
  {
    status: 'Active',
    version: 'V1',
    pair: 'WBTC/USDC',
    TVL: '2,340,750.00',
    capacity: '88.2 %',
  },
  {
    status: 'Active',
    version: 'V1',
    pair: 'ETH/USDC',
    TVL: '1,240,433.00',
    capacity: '100 %',
  },
];
