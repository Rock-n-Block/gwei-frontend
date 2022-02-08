import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { routes } from 'router';

const RouteManager: FC = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route path={route.path} element={route.component} key={route.name} />
      ))}
    </Routes>
  );
};

export default RouteManager;
