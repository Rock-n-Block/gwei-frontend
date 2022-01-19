import { FC } from 'react';

import { Footer, Header, RouterManager } from 'containers';

import WalletConnect from './services/WalletConnect';

const App: FC = () => {
  return (
    <WalletConnect>
      <div className="main_wrapper">
        <div className="page_wrapper">
          <Header />
          <RouterManager />
          <Footer />
        </div>
      </div>
    </WalletConnect>
  );
};
export default App;
