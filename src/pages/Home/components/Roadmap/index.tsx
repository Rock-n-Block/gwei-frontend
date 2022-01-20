import { FC } from 'react';
import s from './Roadmap.module.scss';

const Roadmap: FC = () => {
  return (
    <section className={s.roadmap} id="roadmap">
      <h2 className="title">
        Our <span>roadmap</span>
      </h2>

      <div className={s.roadmap__inner}>
        <div className="roadmap__item plate">
          <div className="roadmap__item-date">July&nbsp;20th</div>
          <div className="roadmap__item-title">First GWEI Announcement</div>
          <ul className="roadmap__item-list">
            <li>Vaults and strategy development</li>
            <li>Back-testing</li>
            <li>Data analysis, polishing our strategy to perfection</li>
            <li>JIT sandwich strategy development</li>
            <li>Mempool monitoring system and Flashbots integration</li>
          </ul>
        </div>

        <div className="roadmap__item plate">
          <div className="roadmap__item-date">December&nbsp;15th</div>
          <div className="roadmap__item-title">Alpha Pools launch</div>
          <ul className="roadmap__item-list">
            <li>1st batch of NFTs sent out as invitations to our alpha vault/pool</li>
            <li>Limited caps</li>
            <li>Audit of contracts</li>
            <li>Reaching $3M TVL for JIT sandwich strategy activation</li>
          </ul>
        </div>

        <div className="roadmap__item plate">
          <div className="roadmap__item-date">January&nbsp;31th</div>
          <div className="roadmap__item-title">A new Era</div>
          <ul className="roadmap__item-list">
            <li>Governance Discussion</li>
            <li>Token Launch</li>
            <li>Arbitrum/Optimism</li>
            <li>New Pools</li>
            <li>Advanced Strategies</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
