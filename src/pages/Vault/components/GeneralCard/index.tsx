import { FC, memo, useMemo } from 'react';

import BigNumber from 'bignumber.js';
import cn from 'classnames';
import { Plate } from 'containers';

import { VaultAbi } from 'config/abi';
import { getSpacedNumbers } from 'utils';

import { useGetMaxTotalSupply, useGetTotalSupply } from 'hooks';

import s from './GeneralCard.module.scss';

interface GeneralCardProps {
  address: string;
  symbol0: string;
  symbol1: string;
  balance0: string;
  balance1: string;
}

const GeneralCard: FC<GeneralCardProps> = ({ address, symbol0, symbol1, balance0, balance1 }) => {
  const maxTotalSupply = useGetMaxTotalSupply(address, VaultAbi);
  const totalSupply = useGetTotalSupply(address, VaultAbi);

  const capacity = useMemo(() => {
    return totalSupply && maxTotalSupply
      ? new BigNumber(totalSupply)
          .multipliedBy(100)
          .dividedBy(new BigNumber(maxTotalSupply))
          .toString(10)
      : '0';
  }, [totalSupply, maxTotalSupply]);

  return (
    <Plate className={s.general_card}>
      <div className={cn('text-subtitle', s.general_card__title)}>General</div>

      <div className={s.general_card__details}>
        <div className={s.general_card__details_item}>
          <div className="text-descr">TVL {getSpacedNumbers(maxTotalSupply)}</div>
          <div>{capacity}%</div>
        </div>
      </div>
      <div className={s.general_card__details_tlv}>
        <div style={{ width: `${capacity}%` }} />
      </div>

      <div className={s.general_card__block}>
        <div className="text-descr">{`${symbol0}/${symbol1}`}</div>
        <div className={s.general_card__details}>
          <div className={s.general_card__details_item}>
            <div className="text-descr">
              {symbol0}: {getSpacedNumbers(balance0)}
            </div>
            <div>
              {symbol1}: {getSpacedNumbers(balance1)}
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
        {new BigNumber(balance0).div(new BigNumber(Math.min(+balance0, +balance1))).toFixed(0, 1)} :{' '}
        {new BigNumber(balance1).div(new BigNumber(Math.min(+balance0, +balance1))).toFixed(0, 1)}
      </div>
    </Plate>
  );
};

export default memo(GeneralCard);
