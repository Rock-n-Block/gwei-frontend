import { FC, memo } from 'react';

import cn from 'classnames';

import s from './Plate.module.scss';

interface PlateI {
  children: JSX.Element | JSX.Element[];
  className?: string;
}

const Plate: FC<PlateI> = ({ children, className }) => {
  return <div className={cn(s.plate, className)}>{children}</div>;
};

export default memo(Plate);
