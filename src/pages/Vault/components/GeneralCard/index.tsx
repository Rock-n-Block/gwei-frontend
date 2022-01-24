import { FC, memo } from 'react';
import s from './GeneralCard.module.scss';
import { Plate } from 'containers';
import cn from 'classnames';

const GeneralCard: FC = () => {
  return (
    <Plate className={s.general_card}>
      <div className={cn('text-subtitle', s.general_card__title)}>General</div>

      <div className={s.general_card__details}>
        <div className={s.general_card__details_item}>
          <div className="text-descr">TVL 2,000.000</div>
          <div>40%</div>
        </div>
      </div>
      <div className={s.general_card__details_tlv}>
        <div style={{ width: '40%' }} />
      </div>

      <div className={s.general_card__block}>
        <div className={'text-descr'}>USDC/ETH</div>
        <div className={s.general_card__details}>
          <div className={s.general_card__details_item}>
            <div className="text-descr">USDC: 0.00</div>
            <div>ETH: 0.00</div>
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
