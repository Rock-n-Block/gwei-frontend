import { FC, memo, useCallback, useEffect, useState } from 'react';

import { useMst } from 'store';

import BigNumber from 'bignumber.js';
import cn from 'classnames';
import { Plate } from 'containers';
import { useVaultContext } from 'contexts';

import { Button, Input, Loader } from 'components';
import { contracts } from 'config';

import { useWalletConnectorContext } from 'services';

import s from '../../Form.module.scss';

const YourLiquidity: FC = () => {
  const [counter, setCounter] = useState(0);
  const [isMinted, setMinted] = useState(false);
  const [lastWithdraw, setLastWithdraw] = useState(0);
  const { modals, user } = useMst();
  const { walletService } = useWalletConnectorContext();
  const { vaultData } = useVaultContext();
  const { balance, totalSupply, token0, token1, reserve0, reserve1 } = vaultData;
  const { params, type } = contracts;

  const openMintModal = () => {
    modals.mint.open();
  };

  const getInvitationInfo = useCallback(async () => {
    const { address, abi } = params.InvitationNFT[type];
    const contract = walletService.connectWallet.getContract({ address, abi });
    const minted = await contract.methods.minted(user.address).call();
    setMinted(minted);
    const lastWithdrawTimestamp = await contract.methods
      .lastWithdrawTimestamps(user.address)
      .call();
    setLastWithdraw(+lastWithdrawTimestamp);
    const mintTimeout = await contract.methods.mintTimeout().call();
    if (+lastWithdrawTimestamp && !minted) {
      const currentTime = Math.floor(Date.now() / 1000);
      const time = +lastWithdrawTimestamp + +mintTimeout - currentTime;
      if (time > 0) setCounter(time);
    }
  }, [params.InvitationNFT, type, user.address, walletService.connectWallet]);

  useEffect(() => {
    getInvitationInfo();
  }, [getInvitationInfo]);

  useEffect(() => {
    let timer: any;
    if (counter > 0) {
      timer = setTimeout(() => setCounter((prev) => prev - 1), 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter]);

  return (
    <Plate className={s.block}>
      <div className={s.block__group}>
        <div className={s.block__group_wrap}>
          <div>
            <label className={cn(s.block__group_label, 'text-descr')}>
              {token0?.symbol || <Loader width={50} height={20} viewBox="0 0 50 20" />}
            </label>
            <Input
              className={s.input}
              value={
                +reserve0
                  ? new BigNumber(reserve0).times(balance).div(totalSupply).toString(10)
                  : '0'
              }
              type="number"
              disabled
              onChange={() => {}}
            />
          </div>
          <div>
            <label className={cn(s.block__group_label, 'text-descr')}>
              {token1?.symbol || <Loader width={50} height={20} viewBox="0 0 50 20" />}
            </label>
            <Input
              className={s.input}
              value={
                +reserve1
                  ? new BigNumber(reserve1).times(balance).div(totalSupply).toString(10)
                  : '0'
              }
              type="number"
              disabled
              onChange={() => {}}
            />
          </div>
        </div>
      </div>
      <div className={s.block__group}>
        <label className={cn(s.block__group_label, 'text-descr')}>Value, USD</label>
        <Input
          className={s.input}
          value={balance || '0'}
          type="number"
          disabled
          onChange={() => {}}
        />
        <Button
          className={s.button}
          color="filled"
          disabled={!!counter || isMinted || !lastWithdraw}
          onClick={openMintModal}
        >
          {/* eslint-disable-next-line no-nested-ternary */}
          {isMinted ? 'Already minted' : !lastWithdraw ? 'Not withdrawn yet' : 'To mint'}
        </Button>
      </div>
      <div className={s.block__footer}>
        {counter ? (
          <>
            <div className="text-descr">Your eligible to mint invitation after:</div>
            <div>
              {counter >= 86400 ? `${Math.floor(counter / 86400)}d ` : ''}
              {counter >= 3600
                ? `${Math.floor(counter >= 86400 ? (counter % 86400) / 3600 : counter / 3600)}h `
                : ''}
              {counter >= 60
                ? `${Math.floor(counter >= 3600 ? (counter % 3600) / 60 : counter / 60)}m `
                : ''}
              {`${counter % 60}s`}
            </div>
          </>
        ) : (
          ''
        )}
      </div>
    </Plate>
  );
};

export default memo(YourLiquidity);
