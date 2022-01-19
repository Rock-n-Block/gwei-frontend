import { FC } from 'react';

import classnames from 'classnames';
import { Plate } from 'containers';

import s from './AboutUs.module.scss';

const AboutUs: FC = () => {
  return (
    <Plate className={s.about}>
      <h2 className={classnames('title', s.about__title)}>
        About <span>us</span>
      </h2>

      <div className="text">
        <p className={classnames('text', 'sm')}>
          We’re a smart-ass team with extensive experience in DeFi (Uniswap) and MEV extraction. The
          V3 opens up exciting new horizons in liquidity and capital efficiency.
        </p>
        <p className={classnames('text', 'sm')}>
          We truly believe in the V3’s possibilities and are confident that our unique hybrid
          strategy will make us leaders in the Liquidity Management arena.
        </p>
      </div>
    </Plate>
  );
};

export default AboutUs;
