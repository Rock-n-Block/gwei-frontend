import { FC, memo } from 'react';

import cn from 'classnames';
import { Plate } from 'containers';

import s from './MissedOpportunities.module.scss';

const MissedOpportunities: FC = () => {
  return (
    <Plate className={s.card}>
      <div className={s.card__title}>
        <div className="text-subtitle">Current state of Vault</div>
      </div>

      <div className={cn('text-descr', s.card__text)}>
        As for volatility—we’re going to use classic indicators such as Keltner Channels and/or
        Bollinger Bands, but the difference is that our model, which we’ve already back-tested,
        works wonders!
      </div>

      <div className={s.card__info}>
        <div className={s.card__info_item}>
          <div className="text-descr">TX</div>
          <div>45</div>
        </div>
        <div className={s.card__info_item}>
          <div className="text-descr">Fees</div>
          <div>$2,000.000</div>
        </div>
      </div>
    </Plate>
  );
};

export default memo(MissedOpportunities);
