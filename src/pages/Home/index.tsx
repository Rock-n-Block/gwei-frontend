import { FC } from 'react';

import { About, AboutUs, GweiStrategy, JoinProject, SubmitWallet, WhyGwei } from 'components';

import s from './Home.module.scss';

const Home: FC = () => {
  return (
    <div className={s.home_wrapper}>
      <About />
      <SubmitWallet />
      <AboutUs />
      <WhyGwei />
      <GweiStrategy />
      <JoinProject />
    </div>
  );
};
export default Home;
