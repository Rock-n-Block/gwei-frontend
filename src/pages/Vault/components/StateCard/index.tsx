import { FC, memo, useCallback, useEffect, useState } from 'react';

import BigNumber from 'bignumber.js';
import { Plate } from 'containers';
import { AbiItem } from 'web3-utils';

import { Loader } from 'components';
import { GoLinkIcon } from 'components/Icons';
import { chains } from 'config';
import { PoolAbi } from 'config/abi';
import { clog } from 'utils/logger';

import { useWalletConnectorContext } from 'services';
import { PoolInfo } from 'types';

import s from './StateCard.module.scss';

interface StateCardProps {
  currentPool: PoolInfo;
  symbol0: string;
  symbol1: string;
}

const StateCard: FC<StateCardProps> = ({ currentPool, symbol0, symbol1 }) => {
  const [price, setPrice] = useState('');
  const { walletService } = useWalletConnectorContext();
  const { baseUpper, baseLower, protocolFee, pool } = currentPool;

  const log = (...content: unknown[]) => clog('pages/Vault/StateCard [debug]:', content);
  log('currentPool', currentPool);

  const lowerRange = new BigNumber(+baseLower ? 1.0001 ** +baseLower : 0).toFixed(4, 1);
  const upperRange = new BigNumber(+baseUpper ? 1.0001 ** +baseUpper : 0).toFixed(4, 1);

  const getPrice = useCallback(async () => {
    if (pool) {
      const contract = walletService.connectWallet.getContract({
        address: pool,
        abi: PoolAbi as AbiItem[],
      });
      const slot = await contract.methods.slot0().call();
      log('slot:', slot);
      const parsedPrice = new BigNumber(slot.sqrtPriceX96)
        .div(2 ** 96)
        .pow(2)
        .toString(10);
      setPrice(parsedPrice);
    }
  }, [pool, walletService.connectWallet]);

  useEffect(() => {
    getPrice();
  }, [getPrice]);

  return (
    <Plate className={s.card}>
      <div className={s.card__title}>
        <div className="text-subtitle">Current state of Vault</div>
        <div className={s.card__title_icon}>
          <a
            target="_blank"
            href={`${chains.Ethereum.explorer}address/${pool || ''}`}
            rel="noreferrer"
          >
            <GoLinkIcon />
          </a>
        </div>
      </div>
      <div className={s.card__info}>
        <div className={s.card__info_item}>
          <div className="text-descr">
            {symbol0 ? (
              `${symbol0}/${symbol1} price`
            ) : (
              <Loader width={100} height={20} viewBox="0 0 100 20" />
            )}
          </div>
          <div title={price}>
            {price ? (
              new BigNumber(price).toFixed(4, 1)
            ) : (
              <Loader width={200} height={20} viewBox="0 0 200 20" />
            )}
          </div>
        </div>
        <div className={s.card__info_item}>
          <div className="text-descr">Range of Open Position</div>
          <div>
            {lowerRange && upperRange ? (
              `${lowerRange} - ${upperRange}`
            ) : (
              <Loader width={200} height={20} viewBox="0 0 200 20" />
            )}
          </div>
        </div>
        <div className={s.card__info_item}>
          <div className="text-descr">Pool Fee</div>
          {currentPool?.protocolFee ? (
            <div>{new BigNumber(protocolFee).div(1000).toString(10)} %</div>
          ) : (
            <Loader width={50} height={20} viewBox="0 0 50 20" />
          )}
        </div>
      </div>
    </Plate>
  );
};

export default memo(StateCard);
