import { FC, useEffect } from 'react';

import { Footer, Header, RouterManager } from 'containers';

import WalletConnect from './services/WalletConnect';
import { WalletService } from './services';

const App: FC = () => {

  useEffect(() => {
    console.log(WalletService.getAddress('MockToken1'));
  }, [])

  return (
    <WalletConnect>
      <div className="main_wrapper">
        <div className="page_wrapper">
          <Header />
          <RouterManager />
        </div>
        <Footer />
      </div>
    </WalletConnect>
  );
};
export default App;
