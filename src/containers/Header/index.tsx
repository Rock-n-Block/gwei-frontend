import { FC, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { observer } from 'mobx-react-lite';

import { Button } from 'components';
import { LogoIcon } from 'components/Icons';
import { contracts } from 'config';

import { useWalletConnectorContext } from 'services';
import { chainsEnum } from 'types';

import s from './Header.module.scss';

const Header: FC = observer(() => {
  const { connect, walletService } = useWalletConnectorContext();
  const connectToWallet = useCallback(() => {
    connect(chainsEnum['Binance-Smart-Chain'], 'MetaMask').catch(() => {});
  }, [connect]);

  // get data without connect
  useEffect(() => {
    walletService
      .callContractMethod({
        contractName: 'STAKING',
        methodName: 'fees',
        data: [1],
        contractAddress: contracts.params.STAKING[contracts.type].address,
        contractAbi: contracts.params.STAKING[contracts.type].abi,
      })
      .then((fees) => {
        console.log(fees, 'fees');
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, [walletService]);

  return (
    <div className={s.header}>
      <div className={s.header__navbar}>
        <Link to="/" className={s.header__navbar_logo}>
          <LogoIcon />
        </Link>

        <div className={s.header__navbar_control}>
          <Button onClick={connectToWallet} color="default">
            CONNECT WALLET
          </Button>
        </div>
      </div>
    </div>
  );
});

export default Header;
