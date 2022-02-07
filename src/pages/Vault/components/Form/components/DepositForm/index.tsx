import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import { useMst } from 'store';

import BigNumber from 'bignumber.js';
import cn from 'classnames';
import { Plate } from 'containers';
import { useVaultContext } from 'contexts';
import { AbiItem } from 'web3-utils';

import { Button, Input, Loader } from 'components';
import { erc20Abi, VaultAbi } from 'config/abi';
import { clog } from 'utils/logger';

import { useWalletConnectorContext } from 'services';

import s from '../../Form.module.scss';

const DepositForm: FC = observer(() => {
  const [isLoading, setLoading] = useState(false);
  const [isMintedNFT, setMintedNFT] = useState(false);
  const [firstInput, setFirstInput] = useState('');
  const [firstInputError, setFirstInputError] = useState('');
  const [secondInput, setSecondInput] = useState('');
  const [secondInputError, setSecondInputError] = useState('');
  const [isFirstApproved, setFirstApproved] = useState(false);
  const [isSecondApproved, setSecondApproved] = useState(false);

  const { id } = useParams();
  const { modals, user } = useMst();
  const { walletService } = useWalletConnectorContext();
  const { vaultData } = useVaultContext();
  const { token0, token1, reserve0, reserve1 } = vaultData;

  const log = (...content: unknown[]) => clog('pages/Vault/Form/DepositForm [debug]:', content);

  const openWalletModal = () => {
    modals.wallet.open();
  };

  const handleInput = (str: string, query: 'first' | 'second') => {
    if (!Number.isNaN(+str) && +str >= 0) {
      if (query === 'first') {
        setFirstInput(str);
        if (+reserve0 && +reserve1) {
          setSecondInput(new BigNumber(str).times(reserve1).div(reserve0).toString(10));
        }
      } else {
        setSecondInput(str);
        if (+reserve0 && +reserve1) {
          setFirstInput(new BigNumber(str).times(reserve0).div(reserve1).toString(10));
        }
      }
    }
  };

  const setMax = (query: 'first' | 'second') => {
    if (query === 'first') {
      setFirstInput(token0.balance);
      if (+reserve0 && +reserve1) {
        setSecondInput(new BigNumber(token0.balance).times(reserve1).div(reserve0).toString(10));
      }
    } else {
      setSecondInput(token1.balance);
      if (+reserve0 && +reserve1) {
        setFirstInput(new BigNumber(token1.balance).times(reserve0).div(reserve1).toString(10));
      }
    }
  };

  const handleApprove = async (contractType: 'token' | 'vault', query: 'first' | 'second') => {
    try {
      setLoading(true);
      await walletService.approveToken({
        contractAddress: query === 'first' ? token0?.address : token1?.address,
        contractAbi: contractType === 'token' ? (erc20Abi as AbiItem[]) : (VaultAbi as AbiItem[]),
        approvedAddress: id,
        amountToApprove: query === 'first' ? firstInput : secondInput,
      });
      modals.info.setMsg(
        `You have successfully approved ${query === 'first' ? token0.symbol : token1.symbol}`,
        'success',
      );
      // eslint-disable-next-line no-unused-expressions
      query === 'first' ? setFirstApproved(true) : setSecondApproved(true);
      setLoading(false);
    } catch (e) {
      modals.info.setMsg('Something went wrong', 'error');
      log('approveToken', e);
      setLoading(false);
    }
  };

  const handleDeposit = async () => {
    try {
      setLoading(true);
      await walletService.deposit({
        vaultAddress: id || '',
        address0: token0?.address,
        address1: token1?.address,
        amount0: firstInput,
        amount1: secondInput,
        walletAddress: user.address,
      });
      modals.info.setMsg('You have successfully deposited tokens to vault!', 'success');
      setLoading(false);
      setTimeout(() => window.location.reload(), 2500);
    } catch (e) {
      modals.info.setMsg('Something went wrong', 'error');
      log('handleDeposit', e);
      setLoading(false);
    }
  };

  const validateInput = useCallback(
    (balance: string, input: string, setInput: React.Dispatch<React.SetStateAction<string>>) => {
      if (+input > +balance) {
        setInput("value can't be greater then balance");
      } else if (+input < 0) {
        setInput("value can't be lower then 0");
      } else {
        setInput('');
      }
    },
    [],
  );

  const checkApprove = useCallback(
    async (query: 'first' | 'second') => {
      if (id && user.address) {
        if (query === 'first' && token0?.address && +firstInput > 0) {
          const allowance = await walletService.checkTokenAllowance({
            contractAddress: token0.address,
            contractAbi: erc20Abi as AbiItem[],
            approvedAddress: id,
            walletAddress: user.address,
            amount: firstInput,
          });
          log('allowance first:', allowance);
          setFirstApproved(allowance);
        } else if (query === 'second' && token1?.address && +secondInput > 0) {
          const allowance = await walletService.checkTokenAllowance({
            contractAddress: token1.address,
            contractAbi: erc20Abi as AbiItem[],
            approvedAddress: id,
            walletAddress: user.address,
            amount: secondInput,
          });
          log('allowance second:', allowance);
          setSecondApproved(allowance);
        }
      }
    },
    [firstInput, id, secondInput, token0, token1, user.address, walletService],
  );

  const checkMintedNFT = useCallback(async () => {
    if (user.address) {
      const ownersToIds = await walletService.connectWallet
        .Contract('InvitationNFT')
        .methods.ownersToIds(user.address)
        .call();
      setMintedNFT(!!ownersToIds);
    }
  }, [user.address, walletService.connectWallet]);

  useEffect(() => {
    if (firstInput && token0?.balance) {
      validateInput(token0.balance, firstInput, setFirstInputError);
      checkApprove('first');
    }
    if (secondInput && token1?.balance) {
      validateInput(token1.balance, secondInput, setSecondInputError);
      checkApprove('second');
    }
  }, [checkApprove, firstInput, secondInput, token0, token1, validateInput]);

  useEffect(() => {
    checkMintedNFT();
  }, [checkMintedNFT]);

  return (
    <Plate className={s.block}>
      <div className={s.block__group}>
        <label className={cn(s.label, 'text-descr')}>
          <div>{token0?.symbol || <Loader width={50} height={20} viewBox="0 0 50 20" />}</div>
          <div className={s.label__notification} onClick={() => setMax('first')}>
            Balance {token0?.balance || <Loader width={50} height={20} viewBox="0 0 50 20" />} (Max)
          </div>
        </label>
        <Input
          className={s.input}
          placeholder="0.00"
          value={firstInput}
          error={firstInputError}
          type="number"
          onChange={(str) => handleInput(str, 'first')}
        />
      </div>
      <div className={s.block__group}>
        <label className={cn(s.label, 'text-descr')}>
          <div>{token1?.symbol || <Loader width={50} height={20} viewBox="0 0 50 20" />}</div>
          <div className={s.label__notification} onClick={() => setMax('second')}>
            Balance {token1?.balance || <Loader width={50} height={20} viewBox="0 0 50 20" />} (Max)
          </div>
        </label>
        <Input
          className={s.input}
          placeholder="0.00"
          value={secondInput}
          error={secondInputError}
          type="number"
          onChange={(str) => handleInput(str, 'second')}
        />
        {!user.address && (
          <Button onClick={openWalletModal} className={s.button} color="filled">
            Connect wallet
          </Button>
        )}
        {user.address && !isFirstApproved && (
          <Button
            disabled={!token0?.address || !+firstInput || !!firstInputError}
            onClick={() => handleApprove('token', 'first')}
            className={s.button}
            color="filled"
          >
            {isLoading
              ? 'In progress...'
              : `Approve ${
                  token0?.symbol || <Loader width={50} height={20} viewBox="0 0 50 20" />
                }`}
          </Button>
        )}
        {user.address && isFirstApproved && !isSecondApproved && (
          <Button
            disabled={!token1?.address || !+secondInput || !!secondInputError}
            onClick={() => handleApprove('token', 'second')}
            className={s.button}
            color="filled"
          >
            {isLoading
              ? 'In progress...'
              : `Approve ${
                  token1?.symbol || <Loader width={50} height={20} viewBox="0 0 50 20" />
                }`}
          </Button>
        )}
        {user.address && isFirstApproved && isSecondApproved && (
          <Button
            disabled={
              !!firstInputError || !!secondInputError || !firstInput || !secondInput || !isMintedNFT
            }
            onClick={handleDeposit}
            className={s.button}
            color="filled"
          >
            {/* eslint-disable-next-line no-nested-ternary */}
            {isLoading ? 'In progress...' : isMintedNFT ? 'Deposit' : 'No Invitational NFT'}
          </Button>
        )}
      </div>
    </Plate>
  );
});

export default memo(DepositForm);
