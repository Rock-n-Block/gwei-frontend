import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

import classnames from 'classnames';

import s from './LiquidityCard.module.scss';
import { getSpacedNumbers } from 'utils';

interface LiquidityCardProps {
  capacity: string;
  maxTotalSupply: number;
  ADDRESS: string;
  tokenOneSymbol: string;
  tokenTwoSymbol: string;
}

const LiquidityCard: FC<LiquidityCardProps> = (props) => {
  const { capacity, maxTotalSupply, ADDRESS, tokenOneSymbol, tokenTwoSymbol } = props;
  return (
    <Link to={`/vault/${ADDRESS}`} className={s.card}>
      <div className={s.card__bages}>
        <div className={s.card__bages_bage}>Active</div>
        <div className={s.card__bages_bage}>V1</div>
      </div>

      <div className={s.card__subtitle}>
        {tokenOneSymbol}/{tokenTwoSymbol}
      </div>

      <div className={s.card__descr}>
        Manage your liquidity using a passive rebalancing strategy
      </div>

      <div className={s.card__meta}>
        <div className={s.card__meta_block}>
          <div className={s.card__subtitle}>TVL</div>
          <div className={classnames(s.card__descr, s.card__meta_value)}>
            {getSpacedNumbers(String(maxTotalSupply * 232))} USD
          </div>
        </div>
        <div className={s.card__meta_block}>
          <div className={s.card__subtitle}>Capacity used</div>
          <div className={classnames(s.card__descr, s.card__meta_value)}>{capacity} %</div>
        </div>
      </div>
    </Link>
  );
};

export default memo(LiquidityCard);
