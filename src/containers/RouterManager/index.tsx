import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Liquidity, Vault } from 'pages';

const RouteManager: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Liquidity />} key="Liquidity" />
      <Route path="vault" element={<Vault />} key="Vaults">
        <Route path=":id" element={<Vault />} key="Vault" />
      </Route>
    </Routes>
  );
};

export default RouteManager;
