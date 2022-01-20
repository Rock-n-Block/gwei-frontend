import { FC } from 'react';
import {
  About,
  SubmitWallet,
  AboutUs,
  WhyGwei,
  GweiStrategy,
  JoinProject,
  SubscribeNow,
  // Roadmap,
} from './components';

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
      <SubscribeNow />
      {/* <Roadmap /> */}
    </div>
  );
};
export default Home;
