import { About } from 'components';
import { FC } from 'react';

import s from './Home.module.scss';

const Home: FC = () => {
  return (
    <div className={s.home_wrapper}>
      <About />
    </div>
  );
};
export default Home;
