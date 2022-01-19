import { FC, useCallback, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { observer } from 'mobx-react-lite';

import { Button } from 'components';
import { LogoIcon } from 'components/Icons';
import { contracts } from 'config';

import { useWalletConnectorContext } from 'services';
import { chainsEnum } from 'types';

import { socials } from './Header.mock';

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

  const showSocials = useMemo(
    () => (
      <div className={s.header__navbar_socials}>
        {socials.map(({ href, icon, alt }) => (
          <a
            target="_blank"
            key={alt}
            href={href}
            className={s.header__navbar_socials_item}
            rel="noreferrer"
          >
            {icon}
          </a>
        ))}
      </div>
    ),
    [],
  );

  return (
    <div className={s.header}>
      <div className={s.header__navbar}>
        <Link to="/" className={s.header__navbar_logo}>
          <LogoIcon />
        </Link>

        <nav className={s.header__navbar_nav}>
          <Link to="#home">Home</Link>
          <Link to="#calc">Calculate</Link>
          <Link to="#roadmap">Roadmap</Link>
          <Link to="#faq">Faq</Link>
          <a target="_blank" href="http://docs.gwei.fi/" rel="noreferrer">
            Docs
          </a>
        </nav>

        {showSocials}

        <div className={s.header__navbar_control}>
          <Button onClick={connectToWallet} size="sm" color="default">
            ENTER APP
          </Button>
        </div>
      </div>
    </div>
  );
});

export default Header;
