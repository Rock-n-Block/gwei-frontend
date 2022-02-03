import { FC, useCallback, useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';
import { useMst } from 'store';

import classnames from 'classnames';
import { AbiItem } from 'web3-utils';

import { contracts } from 'config';
import { erc20Abi, VaultAbi } from 'config/abi';
import { clog } from 'utils/logger';

import { LiquidityCard } from './components';

import { useWalletConnectorContext } from 'services';
import { VaultInfo } from 'types';

import s from './Liquidity.module.scss';

const { params, type } = contracts;

const Liquidity: FC = observer(() => {
  const [vaultInfo, setVaultInfo] = useState({} as VaultInfo);
  const { walletService } = useWalletConnectorContext();
  const { user } = useMst();

  const log = (...content: unknown[]) => {
    clog('pages/Liquidity[debug]:', content);
  };

  const getVaultInfo = useCallback(async () => {
    if (user.address) {
      try {
        const { address } = params.Vault[type];
        const contract = await walletService.connectWallet.getContract({
          address,
          abi: VaultAbi as AbiItem[],
        });
        const totalSupply = await walletService.weiToEth(
          address,
          await contract.methods.totalSupply().call(),
        );
        const maxTotalSupply = await walletService.weiToEth(
          address,
          await contract.methods.maxTotalSupply().call(),
        );
        const token0 = walletService.connectWallet.getContract({
          address: await contract.methods.token0().call(),
          abi: erc20Abi as AbiItem[],
        });
        const token1 = walletService.connectWallet.getContract({
          address: await contract.methods.token0().call(),
          abi: erc20Abi as AbiItem[],
        });
        const name = `${await token0.methods.symbol().call()}/${await token1.methods
          .symbol()
          .call()}`;
        setVaultInfo({
          name,
          address,
          totalSupply,
          maxTotalSupply,
        });
      } catch (e: unknown) {
        log('getVaultInfo', e);
      }
    }
  }, [user.address, walletService]);

  useEffect(() => {
    getVaultInfo();
  }, [getVaultInfo]);

  return (
    <div className={s.liquidity}>
      <h2 className="title">
        Liquidity Vaults <br /> for <span>Uniswap&nbsp;V3</span>
      </h2>
      <div className={s.liquidity__row}>
        <LiquidityCard vaultInfo={vaultInfo} />
        <div className={classnames(s.liquidity__row_block, s.liquidity__row_block_soon)}>
          More vaults coming soon!
        </div>
      </div>
    </div>
  );
});

export default Liquidity;
