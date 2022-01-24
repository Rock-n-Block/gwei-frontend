import { FC, memo } from 'react';
import s from './Plate.module.scss';
import cn from 'classnames';

interface PlateI {
  children: JSX.Element | JSX.Element[];
  className?: string;
}

const Plate: FC<PlateI>  = ({ children , className}) => {
  return (
    <div className={cn(s.plate, className)}>
      {children}
    </div>
  );
};

export default memo(Plate);
