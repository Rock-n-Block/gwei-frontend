import { FC, useMemo } from 'react';

import BigNumber from 'bignumber.js';
import classnames from 'classnames';

import { VAULT_ADDRESS } from 'config';
import { VaultAbi } from 'config/abi';

import { LiquidityCard } from './components';

import { useGetMaxTotalSupply, useGetTokensInfo, useGetTotalSupply } from 'hooks';

import s from './Liquidity.module.scss';

const Liquidity: FC = () => {
  const maxTotalSupply = useGetMaxTotalSupply(VAULT_ADDRESS, VaultAbi, 18);
  const totalSupply = useGetTotalSupply(VAULT_ADDRESS, VaultAbi, 18);
  const tokensInfo = useGetTokensInfo();

  const capacity = useMemo(() => {
    return totalSupply && maxTotalSupply
      ? new BigNumber(totalSupply)
          .multipliedBy(100)
          .dividedBy(new BigNumber(maxTotalSupply))
          .toString(10)
      : '0';
  }, [totalSupply, maxTotalSupply]);

  const pair = useMemo(() => {
    return tokensInfo ? `${tokensInfo[0].symbol}/${tokensInfo[1].symbol}` : 'USDC/ETH';
  }, [tokensInfo]);

  const showCards = useMemo(
    () => (
      <LiquidityCard
        pair={pair}
        ADDRESS={VAULT_ADDRESS}
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
