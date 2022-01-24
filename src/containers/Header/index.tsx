import { FC, useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { observer } from 'mobx-react-lite';

import cn from 'classnames';

import { Button } from 'components';
import { Burger, UserIcon } from 'components/Icons';

import Logo from 'assets/img/logo.png';

import WalletModal from '../../components/Modals/WalletModal';

import s from './Header.module.scss';
import { useMst } from 'store';
import { shortAddress } from 'utils';
import { useBackground } from 'hooks';
import { socials } from './Header.mock';

const Header: FC = observer(() => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const isBackground = useBackground();

  const { user } = useMst();

  console.log(user);

  const handleBurger = useCallback(() => {
    setIsBurgerOpen(!isBurgerOpen);
  }, [isBurgerOpen]);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const showSocials = useMemo(
    () => (
      <div className={s.header__nav_mobile_socials}>
        {socials.map(({ href, icon, alt }) => (
          <a
            target="_blank"
            key={alt}
            href={href}
            rel="noreferrer"
          >
            {icon}
          </a>
        ))}
      </div>
    ),
    [],
  );

  const showConnect = useMemo(
    () => (
      <>
        {!user.address ? (
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
        )}
      </>
    ),
    [user.address],
  );

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
          <a onClick={handleBurger}>Calculator</a>
          <a onClick={handleBurger}>Why GWEI</a>
          <a onClick={handleBurger} href="http://docs.gwei.fi/" target="_blank">Docs</a>
        </nav>
        {showSocials}
      </div>
      {showConnect}
      <WalletModal isOpen={modalIsOpen} closeModal={closeModal} />
    </div>
  );
});

export default Header;
