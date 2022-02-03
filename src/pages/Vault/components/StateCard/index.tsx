import { FC, memo } from 'react';

import { Plate } from 'containers';

import { Loader } from 'components';
import { GoLinkIcon } from 'components/Icons';
import { chains } from 'config';

import s from './StateCard.module.scss';

interface StateCardProps {
  poolAddress: string;
  symbol0: string;
  symbol1: string;
}

const StateCard: FC<StateCardProps> = ({ poolAddress, symbol0, symbol1 }) => {
  return (
    <Plate className={s.card}>
      <div className={s.card__title}>
        <div className="text-subtitle">Current state of Vault</div>
        <div className={s.card__title_icon}>
          <a
            target="_blank"
            href={`${chains.Ethereum.explorer}address/${poolAddress}`}
            rel="noreferrer"
          >
            <GoLinkIcon />
          </a>
        </div>
      </div>
      <div className={s.card__info}>
        <div className={s.card__info_item}>
          <div className="text-descr">
            {symbol0 ? (
              `${symbol0}/${symbol1} price`
            ) : (
              <Loader width={100} height={20} viewBox="0 0 100 20" />
            )}
          </div>
          <div>$3,650.25</div>
        </div>
        <div className={s.card__info_item}>
          <div className="text-descr">Range of Open Position</div>
          <div>$3,000.000 - $5,000.000</div>
        </div>
        <div className={s.card__info_item}>
          <div className="text-descr">Pool Fee</div>
          <div>0.3%</div>
        </div>
      </div>
    </Plate>
  );
};

export default memo(StateCard);
