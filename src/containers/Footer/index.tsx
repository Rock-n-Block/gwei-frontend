import { FC, useMemo } from 'react';
import s from './Footer.module.scss';
import { socials } from './Footer.mock';

const Footer: FC = () => {
  const showSocials = useMemo(
    () => (
      <>
        {socials.map(({ href, icon, alt }) => (
          <a
            target="_blank"
            key={alt}
            href={href}
            className={s.footer__inner_socials_item}
            rel="noreferrer"
          >
            {icon}
          </a>
        ))}
      </>
    ),
    [],
  );

  return (
    <footer className={s.footer}>
      <div className={s.footer__inner}>
        <div className={s.footer__inner_copyright}>
          &copy; 2021 GWEI Finance. All rights reserved
        </div>

        <div className={s.footer__inner_links}>
          <a href="/">Privacy policy</a>
          <a href="/">Terms of Use</a>
        </div>

        <div>
          made by{' '}
          <a rel="noreferrer" target="_blank" href="https://roobinium.io">
            roobinium.io
          </a>
        </div>

        <div className={s.footer__inner_socials}>{showSocials}</div>
      </div>
    </footer>
  );
};

export default Footer;
