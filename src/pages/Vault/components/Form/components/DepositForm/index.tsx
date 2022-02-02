import { FC, memo } from 'react';

import { useMst } from 'store';

import cn from 'classnames';
import { Plate } from 'containers';

import { Button, Input } from 'components';

import { TokensInfoI } from '../../../../../../types';

import s from '../../Form.module.scss';

interface DepositFormProps {
  tokensInfo: TokensInfoI;
}

const DepositForm: FC<DepositFormProps> = ({ tokensInfo }) => {
  const { modals } = useMst();

  const openWalletModal = () => {
    modals.wallet.open();
  };

  return (
    <Plate className={s.block}>
      <div className={s.block__group}>
        <label className={cn(s.block__group_label, 'text-descr')}>{tokensInfo.symbol0}</label>
        <Input className={s.input} placeholder="0.00" type="number" onChange={() => ''} />
      </div>
      <div className={s.block__group}>
        <label className={cn(s.block__group_label, 'text-descr')}>{tokensInfo.symbol1}</label>
        <Input className={s.input} placeholder="0.00" type="number" onChange={() => ''} />
        <Button onClick={openWalletModal} className={s.button} color="filled">
          Connect wallet
        </Button>
      </div>
    </Plate>
  );
};

export default memo(DepositForm);
