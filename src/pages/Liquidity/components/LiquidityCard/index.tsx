import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

import BigNumber from 'bignumber.js';
import classnames from 'classnames';

import { Loader } from 'components';
import { getSpacedNumbers } from 'utils';

import { VaultInfo } from 'types';

import s from './LiquidityCard.module.scss';

interface LiquidityCardProps {
  vaultInfo: VaultInfo;
}

const LiquidityCard: FC<LiquidityCardProps> = ({ vaultInfo }) => {
  const { address, name, totalSupply, maxTotalSupply, operationMode } = vaultInfo;
  const capacity =
    maxTotalSupply && totalSupply
      ? new BigNumber(totalSupply).div(maxTotalSupply).times(100).toFixed(4, 1)
      : 0;

  return (
    <Link to={`/vault/${address}`} className={s.card}>
      <div className={s.card__bages}>
        <div className={s.card__bages_bage}>
          {!operationMode && <Loader width={70} height={15} viewBox="0 0 70 15" />}
          {+operationMode === 0 && 'INACTIVE'}
          {+operationMode === 1 && 'ACTIVE'}
          {+operationMode === 2 && 'INVITE ONLY'}
        </div>
        <div className={s.card__bages_bage}>V1</div>
      </div>
      <div className={s.card__subtitle}>
        {name ?? <Loader width={100} height={20} viewBox="0 0 100 20" />}
      </div>
      <div className={s.card__descr}>
        Manage your liquidity using a passive rebalancing strategy
      </div>
      <div className={s.card__meta}>
        <div className={s.card__meta_block}>
          <div className={s.card__subtitle}>TVL</div>
          {totalSupply ? (
            <div className={classnames(s.card__descr, s.card__meta_value)}>
              {getSpacedNumbers(new BigNumber(totalSupply).toFixed(4, 1))}
            </div>
          ) : (
            <Loader width={100} height={20} viewBox="0 0 100 20" />
          )}
        </div>
        <div className={s.card__meta_block}>
          <div className={s.card__subtitle}>Capacity used</div>
          {capacity ? (
            <div
              className={classnames(s.card__descr, s.card__meta_value)}
              title={new BigNumber(capacity).toString(10)}
            >
              {new BigNumber(capacity).toFixed(4, 1)} %
            </div>
          ) : (
            <Loader width={100} height={20} viewBox="0 0 100 20" />
          )}
        </div>
      </div>
    </Link>
  );
};

export default memo(LiquidityCard);
