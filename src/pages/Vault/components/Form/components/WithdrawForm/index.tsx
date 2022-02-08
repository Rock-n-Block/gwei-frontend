import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useMst } from 'store';

import BigNumber from 'bignumber.js';
import cn from 'classnames';
import { Plate } from 'containers';
import { useVaultContext } from 'contexts';
import { AbiItem } from 'web3-utils';

import { Button, Input, Loader } from 'components';
import { VaultAbi } from 'config/abi';
import { clog } from 'utils/logger';

import { useWalletConnectorContext } from 'services';

import s from '../../Form.module.scss';

const WithdrawForm: FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [isSharesApproved, setSharesApproved] = useState(false);
  const [sharesInput, setSharesInput] = useState('');
  const [sharesInputError, setSharesInputError] = useState('');
  const [firstInput, setFirstInput] = useState('');
  const [secondInput, setSecondInput] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();
  const { modals, user } = useMst();
  const { walletService } = useWalletConnectorContext();
  const { vaultData } = useVaultContext();
  const { balance, token0, token1, totalSupply, reserve0, reserve1 } = vaultData;

  const log = (...content: unknown[]) => clog('pages/Vault/WithdrawForm [debug]:', content);

  const openWalletConnectModal = () => {
    modals.wallet.open();
  };

  const handleInput = (input: 'shares' | 'first' | 'second', str: string) => {
    if (!Number.isNaN(+str) && +str >= 0) {
      if (input === 'shares') {
        setSharesInput(str);
        const shareOfTotal =
          +str && +totalSupply ? new BigNumber(str).div(totalSupply).toString(10) : '0';
        setFirstInput(new BigNumber(reserve0).times(shareOfTotal).toString(10));
        setSecondInput(new BigNumber(reserve1).times(shareOfTotal).toString(10));
      } else if (input === 'first') {
        setFirstInput(str);
        const shareOfReserve =
          +str && +reserve0 ? new BigNumber(str).div(reserve0).toString(10) : '0';
        setSharesInput(new BigNumber(totalSupply).times(shareOfReserve).toString(10));
        setSecondInput(new BigNumber(reserve1).times(shareOfReserve).toString(10));
      } else {
        setSecondInput(str);
        const shareOfReserve =
          +str && +reserve1 ? new BigNumber(str).div(reserve1).toString(10) : '0';
        setSharesInput(new BigNumber(totalSupply).times(shareOfReserve).toString(10));
        setFirstInput(new BigNumber(reserve0).times(shareOfReserve).toString(10));
      }
    }
  };

  const setMax = () => {
    setSharesInput(balance);
    const shareOfTotal =
      +balance && +totalSupply ? new BigNumber(balance).div(totalSupply).toString(10) : '0';
    setFirstInput(new BigNumber(reserve0).times(shareOfTotal).toString(10));
    setSecondInput(new BigNumber(reserve1).times(shareOfTotal).toString(10));
  };

  const handleApprove = async () => {
    if (id && user.address) {
      try {
        setLoading(true);
        await walletService.approveToken({
          contractAddress: id,
          contractAbi: VaultAbi as AbiItem[],
          amountToApprove: sharesInput,
          walletAddress: user.address,
        });
        modals.info.setMsg('You have successfully approved amount of shares!', 'success');
        setSharesApproved(true);
        setLoading(false);
      } catch (e) {
        modals.info.setMsg('Something went wrong', 'error');
        log('approve shares', e);
        setLoading(false);
      }
    }
  };

  const handleWithdraw = async () => {
    if (id && user.address) {
      try {
        setLoading(true);
        const amount0Min = new BigNumber(await walletService.ethToWei(token0?.address, firstInput))
          .div(10)
          .times(8)
          .toFixed(0, 1);
        const amount1Min = new BigNumber(await walletService.ethToWei(token1?.address, secondInput))
          .div(10)
          .times(8)
          .toFixed(0, 1);
        await walletService.withdraw({
          vaultAddress: id,
          shares: await walletService.ethToWei(id, sharesInput),
          amount0Min,
          amount1Min,
          walletAddress: user.address,
        });
        modals.info.setMsg('You have successfully withdrew amount of deposit', 'success');
        setLoading(false);
        navigate('/');
      } catch (e) {
        modals.info.setMsg('Something went wrong', 'error');
        log('withdraw', e);
        setLoading(false);
      }
    }
  };

  const validateInput = useCallback(() => {
    if (+sharesInput > +balance) {
      setSharesInputError("Value can't be greater then balance");
    } else if (+sharesInput < 0) {
      setSharesInputError("Value can't be lower then 0");
    } else {
      setSharesInputError('');
    }
  }, [balance, sharesInput]);

  const checkApprove = useCallback(async () => {
    if (id && user.address) {
      const allowance = await walletService.checkTokenAllowance({
        contractAddress: id,
        contractAbi: VaultAbi as AbiItem[],
        approvedAddress: user.address,
        amount: sharesInput,
      });
      setSharesApproved(allowance);
    }
  }, [id, sharesInput, user.address, walletService]);

  useEffect(() => {
    if (sharesInput && balance) {
      validateInput();
      checkApprove();
    }
  }, [balance, checkApprove, sharesInput, validateInput]);

  return (
    <Plate className={s.block}>
      <div className={s.block__group}>
        <div>
          <label className={cn(s.label, 'text-descr')}>
            <div>Vault shares</div>
            <div className={s.label__notification} onClick={setMax}>
              Balance: {balance || <Loader width={50} height={20} viewBox="0 0 50 20" />} (Max)
            </div>
          </label>
          <Input
            className={s.input}
            placeholder="0.00"
            value={sharesInput}
            error={sharesInputError}
            onChange={(e) => handleInput('shares', e.target.value)}
          />
        </div>
      </div>
      <div className={s.block__group}>
        <div className={s.block__group_wrap}>
          <div>
            <label className={cn(s.block__group_label, 'text-descr')}>
              {token0?.symbol || <Loader width={50} height={20} viewBox="0 0 50 20" />}
            </label>
            <Input
              className={s.input}
              placeholder="0.00"
              value={firstInput}
              onChange={(e) => handleInput('first', e.target.value)}
            />
          </div>
          <div>
            <label className={cn(s.block__group_label, 'text-descr')}>
              {token1?.symbol || <Loader width={50} height={20} viewBox="0 0 50 20" />}
            </label>
            <Input
              className={s.input}
              placeholder="0.00"
              value={secondInput}
              onChange={(e) => handleInput('second', e.target.value)}
            />
          </div>
        </div>
        {!user.address && (
          <Button className={s.button} onClick={openWalletConnectModal} color="filled">
            Connect wallet
          </Button>
        )}
        {user.address && !isSharesApproved && (
          <Button
            className={s.button}
            disabled={!+sharesInput || !!sharesInputError}
            onClick={handleApprove}
            color="filled"
          >
            {isLoading ? 'In progress...' : 'Approve'}
          </Button>
        )}
        {user.address && isSharesApproved && (
          <Button
            className={s.button}
            disabled={!+sharesInput || !!sharesInputError}
            onClick={handleWithdraw}
            color="filled"
          >
            {isLoading ? 'In progress...' : 'Withdraw'}
          </Button>
        )}
      </div>
    </Plate>
  );
};

export default memo(WithdrawForm);
