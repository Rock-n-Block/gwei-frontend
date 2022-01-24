import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import { useMst } from 'store';

import cn from 'classnames';

import { Button } from 'components';
import { Burger, UserIcon } from 'components/Icons';
import { shortAddress } from 'utils';

import WalletModal from '../../components/Modals/WalletModal';

import { useBackground } from 'hooks';

import { socials } from './Header.mock';

import Logo from 'assets/img/logo.png';

import s from './Header.module.scss';

const Header: FC = observer(() => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const isBackground = useBackground();

  const { user } = useMst();

  const handleBurger = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const showSocials = () => (
    <div className={s.header__nav_mobile_socials}>
      {socials.map(({ href, icon, alt }) => (
        <a target="_blank" key={alt} href={href} rel="noreferrer">
          {icon}
        </a>
      ))}
    </div>
  );

  const showConnect = () => {
    return !user.address ? (
      <div className={s.header__control}>
        <Button onClick={openModal} color="default">
          CONNECT WALLET
        </Button>
      </div>
    ) : (
      <div className={s.user}>
        <div className={s.user__logo}>
          <UserIcon />
        </div>
        <div className={s.user__info}>
          <div className={s.user__info_balance}>0 ETH</div>
          <div>{shortAddress(user.address)}</div>
        </div>
      </div>
    );
  };

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
        <a href="http://docs.gwei.fi/">Docs</a>
      </nav>
      <div className={cn(s.header__nav_mobile, isBurgerOpen ? 'open' : '')}>
        <Link onClick={handleBurger} to="/" className={s.header__nav_mobile_logo}>
          <img src={Logo} alt="logo" />
        </Link>
        <nav className={s.header__nav_mobile_nav}>
          <div role="button" tabIndex={0} onKeyPress={() => {}} onClick={handleBurger}>
            Calculator
          </div>
          <div role="button" tabIndex={0} onKeyPress={() => {}} onClick={handleBurger}>
            Why GWEI
          </div>
          <a onClick={handleBurger} href="http://docs.gwei.fi/" target="_blank" rel="noreferrer">
            Docs
          </a>
        </nav>
        {showSocials}
      </div>
      {showConnect}
      <WalletModal isOpen={modalIsOpen} closeModal={closeModal} />
    </div>
  );
});

export default Header;
