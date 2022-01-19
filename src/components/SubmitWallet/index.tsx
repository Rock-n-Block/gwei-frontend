import classnames from 'classnames';
import { Button } from 'components';
import { FC } from 'react';
import s from './SubmitWallet.module.scss';
import LuckyImg from '../../assets/img/lucky.png';

const SubmitWallet: FC = () => {
  return (
    <section className={classnames('section', s.lucky)}>
      <div className={s.lucky__inner}>
        <div className={s.lucky__inner_img}>
          <img src={LuckyImg} alt="" />
        </div>

        <div className={s.lucky__inner_info}>
          <h2 className="title">
            Feeling <span>lucky?</span>
          </h2>

          <div className="text">
            Feeling Lucky? Submit your wallet and you might get a chance at getting that NFT!
          </div>

          <Button color="filled">SUBMIT WALLET</Button>
        </div>
      </div>
    </section>
  );
};

export default SubmitWallet;
