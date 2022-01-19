import { About } from 'components';
import SubmitWallet from 'components/SubmitWallet';
import { FC } from 'react';

import s from './Home.module.scss';

const Home: FC = () => {
  return (
    <div className={s.home_wrapper}>
      <About />
      <SubmitWallet />
    </div>
  );
};
export default Home;
