import { FC, useCallback, useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';

import classnames from 'classnames';
import { AbiItem } from 'web3-utils';

import { vaults } from 'config';
import { erc20Abi, VaultAbi } from 'config/abi';
import { clog } from 'utils/logger';

import { LiquidityCard } from './components';

import { useWalletConnectorContext } from 'services';
import { VaultInfo } from 'types';

import s from './Liquidity.module.scss';

const Liquidity: FC = observer(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [vaultsInfo, setVaultsInfo] = useState<VaultInfo[]>([]);
  const { walletService } = useWalletConnectorContext();

  const log = (...content: unknown[]) => {
    clog('pages/Liquidity[debug]:', content);
  };

  const getVaultInfo = useCallback(
    async (address: string) => {
      try {
        setIsLoading(true);
        const contract = await walletService.connectWallet.getContract({
          address,
          abi: VaultAbi as AbiItem[],
        });
        const operationMode = await contract.methods.operationMode().call();
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
          address: await contract.methods.token1().call(),
          abi: erc20Abi as AbiItem[],
        });
        const name = `${await token0.methods.symbol().call()}/${await token1.methods
          .symbol()
          .call()}`;
        setVaultsInfo((prev) => [
          ...prev,
          {
            name,
            address,
            totalSupply,
            maxTotalSupply,
            operationMode,
          },
        ]);
        setIsLoading(false);
      } catch (e: unknown) {
        log('getVaultInfo', e);
        setIsLoading(false);
      }
    },
    [walletService],
  );

  useEffect(() => {
    // eslint-disable-next-line no-restricted-syntax
    for (const vault of vaults) {
      getVaultInfo(vault.address);
    }
  }, [getVaultInfo]);

  return (
    <div className={s.liquidity}>
      <h2 className="title">
        Liquidity Vaults <br /> for <span>Uniswap&nbsp;V3</span>
      </h2>
      <div className={s.liquidity__row}>
        {vaultsInfo.length && !isLoading ? (
          vaultsInfo.map((vaultInfo) => (
            <LiquidityCard vaultInfo={vaultInfo} key={vaultInfo.address} />
          ))
        ) : (
          <LiquidityCard vaultInfo={{} as VaultInfo} />
        )}
        <div className={classnames(s.liquidity__row_block, s.liquidity__row_block_soon)}>
          More vaults coming soon!
        </div>
      </div>
    </div>
  );
});

export default Liquidity;
