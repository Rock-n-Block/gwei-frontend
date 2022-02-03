import { FC, memo, useState } from 'react';

import { useMst } from 'store';

import cn from 'classnames';
import { Plate } from 'containers';
import { useVaultContext } from 'contexts';

import { Button, Input, Loader } from 'components';

import s from '../../Form.module.scss';

const DepositForm: FC = () => {
  const [firstInput, setFirstInput] = useState<string>('');
  const [secondInput, setSecondInput] = useState<string>('');
  const { modals } = useMst();
  const { vaultData } = useVaultContext();
  const { token0, token1 } = vaultData;

  const openWalletModal = () => {
    modals.wallet.open();
  };

  return (
    <Plate className={s.block}>
      <div className={s.block__group}>
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
      <div className={s.block__group}>
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
        <Button onClick={openWalletModal} className={s.button} color="filled">
          Connect wallet
        </Button>
      </div>
    </Plate>
  );
};

export default memo(DepositForm);
