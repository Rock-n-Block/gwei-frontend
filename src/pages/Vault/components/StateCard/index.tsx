import { FC, memo } from 'react';

import { Plate } from 'containers';

import { GoLinkIcon } from 'components/Icons';

import s from './StateCard.module.scss';

const StateCard: FC = () => {
  return (
    <Plate className={s.card}>
      <div className={s.card__title}>
        <div className="text-subtitle">Current state of Vault</div>
        <div className={s.card__title_icon}>
          <a
            target="_blank"
            href="https://rinkeby.etherscan.io/address/0x183cf97be592c67b1b369eb21f96eb73bc23db11"
            rel="noreferrer"
          >
            <GoLinkIcon />
          </a>
        </div>
      </div>

      <div className={s.card__info}>
        <div className={s.card__info_item}>
          <div className="text-descr">USDC/ETH price</div>
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
