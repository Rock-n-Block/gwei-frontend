import { FC } from 'react';

import { Footer, Header, RouterManager } from 'containers';

import WalletConnect from './services/WalletConnect';

const App: FC = () => {
  // const { user } = useMst();
  //
  // useEffect(() => {
  //   user.setAddress(localStorage.project_name_logged)
  // }, [])
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
