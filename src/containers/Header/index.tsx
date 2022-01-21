import { FC, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { observer } from 'mobx-react-lite';

import classnames from 'classnames';

import { Button } from 'components';
import { Burger, LogoIcon } from 'components/Icons';

import WalletModal from '../../components/Modals/WalletModal';

// import { contracts } from 'config';
// import { useWalletConnectorContext } from 'services';
// import { chainsEnum } from 'types';
import s from './Header.module.scss';

const Header: FC = observer(() => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  const handleBurger = useCallback(() => {
    setIsBurgerOpen(!isBurgerOpen);
  }, [isBurgerOpen]);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  // const { connect, walletService } = useWalletConnectorContext();
  // const connectToWallet = useCallback(() => {
  //   connect(chainsEnum.Ethereum, 'MetaMask').catch(() => {});
  // }, [connect]);

  // get data without connect
  // useEffect(() => {
  //   walletService
  //     .callContractMethod({
  //       contractName: 'STAKING',
  //       methodName: 'fees',
  //       data: [1],
  //       contractAddress: contracts.params.STAKING[contracts.type].address,
  //       contractAbi: contracts.params.STAKING[contracts.type].abi,
  //     })
  //     .then((fees) => {
  //       console.log(fees, 'fees');
  //     })
  //     .catch((err) => {
  //       console.log('err', err);
  //     });
  // }, [walletService]);

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

      <div className={s.header__control}>
        <Button onClick={openModal} color="default">
          CONNECT WALLET
        </Button>
      </div>
      <WalletModal isOpen={modalIsOpen} closeModal={closeModal} />
    </div>
  );
});

export default Header;
