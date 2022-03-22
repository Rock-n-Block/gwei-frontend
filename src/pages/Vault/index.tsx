import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import { useMst } from 'store';

import BigNumber from 'bignumber.js/bignumber';
import cn from 'classnames';
import { Plate } from 'containers';
import { VaultContext } from 'contexts';
import { AbiItem } from 'web3-utils';

import { Loader } from 'components';
import { InfoIcon } from 'components/Icons';
import { is_production } from 'config';
import { erc20Abi, VaultAbi } from 'config/abi';
import { clog } from 'utils/logger';

import { Form, GeneralCard, MissedOpportunities, StateCard, VaultHeader } from './components';

import { useMoralisApi } from 'hooks';
import { useWalletConnectorContext } from 'services';
import { PoolInfo, TokenInfo, VaultData } from 'types';

import s from './Vault.module.scss';
// import { Subscription } from 'web3-core-subscriptions';
// import { BlockHeader } from 'web3-eth';

const Vault: FC = observer(() => {
  // const [currentSubscription, setCurrentSubscription] = useState<Subscription<BlockHeader>>();
  const [lastBlock, setLastBlock] = useState<number>(0);
  const [vaultData, setVaultData] = useState<VaultData>({} as VaultData);
  const value = useMemo(() => ({ vaultData, setVaultData }), [vaultData]);
  const { user } = useMst();
  const { id } = useParams();
  const { walletService } = useWalletConnectorContext();
  const { fetchPrice, fetchTransactions } = useMoralisApi();

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
        const totalAmounts = await contract.methods.getTotalAmounts().call();
        const total0 = await walletService.weiToEth(address0, totalAmounts.total0);
        const total1 = await walletService.weiToEth(address1, totalAmounts.total1);
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
        const txCount = await fetchTransactions(id).then((res) => res.total || 0);
        const { accruedProtocolFes0, accruedProtocolFes1 } = currentPool;
        const price0 = await fetchPrice(
          is_production ? address0 : '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        ).then((res) => res.usdPrice);
        const price1 = await fetchPrice(
          is_production ? address1 : '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        ).then((res) => res.usdPrice);
        const feesUsd =
          !+accruedProtocolFes0 && !+accruedProtocolFes1
            ? '0'
            : new BigNumber(await walletService.weiToEth(address0, accruedProtocolFes0))
                .times(price0)
                .plus(
                  new BigNumber(await walletService.weiToEth(address1, accruedProtocolFes1)).times(
                    price1,
                  ),
                )
                .toString(10) || '0';
        const token0 = await getTokenInfo(address0);
        const token1 = await getTokenInfo(address1);

        setVaultData({
          totalSupply,
          maxTotalSupply,
          balance,
          total0,
          total1,
          reserve0,
          reserve1,
          price0,
          price1,
          currentPool,
          token0,
          token1,
          operationMode,
          txCount,
          feesUsd,
        });
      } catch (e: unknown) {
        clog('getVaultData', e);
      }
    }
  }, [fetchPrice, fetchTransactions, getTokenInfo, id, user.address, walletService]);

  useEffect((): any => {
    const subscription = walletService
      .Web3()
      .eth.subscribe('newBlockHeaders')
      .on('data', (data) => {
        clog('on "data" data:', data);
        setLastBlock(data.number);
      })
      .on('error', (err) => clog(err.message));

    return () => subscription?.unsubscribe((err, success) => success && clog('Unsubscribed!'));
  }, [walletService, id, user.address]);

  useEffect(() => {
    getVaultData();
  }, [getVaultData, lastBlock]);

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
            <VaultHeader
              operationMode={vaultData.operationMode}
              token0Symbol={vaultData.token0?.symbol}
              token1Symbol={vaultData.token1?.symbol}
            />
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
