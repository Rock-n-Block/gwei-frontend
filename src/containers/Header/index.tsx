import { FC, useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { observer } from 'mobx-react-lite';

import classnames from 'classnames';

import { Button } from 'components';
import { Burger, LogoIcon, UserIcon } from 'components/Icons';

import WalletModal from '../../components/Modals/WalletModal';

import s from './Header.module.scss';
import { useMst } from 'store';
import { shortAddress } from 'utils';

const Header: FC = observer(() => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

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

  const showConnect = useMemo(() => (
    <>
      {!user.address ?<div className={s.header__control}>
          <Button onClick={openModal} color='default'>
            CONNECT WALLET
          </Button>
        </div> :
        <div className={s.user}>
          <div className={s.user__logo}><UserIcon /></div>
          <div className={s.user__info}>
            <div className={s.user__info_balance}>0 ETH</div>
            <div>{shortAddress(user.address)}</div>
          </div>
        </div>}
    </>
  ), [user.address]);

  return (
    <div className={s.header}>
      <div className={classnames(s.header__navbar, isBurgerOpen ? 'open' : '')}>
        <Link to="/" className={s.header__navbar_logo}>
          <LogoIcon />
        </Link>
      </div>
      <div onClick={handleBurger} className={s.header__burger}>
        <Burger />
      </div>
      {showConnect}
      <WalletModal isOpen={modalIsOpen} closeModal={closeModal} />
    </div>
  );
});

export default Header;
