import { FC } from 'react';

import { About, AboutUs, GweiStrategy, SubmitWallet, WhyGwei } from 'components';

import s from './Home.module.scss';

const Home: FC = () => {
  return (
    <div className={s.home_wrapper}>
      <About />
      <SubmitWallet />
      <AboutUs />
      <WhyGwei />
      <GweiStrategy />
    </div>
  );
};
export default Home;
