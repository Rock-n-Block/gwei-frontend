import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';

import cn from 'classnames';
import { Plate } from 'containers';

import { InfoIcon, QuestionMarkIcon } from 'components/Icons';

import { Form, GeneralCard, MissedOpportunities, StateCard } from './components';

import { useGetTokensInfo } from 'hooks';

import s from './Vault.module.scss';

const Vault: FC = () => {
  const { id } = useParams();
  const tokensInfo = useGetTokensInfo();

  return (
    <div className={s.vault}>
      <h2 className="title">{`${tokensInfo[0].symbol}/${tokensInfo[1].symbol}`}</h2>
      <div className={s.vault__row}>
        <Plate className={s.vault__row_details}>
          <div className={s.vault__row_details_head}>
            <div className="text-subtitle">
              {`${tokensInfo[0].symbol}/${tokensInfo[1].symbol}`} Vaults details
            </div>
            <div className={s.vault__row_details_invite}>
              <div className={s.vault__row_details_invite_item}>Invite mode</div>
              <div className={s.vault__row_details_invite_tooltip}>
                <QuestionMarkIcon />
                <div className={s.vault__row_details_invite_tooltip_info}>
                  Believe it or not—we will never need to rebalance storage in its classic form. Due
                  to hybrid rebalancing, we never reach the point where we need to reallocate 50% of
                  one asset to another. As for volatility—we’re going to use classic indicators such
                  as Keltner Channels and/or Bollinger Bands, but the difference is that our model,
                  which we’ve already back-tested, works wonders!
                </div>
              </div>
            </div>
          </div>

          <div className={cn('text-descr', s.vault__row_details_text)}>
            This vault automatically manages liquidity on Uniswap V3 for you. It concentrates its
            liquidity to earn higher yields and automatically adjusts its range orders as the
            underlying price moves so that it can continue to capture fees. (CHARM)
          </div>

          <GeneralCard address={id} tokensInfo={tokensInfo} />
          <StateCard />
          <MissedOpportunities />
          <div className={s.vault__footer}>
            <InfoIcon />
            <div className="text-descr">
              This system will become active automatically on reaching required limit.
            </div>
          </div>
        </Plate>
        <Form />
      </div>
      <div className={cn('text-descr', s.vault__last_block)}>
        Last synced block: <span>12409471</span>
      </div>
    </div>
  );
};
export default memo(Vault);
