import { FC, memo, useCallback, useState } from 'react';
import s from './Form.module.scss';
import FormBlock from './FormBlock';
import cn from 'classnames';

type TabT = 'Deposit' | 'Withdraw';

const Form: FC = () => {
  const [currentTab, setCurrentTab] = useState<TabT>('Deposit');

  const tabHandler = useCallback((tab: TabT) => {
    setCurrentTab(tab);
  }, []);

  console.log(currentTab);
  return (
    <div className={s.form}>
      <div className={s.form__tabs}>
        <div
          onClick={() => tabHandler('Deposit')}
          className={cn(s.form__tabs_deposit, currentTab === 'Deposit' ? s.form__tabs_active : '')}
        >
          Deposit
        </div>
        <div
          onClick={() => tabHandler('Withdraw')}
          className={cn(
            s.form__tabs_withdraw,
            currentTab === 'Withdraw' ? s.form__tabs_active : '',
          )}
        >
          Withdraw
        </div>
      </div>

      <FormBlock currentTab={currentTab} />
    </div>
  );
};

export default memo(Form);
