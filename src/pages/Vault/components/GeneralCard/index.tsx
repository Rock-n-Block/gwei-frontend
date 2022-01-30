import { FC, memo, useMemo } from 'react';

import BigNumber from 'bignumber.js';
import cn from 'classnames';
import { Plate } from 'containers';

import { VaultAbi } from 'config/abi';
import { getSpacedNumbers } from 'utils';

import { useGetMaxTotalSupply, useGetTotalSupply } from 'hooks';

import s from './GeneralCard.module.scss';

interface GeneralCardProps {
  address: any;
  tokensInfo: any[];
}

const GeneralCard: FC<GeneralCardProps> = ({ address, tokensInfo }) => {
  const maxTotalSupply = useGetMaxTotalSupply(address, VaultAbi, 18);
  const totalSupply = useGetTotalSupply(address, VaultAbi, 18);

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
        <div className="text-descr">{`${tokensInfo[0].symbol}/${tokensInfo[1].symbol}`}</div>
        <div className={s.general_card__details}>
          <div className={s.general_card__details_item}>
            <div className="text-descr">
              {tokensInfo[0].symbol}: {getSpacedNumbers(tokensInfo[0].balance)}
            </div>
            <div>
              {tokensInfo[1].symbol}: {getSpacedNumbers(tokensInfo[1].balance)}
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
      </div>
    </Plate>
  );
};

export default memo(GeneralCard);
