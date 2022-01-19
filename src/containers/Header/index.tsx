import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { LogoIcon } from 'components/Icons';

import { socials } from './Header.mock';

import s from './Header.module.scss';

const Header: FC = observer(() => {
  return (
    <div className={s.header}>
      <div className={s.header__navbar}>
        <a href="/" className={s.header__navbar_logo}>
          <LogoIcon />
        </a>

        <nav className={s.header__navbar_nav}>
          <a href="#home">Home</a>
          <a href="#calc">Calculate</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#faq">Faq</a>
          <a href="http://docs.gwei.fi/">Docs</a>
        </nav>

        <div className={s.header__navbar_socials}>
          {socials.map(({ href, icon, alt }) => (
            <a key={alt} href={href} className={s.header__navbar_socials_item}>
              {icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
});

export default Header;
