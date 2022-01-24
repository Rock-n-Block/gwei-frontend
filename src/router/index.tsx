import { Liquidity, Vault } from 'pages';

export const routes = [
  {
    name: 'Liquidity',
    path: '/',
    component: <Liquidity />,
  },
  {
    name: 'Vault',
    path: '/vault/:id',
    component: <Vault />,
  },
];
