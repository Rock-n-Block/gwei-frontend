import { FC, memo } from 'react';

import cn from 'classnames';
import { Plate } from 'containers';
import { useVaultContext } from 'contexts';

import { Loader } from 'components';

import s from './MissedOpportunities.module.scss';

const MissedOpportunities: FC = () => {
  const { vaultData } = useVaultContext();
  const { txCount, feesUsd } = vaultData;

  return (
    <Plate className={s.card}>
      <div className={s.card__title}>
        <div className="text-subtitle">Missed Opportunities</div>
      </div>

      <div className={cn('text-descr', s.card__text)}>
        As for volatility—we’re going to use classic indicators such as Keltner Channels and/or
        Bollinger Bands, but the difference is that our model, which we’ve already back-tested,
        works wonders!
      </div>

      <div className={s.card__info}>
        <div className={s.card__info_item}>
          <div className="text-descr">TX</div>
          <div>{txCount || <Loader width={50} height={20} viewBox="0 0 50 20" />}</div>
        </div>
        <div className={s.card__info_item}>
          <div className="text-descr">Fees</div>
          <div>
            {feesUsd ? `$${feesUsd}` : <Loader width={100} height={20} viewBox="0 0 100 20" />}
          </div>
        </div>
      </div>
    </Plate>
  );
};

export default memo(MissedOpportunities);
