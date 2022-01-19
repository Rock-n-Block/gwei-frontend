import { FC } from 'react';

import classnames from 'classnames';

import Finance from 'assets/img/finance.png';

import s from './WhyGwei.module.scss';

const WhyGwei: FC = () => {
  return (
    <section className={s.gwei}>
      <div className={s.gwei__info}>
        <h2 className="title">
          Why gwei <br /> <span>finance&nbsp;?</span>
        </h2>

        <div className={classnames('text', 'sm')}>
          <p className={s.gwei__info_text}>
            Tired of self-active rebalancing and reinvesting? It’s so damn boring—not to mention
            risky! We all know that feeling when impermanent loss becomes permanent. ^_^
          </p>
          <p className={s.gwei__info_text}>
            After days of sleepless nights, we’ve got something very exciting to share with you all.
          </p>
        </div>
      </div>
      <div className={s.gwei__image}>
        <img src={Finance} alt="" />
      </div>
    </section>
  );
};

export default WhyGwei;
