import { FC, useEffect, useMemo, useState } from 'react';

import classnames from 'classnames';

import { LiquidityCard } from './components';

import s from './Liquidity.module.scss';
import { useWalletConnectorContext } from 'services';
import { MockToken1Abi, MockToken2Abi, VaultAbi } from 'config/abi';
import { contracts } from 'config';
import BigNumber from 'bignumber.js';

const { params, type } = contracts;
const VAULT_ADDRESS = params.Vault[type].address;
const TOKEN1_ADDRESS = params.MockToken1[type].address;
const TOKEN2_ADDRESS = params.MockToken2[type].address;

const Liquidity: FC = () => {
  const { walletService } = useWalletConnectorContext();
  const [totalSupply, setTotalSupply] = useState('');
  const [maxTotalSupply, setMaxTotalSupply] = useState(0);
  const [tokenOneSymbol, setTokenOneSymbol] = useState('');
  const [tokenTwoSymbol, setTokenTwoSymbol] = useState('0');

  const getTotalSupply = () => walletService.totalSupply(VAULT_ADDRESS, VaultAbi, 18);
  const getMaxTotalSupply = () => walletService.maxTotalSupply(VAULT_ADDRESS, VaultAbi, 18);
  const getToken1Symbol = () => walletService.tokenSymbol(TOKEN1_ADDRESS, MockToken1Abi);
  const getToken2Symbol = () => walletService.tokenSymbol(TOKEN2_ADDRESS, MockToken2Abi);

  const capacity = useMemo(
    () => new BigNumber(totalSupply).multipliedBy(100).dividedBy(maxTotalSupply).toString(10),
    [totalSupply, maxTotalSupply],
  );

  useEffect(() => {
    getTotalSupply().then((r) => setTotalSupply(r));
    getMaxTotalSupply().then((r) => setMaxTotalSupply(r));
    getToken1Symbol().then((r) => setTokenOneSymbol(r));
    getToken2Symbol().then((r) => setTokenTwoSymbol(r));
  }, []);

  const showCards = useMemo(
    () => (
      <>
        <LiquidityCard
          tokenTwoSymbol={tokenTwoSymbol}
          tokenOneSymbol={tokenOneSymbol}
          ADDRESS={VAULT_ADDRESS}
          capacity={capacity}
          maxTotalSupply={maxTotalSupply}
        />
      </>
    ),
    [totalSupply, getMaxTotalSupply],
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
