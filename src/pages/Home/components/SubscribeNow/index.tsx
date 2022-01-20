import { FC } from 'react';

import classnames from 'classnames';
import { Plate } from 'containers';

import { Button } from 'components';
import Input from 'components/Input';

import s from './SubscribeNow.module.scss';

const SubscribeNow: FC = () => {
  return (
    <Plate className={s.subscribe}>
      <h2 className="title">
        Subscribe <span>now</span>
      </h2>

      <p className={classnames('text', 'sm')}>
        Subscribe to get notified about all of our updates and progress!
      </p>

      <form action="">
        <Input
          placeholder="E-mail address"
          type="text"
          required
          onChange={() => console.log('123')}
        />
        <Button color="filled" type="submit">
          Subscribe
        </Button>
      </form>
    </Plate>
  );
};

export default SubscribeNow;
