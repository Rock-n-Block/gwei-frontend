import { FC, useMemo } from 'react';

import BigNumber from 'bignumber.js';
import classnames from 'classnames';

import { contracts } from 'config';
import { VaultAbi } from 'config/abi';

import { LiquidityCard } from './components';

import { useGetMaxTotalSupply, useGetTokensInfo, useGetTotalSupply } from 'hooks';

import s from './Liquidity.module.scss';

const { params, type } = contracts;

const Liquidity: FC = () => {
  const maxTotalSupply = useGetMaxTotalSupply(params.Vault[type].address, VaultAbi);
  const totalSupply = useGetTotalSupply(params.Vault[type].address, VaultAbi);
  const { symbol0, symbol1 } = useGetTokensInfo();

  const capacity = useMemo(() => {
    return totalSupply && maxTotalSupply
      ? new BigNumber(totalSupply)
          .multipliedBy(100)
          .dividedBy(new BigNumber(maxTotalSupply))
          .toString(10)
      : '0';
  }, [totalSupply, maxTotalSupply]);

  const pair = useMemo(() => `${symbol0}/${symbol1}`, [symbol0, symbol1]);

  const showCards = useMemo(
    () => (
      <LiquidityCard
        pair={pair}
        ADDRESS={params.Vault[type].address}
        capacity={capacity}
        maxTotalSupply={maxTotalSupply}
      />
    ),
    [maxTotalSupply, capacity, pair],
  );
  return (
    <div className={s.liquidity}>
      <h2 className="title">
        Liquidity Vaults <br /> for <span>Uniswap&nbsp;V3</span>
      </h2>
      <div className={s.liquidity__row}>
        {showCards}
        <div className={classnames(s.liquidity__row_block, s.liquidity__row_block_soon)}>
          More vaults coming soon!
        </div>
      </div>
    </div>
  );
};
export default Liquidity;
