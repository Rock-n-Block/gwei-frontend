import { FC, memo, useMemo } from 'react';

import cn from 'classnames';
import { Plate } from 'containers';

import { Button, Input } from 'components';

import s from './FormBlock.module.scss';

interface FormBlockProps {
  currentTab: TabT;
}

type TabT = 'Deposit' | 'Withdraw';

const FormBlock: FC<FormBlockProps> = ({ currentTab }) => {
  const showFirstBlock = useMemo(
    () => (
      <Plate className={s.block}>
        {currentTab === 'Deposit' ? (
          <>
            <div className={s.block__group}>
              <label className={cn(s.block__group_label, 'text-descr')} htmlFor="token1">
                USDC
              </label>
              <Input className={s.input} placeholder="0.00" type="number" onChange={() => ''} />
            </div>

            <div className={s.block__group}>
              <label className={cn(s.block__group_label, 'text-descr')} htmlFor="token2">
                ETH
              </label>
              <Input className={s.input} placeholder="0.00" type="number" onChange={() => ''} />
              <Button className={s.button} color="filled">
                Connect wallet
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className={s.block__group}>
              <div>
                <label className={cn(s.label, 'text-descr')} htmlFor="token1">
                  <div>Vault shares</div>
                  <div className={s.label__notification}>Balance: 0(Max)</div>
                </label>
                <Input className={s.input} placeholder="0.00" type="number" onChange={() => ''} />
              </div>
            </div>
            <div className={s.block__group}>
              <div className={s.block__group_wrap}>
                <div>
                  <label className={cn(s.block__group_label, 'text-descr')} htmlFor="token2">
                    WBTC
                  </label>
                  <Input className={s.input} placeholder="0.00" type="number" onChange={() => ''} />
                </div>
                <div>
                  <label className={cn(s.block__group_label, 'text-descr')} htmlFor="token2">
                    USDC
                  </label>
                  <Input className={s.input} placeholder="0.00" type="number" onChange={() => ''} />
                </div>
              </div>
              <Button className={s.button} color="filled">
                Connect wallet
              </Button>
            </div>
          </>
        )}
      </Plate>
    ),
    [currentTab],
  );

  return (
    <div>
      {showFirstBlock}
      <Plate className={s.block}>
        <div className={s.block__group}>
          <div className={s.block__group_wrap}>
            <div>
              <label className={cn(s.block__group_label, 'text-descr')} htmlFor="token1">
                USDC
              </label>
              <Input className={s.input} placeholder="0.00" type="number" onChange={() => ''} />
            </div>
            <div>
              <label className={cn(s.block__group_label, 'text-descr')} htmlFor="token1">
                ETH
              </label>
              <Input className={s.input} placeholder="0.00" type="number" onChange={() => ''} />
            </div>
          </div>
        </div>

        <div className={s.block__group}>
          <label className={cn(s.block__group_label, 'text-descr')} htmlFor="token2">
            Value, USD
          </label>
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
    </div>
  );
};

export default memo(FormBlock);
