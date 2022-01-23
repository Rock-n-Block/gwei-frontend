import { FC, useMemo } from 'react';

import classnames from 'classnames';

import { LiquidityCard } from './components';
import { CardI, cardInfo } from './components/LiquidityCard/LiquidityCard.mock';

import s from './Liquidity.module.scss';

const Liquidity: FC = () => {
  const showCards = useMemo(
    () => (
      <>
        {cardInfo.map((card: CardI, index: number) => (
          <LiquidityCard key={`${index}_${card}`} {...card} index={index} />
        ))}
      </>
    ),
    [],
  );
  return (
    <div className={s.liquidity}>
      <h2 className="title">
        Liquidity Vaults <br /> for <span>Uniswap&nbsp;V3</span>
      </h2>
      <div className={s.liquidity__row}>
        {showCards}
        <div className={classnames(s.liquidity__row_block, s.liquidity__row_block_soon)}>
          More vaults coming soon!
        </div>
      </div>
    </div>
  );
};
export default Liquidity;
