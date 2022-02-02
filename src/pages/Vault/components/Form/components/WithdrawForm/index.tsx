import { FC, memo } from 'react';

import cn from 'classnames';

import { Button, Input } from '../../../../../../components';

import { TokensInfoI } from '../../../../../../types';

import { Plate } from '../../../../../../containers';

import s from '../../Form.module.scss';

interface WithdrawFormProps {
  tokensInfo: TokensInfoI;
}

const WithdrawForm: FC<WithdrawFormProps> = ({ tokensInfo }) => {
  return (
    <Plate className={s.block}>
      <div className={s.block__group}>
        <div>
          <label className={cn(s.label, 'text-descr')}>
            <div>Vault shares</div>
            <div className={s.label__notification}>Balance: 0(Max)</div>
          </label>
          <Input className={s.input} placeholder="0.00" type="number" onChange={() => ''} />
        </div>
      </div>
      <div className={s.block__group}>
        <div className={s.block__group_wrap}>
          <div>
            <label className={cn(s.block__group_label, 'text-descr')}>{tokensInfo.symbol0}</label>
            <Input className={s.input} placeholder="0.00" type="number" onChange={() => ''} />
          </div>
          <div>
            <label className={cn(s.block__group_label, 'text-descr')}>{tokensInfo.symbol1}</label>
            <Input className={s.input} placeholder="0.00" type="number" onChange={() => ''} />
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
