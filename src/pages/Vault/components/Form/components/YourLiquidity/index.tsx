import { FC, memo } from 'react';

import cn from 'classnames';

import { Button, Input } from '../../../../../../components';

import { TokensInfoI } from '../../../../../../types';

import { Plate } from '../../../../../../containers';

import s from '../../Form.module.scss';

interface YourLiquidityProps {
  tokensInfo: TokensInfoI;
}

const YourLiquidity: FC<YourLiquidityProps> = ({ tokensInfo }) => {
  return (
    <Plate className={s.block}>
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
      </div>
      <div className={s.block__group}>
        <label className={cn(s.block__group_label, 'text-descr')}>Value, USD</label>
        <Input className={s.input} placeholder="0.00" type="number" onChange={() => ''} />
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
