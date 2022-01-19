import { Button } from 'components';
import { FC } from 'react';
import s from './GweiStrategy.module.scss';
import StrategyImg from 'assets/img/strategy.png';
import classnames from 'classnames';

const GweiStrategy: FC = () => {
  return (
    <section className={s.strategy} id="strategy">
      <div className={s.strategy__image}>
        <img src={StrategyImg} alt="strategy" />
      </div>

      <div className={s.strategy__info}>
        <h2 className="title">
          What’s gwei <br /> <span>strategy?</span>
        </h2>

        <div className={classnames('text', 'sm')}>
          <p>
            Believe it or not—we will never need to rebalance storage in its classic form. Due to
            hybrid rebalancing, we never reach the point where we need to reallocate 50% of one
            asset to another.
          </p>
          <p>
            As for volatility—we’re going to use classic indicators such as Keltner Channels and/or
            Bollinger Bands, but the difference is that our model, which we’ve already back-tested,
            works wonders!
          </p>
          <p>
            We can’t disclose much more information at this time; however we’ll give you a tiny
            insight: All of the magic comes from mempool
          </p>
        </div>

        <Button color="filled" href="http://docs.gwei.fi/">
          Learn more
        </Button>
      </div>
    </section>
  );
};

export default GweiStrategy;
