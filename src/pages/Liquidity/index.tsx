import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import BigNumber from 'bignumber.js';
import classnames from 'classnames';

import { contracts } from 'config';
import { MockToken1Abi, MockToken2Abi, VaultAbi } from 'config/abi';

import { LiquidityCard } from './components';

import { useWalletConnectorContext } from 'services';

import s from './Liquidity.module.scss';

const { params, type } = contracts;
const VAULT_ADDRESS = params.Vault[type].address;
const TOKEN1_ADDRESS = params.MockToken1[type].address;
const TOKEN2_ADDRESS = params.MockToken2[type].address;

const Liquidity: FC = () => {
  const { walletService } = useWalletConnectorContext();
  const [totalSupply, setTotalSupply] = useState('');
  const [maxTotalSupply, setMaxTotalSupply] = useState(0);
  const [tokenOneSymbol, setTokenOneSymbol] = useState('');
  const [tokenTwoSymbol, setTokenTwoSymbol] = useState('');

  const getTotalSupply = useCallback(
    () => walletService.totalSupply(VAULT_ADDRESS, VaultAbi, 18),
    [walletService],
  );
  const getMaxTotalSupply = useCallback(
    () => walletService.maxTotalSupply(VAULT_ADDRESS, VaultAbi, 18),
    [walletService],
  );
  const getToken1Symbol = useCallback(
    () => walletService.tokenSymbol(TOKEN1_ADDRESS, MockToken1Abi),
    [walletService],
  );
  const getToken2Symbol = useCallback(
    () => walletService.tokenSymbol(TOKEN2_ADDRESS, MockToken2Abi),
    [walletService],
  );

  const capacity = useMemo(() => {
    return totalSupply && maxTotalSupply
      ? new BigNumber(totalSupply).multipliedBy(100).dividedBy(maxTotalSupply).toString(10)
      : '0';
  }, [totalSupply, maxTotalSupply]);

  const pair = useMemo(() => {
    return tokenOneSymbol && tokenTwoSymbol ? `${tokenOneSymbol}/${tokenTwoSymbol}` : 'USDC/ETH';
  }, [tokenOneSymbol, tokenTwoSymbol]);

  useEffect(() => {
    getTotalSupply().then((r) => setTotalSupply(r));
    getMaxTotalSupply().then((r) => setMaxTotalSupply(r));
    getToken1Symbol().then((r) => setTokenOneSymbol(r));
    getToken2Symbol().then((r) => setTokenTwoSymbol(r));
  }, [getMaxTotalSupply, getToken1Symbol, getToken2Symbol, getTotalSupply]);

  const showCards = useMemo(
    () => (
      <LiquidityCard
        pair={pair}
        ADDRESS={VAULT_ADDRESS}
        capacity={capacity}
        maxTotalSupply={maxTotalSupply}
      />
    ),
    [totalSupply, maxTotalSupply, capacity, pair],
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
