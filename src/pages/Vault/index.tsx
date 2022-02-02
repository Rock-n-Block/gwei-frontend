import { FC, memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import { useMst } from 'store';

import cn from 'classnames';
import { Plate } from 'containers';

import { InfoIcon, QuestionMarkIcon } from 'components/Icons';
import { InfoModal } from 'components/Modals';

import { Form, GeneralCard, MissedOpportunities, StateCard } from './components';

import { useWalletConnectorContext } from '../../services';
import { useGetTokensInfo } from 'hooks';

import s from './Vault.module.scss';

const Vault: FC = observer() => {
  const [lastBlock, setLastBlock] = useState<number>(0);
  const { id } = useParams<string>();
  const { modal } = useMst();
  const { isOpen, status, setIsOpen } = modal;
  const { symbol0, symbol1, balance0, balance1 } = useGetTokensInfo(id || '');
  const connector = useWalletConnectorContext().walletService;

  useEffect(() => {
    connector
      .Web3()
      .eth.getBlock('latest')
      .then((res: { number: number }) => setLastBlock(res.number));
  }, [connector]);

  return (
    <div className={s.vault}>
      <h2 className="title">{`${symbol0}/${symbol1}`}</h2>
      <div className={s.vault__row}>
        <Plate className={s.vault__row_details}>
          <div className={s.vault__row_details_head}>
            <div className="text-subtitle">{`${symbol0}/${symbol1}`} Vaults details</div>
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
          <GeneralCard
            address={id || ''}
            symbol0={symbol0}
            symbol1={symbol1}
            balance0={balance0}
            balance1={balance1}
          />
          <StateCard symbol0={symbol0} symbol1={symbol1} />
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
        Last synced block: <span>{lastBlock}</span>
      </div>

      {status === 'success' ? (
        <InfoModal
          text="The action was successful. Expect a response in the near future by email or in your personal account."
          isOpen={isOpen}
          status={status}
          closeModal={setIsOpen}
        />
      ) : (
        <InfoModal
          text="Something went wrong."
          isOpen={isOpen}
          status={status}
          closeModal={setIsOpen}
        />
      )}
    </div>
  );
});
export default memo(Vault);
