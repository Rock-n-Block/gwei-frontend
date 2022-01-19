import { Button } from 'components';
import { FC } from 'react';
import s from './JoinProject.module.scss';
import SoldImg from 'assets/img/sold.png';
import classnames from 'classnames';

const JoinProject: FC = () => {
  return (
    <section className={s.sold}>
      <div className={s.sold__info}>
        <h2 className="title">
          I’m <span>sold!</span>
        </h2>

        <div className={classnames('text', 'sm')}>
          How do I join the greatness? <br />
          You need an NFT as an invitation to join our vaults
        </div>

        <Button color="filled">Submit wallet</Button>
      </div>

      <div className={s.sold__image}>
        <img src={SoldImg} alt="sold" />
      </div>
    </section>
  );
};

export default JoinProject;
