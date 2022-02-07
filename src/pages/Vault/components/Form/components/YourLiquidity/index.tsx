import { FC, memo } from 'react';

import BigNumber from 'bignumber.js';
import cn from 'classnames';
import { Plate } from 'containers';
import { useVaultContext } from 'contexts';

import { Button, Input, Loader } from 'components';

import s from '../../Form.module.scss';

const YourLiquidity: FC = () => {
  const { vaultData } = useVaultContext();
  const { balance, totalSupply, token0, token1, reserve0, reserve1 } = vaultData;

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
                reserve0
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
                reserve1
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
        <Button className={s.button} color="filled">
          To mint
        </Button>
      </div>
      <div className={s.block__footer}>
        <div className="text-descr">Your eligible to mint invitation after:</div>
        <div>1d 4h 35m 36s</div>
      </div>
    </Plate>
  );
};

export default memo(YourLiquidity);
