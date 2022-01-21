import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

import classnames from 'classnames';

import s from './LiquidityCard.module.scss';

interface LiquidityCardProps {
  status: string;
  version: string;
  pair: string;
  TVL: string;
  capacity: string;
}

const LiquidityCard: FC<LiquidityCardProps> = (props) => {
  const { status, version, pair, TVL, capacity } = props;
  return (
    <Link to="/liquidity/vault" className={s.card}>
      <div className={s.card__bages}>
        <div className={s.card__bages_bage}>{status}</div>
        <div className={s.card__bages_bage}>{version}</div>
      </div>

      <div className={s.card__subtitle}>{pair}</div>

      <div className={s.card__descr}>
        Manage your liquidity using a passive rebalancing strategy
      </div>

      <div className={s.card__meta}>
        <div className={s.card__meta_block}>
          <div className={s.card__subtitle}>TVL</div>
          <div className={classnames(s.card__descr, s.card__meta_value)}>{TVL}</div>
        </div>
        <div className={s.card__meta_block}>
          <div className={s.card__subtitle}>Capacity used</div>
          <div className={classnames(s.card__descr, s.card__meta_value)}>{capacity}</div>
        </div>
      </div>
    </Link>
  );
};

export default memo(LiquidityCard);
