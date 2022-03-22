import { FC, memo, useMemo } from 'react';

import BigNumber from 'bignumber.js';
import cn from 'classnames';
import { Plate } from 'containers';
import { useVaultContext } from 'contexts';

import { Loader } from 'components';
import { getSpacedNumbers } from 'utils';

import s from './GeneralCard.module.scss';

const GeneralCard: FC = () => {
  const { vaultData } = useVaultContext();
  const { totalSupply, maxTotalSupply, token0, token1, reserve0, reserve1 } = vaultData;

  const capacity = useMemo(() => {
    return totalSupply && maxTotalSupply
      ? new BigNumber(totalSupply)
          .multipliedBy(100)
          .dividedBy(new BigNumber(maxTotalSupply))
          .toFixed(4, 1)
      : '0';
  }, [totalSupply, maxTotalSupply]);

  return (
    <Plate className={s.general_card}>
      <div className={cn('text-subtitle', s.general_card__title)}>General</div>
      <div className={s.general_card__details}>
        <div className={s.general_card__details_item}>
          <div className="text-descr">
            TVL{' '}
            {totalSupply ? (
              getSpacedNumbers(new BigNumber(totalSupply).toFixed(4, 1))
            ) : (
              <Loader width={100} height={20} viewBox="0 0 100 20" />
            )}
          </div>
          <div>{capacity} %</div>
        </div>
      </div>
      <div className={s.general_card__details_tlv}>
        <div style={{ width: `${capacity}%` }} />
      </div>

      <div className={s.general_card__block}>
        <div className="text-descr">
          {token0?.symbol ? (
            `${token0.symbol}/${token1.symbol}`
          ) : (
            <Loader width={100} height={20} viewBox="0 0 100 20" />
          )}
        </div>
        <div className={s.general_card__details}>
          <div className={s.general_card__details_item}>
            <div className="text-descr">
              {token0?.symbol ?? <Loader width={100} height={20} viewBox="0 0 100 20" />}:{' '}
              {reserve0 ? (
                getSpacedNumbers(new BigNumber(reserve0).toFixed(4, 1))
              ) : (
                <Loader width={100} height={20} viewBox="0 0 100 20" />
              )}
            </div>
            <div>
              {token1?.symbol ?? <Loader width={100} height={20} viewBox="0 0 100 20" />}:{' '}
              {reserve0 ? (
                getSpacedNumbers(new BigNumber(reserve1).toFixed(4, 1))
              ) : (
                <Loader width={100} height={20} viewBox="0 0 100 20" />
              )}
            </div>
          </div>
        </div>
        <div className={s.general_card__compare}>
          <div className={s.general_card__compare_list}>
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
        1 : 10
      </div>
    </Plate>
  );
};

export default memo(GeneralCard);
