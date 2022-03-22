import { FC, memo, useState } from 'react';

import { useMst } from 'store';

import cn from 'classnames';

import { DepositForm, WithdrawForm, YourLiquidity } from './components';

import s from './Form.module.scss';

type TabT = 'Deposit' | 'Withdraw';

const Form: FC = () => {
  const [currentTab, setCurrentTab] = useState<TabT>('Deposit');
  const { modals } = useMst();

  const tabHandler = (tab: TabT) => {
    setCurrentTab(tab);
    if (tab === 'Withdraw') {
      modals.info.setMsg('Your Invitational NFT will be burned after withdraw', 'success');
    }
  };

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
      {currentTab === 'Deposit' ? <DepositForm /> : <WithdrawForm />}
      <YourLiquidity />
    </div>
  );
};

export default memo(Form);
