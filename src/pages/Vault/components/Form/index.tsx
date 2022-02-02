import { FC, memo, useState } from 'react';
import { useParams } from 'react-router-dom';

import cn from 'classnames';

import { DepositForm, WithdrawForm, YourLiquidity } from './components';

import { useGetTokensInfo } from '../../../../hooks';

import s from './Form.module.scss';

type TabT = 'Deposit' | 'Withdraw';

const Form: FC = () => {
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState<TabT>('Deposit');
  const tokensInfo = useGetTokensInfo(id || '');

  const tabHandler = (tab: TabT) => {
    setCurrentTab(tab);
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
      {currentTab === 'Deposit' ? (
        <DepositForm tokensInfo={tokensInfo} />
      ) : (
        <WithdrawForm tokensInfo={tokensInfo} />
      )}
      <YourLiquidity tokensInfo={tokensInfo} />
    </div>
  );
};

export default memo(Form);
