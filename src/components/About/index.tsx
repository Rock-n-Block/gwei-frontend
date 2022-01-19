import classnames from 'classnames';
import { Button } from 'components';
import { FC } from 'react';
import s from './About.module.scss';

const About: FC = () => {
  return (
    <div className={s.about}>
      <h1 className="title">
        GWEI <span>finance</span>
      </h1>

      <div className={classnames('text', 'sm', 'center')}>
        Your Path to Simple Active Liquidity <br /> Management on Uniswap V3
      </div>

      <div className={s.about__buttons}>
        <Button color="filled" modal-target="#soon">
          USE GWEI
        </Button>
        <Button href="http://docs.gwei.fi/">SHOW MORE</Button>
      </div>
    </div>
  );
};

export default About;
