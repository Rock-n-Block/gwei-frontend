import { FC, memo, useMemo } from 'react';

import { useMst } from 'store';

import cn from 'classnames';
import { Plate } from 'containers';

import { Button, Input } from 'components';

import { useGetTokensInfo } from 'hooks';

import s from './FormBlock.module.scss';

interface FormBlockProps {
  currentTab: TabT;
}

type TabT = 'Deposit' | 'Withdraw';

const FormBlock: FC<FormBlockProps> = ({ currentTab }) => {
  const tokensInfo = useGetTokensInfo();
  const { modal } = useMst();
  const { setIsOpen } = modal;
  const showFirstBlock = useMemo(
    () => (
      <Plate className={s.block}>
        {currentTab === 'Deposit' ? (
          <>
            <div className={s.block__group}>
              <label className={cn(s.block__group_label, 'text-descr')}>{tokensInfo.symbol0}</label>
              <Input className={s.input} placeholder="0.00" type="number" onChange={() => ''} />
            </div>

            <div className={s.block__group}>
              <label className={cn(s.block__group_label, 'text-descr')}>{tokensInfo.symbol1}</label>
              <Input className={s.input} placeholder="0.00" type="number" onChange={() => ''} />
              <Button onClick={setIsOpen} className={s.button} color="filled">
                Connect wallet
              </Button>
            </div>
          </>
        ) : (
          <>
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
                  <label className={cn(s.block__group_label, 'text-descr')}>
                    {tokensInfo.symbol0}
                  </label>
                  <Input className={s.input} placeholder="0.00" type="number" onChange={() => ''} />
                </div>
                <div>
                  <label className={cn(s.block__group_label, 'text-descr')}>
                    {tokensInfo.symbol1}
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
    [currentTab, tokensInfo, setIsOpen],
  );

  return (
    <div>
      {showFirstBlock}
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
    </div>
  );
};

export default memo(FormBlock);
