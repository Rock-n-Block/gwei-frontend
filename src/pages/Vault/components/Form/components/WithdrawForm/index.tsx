import { FC, memo, useState } from 'react';

import cn from 'classnames';
import { Plate } from 'containers';
import { useVaultContext } from 'contexts';

import { Button, Input, Loader } from 'components';

import s from '../../Form.module.scss';

const WithdrawForm: FC = () => {
  const [sharesInput, setSharesInput] = useState<string>('');
  const [firstInput, setFirstInput] = useState<string>('');
  const [secondInput, setSecondInput] = useState<string>('');
  const { vaultData } = useVaultContext();
  const { balance, token0, token1 } = vaultData;

  return (
    <Plate className={s.block}>
      <div className={s.block__group}>
        <div>
          <label className={cn(s.label, 'text-descr')}>
            <div>Vault shares</div>
            <div className={s.label__notification}>
              Balance: {balance || <Loader width={50} height={20} viewBox="0 0 50 20" />} (Max)
            </div>
          </label>
          <Input
            className={s.input}
            placeholder="0.00"
            value={sharesInput}
            type="number"
            onChange={(str) => setSharesInput(str)}
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
              type="number"
              onChange={(str) => setFirstInput(str)}
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
              type="number"
              onChange={(str) => setSecondInput(str)}
            />
          </div>
        </div>
        <Button className={s.button} color="filled">
          Connect wallet
        </Button>
      </div>
    </Plate>
  );
};

export default memo(WithdrawForm);
