import { FC, PropsWithChildren } from 'react';

import classnames from 'classnames';

import s from './Plate.module.scss';

interface PlateProps {
  className: string;
}

const Plate: FC<PropsWithChildren<PlateProps>> = ({ children, className }) => {
  return <section className={classnames(s.plate, className)}>{children}</section>;
};

export default Plate;
