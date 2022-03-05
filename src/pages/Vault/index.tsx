import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import { useMst } from 'store';

import cn from 'classnames';
import { Plate } from 'containers';
import { VaultContext } from 'contexts';
import { AbiItem } from 'web3-utils';

import { Loader } from 'components';
import { InfoIcon, QuestionMarkIcon } from 'components/Icons';
import { erc20Abi, VaultAbi } from 'config/abi';
import { clog } from 'utils/logger';

import { Form, GeneralCard, MissedOpportunities, StateCard } from './components';

import { useWalletConnectorContext } from 'services';
import { PoolInfo, TokenInfo, VaultData } from 'types';

import s from './Vault.module.scss';

const Vault: FC = observer(() => {
  const [lastBlock, setLastBlock] = useState<number>(0);
  const [vaultData, setVaultData] = useState<VaultData>({} as VaultData);
  const value = useMemo(() => ({ vaultData, setVaultData }), [vaultData]);
  const { user } = useMst();
  const { id } = useParams();
  const { walletService } = useWalletConnectorContext();

  const log = (...content: unknown[]) => clog('pages/Vault[debug]:', content);

  const getTokenInfo = useCallback(
    async (address: string): Promise<TokenInfo> => {
      const token = walletService.connectWallet.getContract({
        address,
        abi: erc20Abi as AbiItem[],
      });
      const symbol = await token.methods.symbol().call();
      const balance = await walletService.weiToEth(
        address,
        user.address ? await token.methods.balanceOf(user.address).call() : '0',
      );
      return { address, symbol, balance };
    },
    [user.address, walletService],
  );

  const getVaultData = useCallback(async () => {
    if (id) {
      try {
        const contract = walletService.connectWallet.getContract({
          address: id,
          abi: VaultAbi as AbiItem[],
        });
        const totalSupply = await walletService.weiToEth(
          id,
          await contract.methods.totalSupply().call(),
        );
        const maxTotalSupply = await walletService.weiToEth(
          id,
          await contract.methods.maxTotalSupply().call(),
        );
        const balance = await walletService.weiToEth(
          id,
          user.address ? await contract.methods.balanceOf(user.address).call() : '0',
        );
        const address0 = await contract.methods.token0().call();
        const address1 = await contract.methods.token1().call();
        const reserve0 = await walletService.weiToEth(
          address0,
          await contract.methods.getBalance0().call(),
        );
        const reserve1 = await walletService.weiToEth(
          address1,
          await contract.methods.getBalance1().call(),
        );
        const currentPool = await contract.methods.currentPool().call();
        const operationMode = +(await contract.methods.operationMode().call());
        const token0 = await getTokenInfo(address0);
        const token1 = await getTokenInfo(address1);
        setVaultData({
          totalSupply,
          maxTotalSupply,
          balance,
          reserve0,
          reserve1,
          currentPool,
          token0,
          token1,
          operationMode,
        });
      } catch (e: unknown) {
        log('getVaultData', e);
      }
    }
  }, [getTokenInfo, id, user.address, walletService]);

  useEffect(() => {
    log('render getLastBlock');
    walletService
      .Web3()
      .eth.getBlock('latest')
      .then((res: { number: number }) => setLastBlock(res.number));
  }, [walletService]);

  useEffect(() => {
    getVaultData();
  }, [getVaultData]);

  return (
    <VaultContext.Provider value={value}>
      <div className={s.vault}>
        <h2 className="title">
          {vaultData.token0?.symbol ? (
            `${vaultData.token0.symbol}/${vaultData.token1.symbol}`
          ) : (
            <Loader width={400} height={70} viewBox="0 0 400 70" />
          )}
        </h2>
        <div className={s.vault__row}>
          <Plate className={s.vault__row_details}>
            <div className={s.vault__row_details_head}>
              <div className="text-subtitle">
                {vaultData.token0?.symbol ? (
                  `${vaultData.token0.symbol}/${vaultData.token1.symbol}`
                ) : (
                  <Loader width={100} height={20} viewBox="0 0 100 20" />
                )}{' '}
                Vaults details
              </div>
              <div className={s.vault__row_details_invite}>
                <div className={s.vault__row_details_invite_item}>Invite mode</div>
                <div className={s.vault__row_details_invite_tooltip}>
                  <QuestionMarkIcon />
                  <div className={s.vault__row_details_invite_tooltip_info}>
                    Believe it or not—we will never need to rebalance storage in its classic form.
                    Due to hybrid rebalancing, we never reach the point where we need to reallocate
                    50% of one asset to another. As for volatility—we’re going to use classic
                    indicators such as Keltner Channels and/or Bollinger Bands, but the difference
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
            <GeneralCard />
            <StateCard
              currentPool={vaultData.currentPool ?? ({} as PoolInfo)}
              symbol0={vaultData.token0?.symbol}
              symbol1={vaultData.token1?.symbol}
            />
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
          Last synced block:{' '}
          {lastBlock === 0 ? (
            <Loader width={100} height={10} viewBox="0 0 100 10" />
          ) : (
            <span>{lastBlock}</span>
          )}
        </div>
      </div>
    </VaultContext.Provider>
  );
});
export default Vault;
