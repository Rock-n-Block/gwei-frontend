import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import { useMst } from 'store';

import BigNumber from 'bignumber.js';
import cn from 'classnames';

import { Button } from 'components';
import { Burger, UserIcon } from 'components/Icons';
import { shortAddress } from 'utils';

import { useBackground } from 'hooks';
import { useWalletConnectorContext } from 'services';

import { socials } from './Header.mock';

import Logo from 'assets/img/logo.png';

import s from './Header.module.scss';

const Header: FC = observer(() => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [balance, setBalance] = useState('');
  const isBackground = useBackground();
  const { disconnect, walletService } = useWalletConnectorContext();
  const { modals, user } = useMst();

  const openModal = () => {
    modals.wallet.open();
  };

  const handleBurger = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  const showConnect = () => {
    return !user.address ? (
      <div className={s.header__control}>
        <Button onClick={openModal} color="default">
          CONNECT WALLET
        </Button>
      </div>
    ) : (
      <div onClick={disconnect} className={s.user}>
        <div className={s.user__logo}>
          <UserIcon />
        </div>
        <div className={s.user__info}>
          <div className={s.user__info_balance} title={balance}>
            {new BigNumber(balance).toFixed(5, 1)} ETH
          </div>
          <div title={user.address}>{shortAddress(user.address)}</div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (user.address) {
      walletService.getEthBalance(user.address).then((res) => setBalance(res));
    }
  }, [user.address, walletService]);

  return (
    <div className={cn(s.header, isBackground ? s.header_background : '')}>
      <div className={s.header__navbar}>
        <Link to="/" className={s.header__navbar_logo}>
          <img src={Logo} alt="logo" />
        </Link>
      </div>
      <div onClick={handleBurger} className={s.header__burger}>
        <Burger />
      </div>
      <nav className={s.header__nav}>
        <a href="#calc">Calculator</a>
        <a href="#finance">Why GWEI</a>
        <a href="https://docs.gwei.fi/">Docs</a>
      </nav>
      <div className={cn(s.header__nav_mobile, isBurgerOpen ? s.open_mobile : '')}>
        <Link onClick={handleBurger} to="/" className={s.header__nav_mobile_logo}>
          <img src={Logo} alt="logo" />
        </Link>
        <nav className={s.header__nav_mobile_nav}>
          <a href="#calc" onClick={handleBurger}>
            Calculator
          </a>
          <a href="#finance" onClick={handleBurger}>
            Why GWEI
          </a>
          <a onClick={handleBurger} href="https://docs.gwei.fi/" target="_blank" rel="noreferrer">
            Docs
          </a>
        </nav>
        <div className={s.header__nav_mobile_socials}>
          {socials.map(({ href, icon, alt }) => (
            <a target="_blank" key={alt} href={href} rel="noreferrer">
              {icon}
            </a>
          ))}
        </div>
      </div>
      {showConnect()}
    </div>
  );
});

export default Header;
