import { FC, memo } from 'react';

import { Loader } from 'components';
import { QuestionMarkIcon } from 'components/Icons';

import s from './VaultHeader.module.scss';

type VaultHeaderProps = {
  token0Symbol: string;
  token1Symbol: string;
  operationMode: number;
};

const VaultHeader: FC<VaultHeaderProps> = ({ token0Symbol, token1Symbol, operationMode }) => {
  return (
    <div className={s.vault_header}>
      <div className="text-subtitle">
        {token0Symbol && token1Symbol ? (
          `${token0Symbol}/${token1Symbol}`
        ) : (
          <Loader width={100} height={20} viewBox="0 0 100 20" />
        )}
        &nbsp;Vaults details
      </div>
      <div className={s.vault_invite}>
        <div className={s.vault_invite_item}>
          {!operationMode && <Loader width={80} height={20} viewBox="0 0 80 20" />}
          {operationMode === 0 && 'Inactive mode'}
          {operationMode === 1 && 'Active mode'}
          {operationMode === 2 && 'Invite mode'}
        </div>
        <div className={s.vault_invite_tooltip}>
          <QuestionMarkIcon />
          <div className={s.vault_invite_tooltip_info}>
            Believe it or not—we will never need to rebalance storage in its classic form. Due to
            hybrid rebalancing, we never reach the point where we need to reallocate 50% of one
            asset to another. As for volatility—we’re going to use classic indicators such as
            Keltner Channels and/or Bollinger Bands, but the difference which we’ve already
            back-tested, works wonders!
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(VaultHeader);
