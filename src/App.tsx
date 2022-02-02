import { FC } from 'react';

import { Footer, Header, RouterManager } from 'containers';

import { InfoModal, WalletModal } from './components';

import WalletConnect from 'services/WalletConnect';

const App: FC = () => {
  return (
    <WalletConnect>
      <div className="main_wrapper">
        <div className="page_wrapper">
          <Header />
          <RouterManager />
        </div>
        <Footer />
        <InfoModal />
        <WalletModal />
      </div>
    </WalletConnect>
  );
};
export default App;
