import { FC, useCallback, useState } from 'react';

import { PrivacyText, socials, TermsText } from './Footer.mock';

import s from './Footer.module.scss';
import { FooterModal } from 'components';

const Footer: FC = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const handlePrivacyModal = useCallback(() => setIsPrivacyOpen(!isPrivacyOpen), [isPrivacyOpen]);
  const handleTermsModal = useCallback(() => setIsTermsOpen(!isTermsOpen), [isTermsOpen]);

  const showSocials = (
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
  );

  return (
    <footer className={s.footer}>
      <FooterModal
        isOpen={isPrivacyOpen}
        handleClose={handlePrivacyModal}
        title={
          <h2 className="title">
            Privacy <span>Policy</span>
          </h2>
        }
        children={PrivacyText}
      />
      <FooterModal
        isOpen={isTermsOpen}
        handleClose={handleTermsModal}
        title={
          <h2 className="title">
            Terms <span>&</span> Conditions
          </h2>
        }
        children={TermsText}
      />
      <div className={s.footer__inner}>
        <div className={s.footer__inner_madeby_mobile}>
          made by{' '}
          <a rel="noreferrer" target="_blank" href="https://roobinium.io">
            roobinium.io
          </a>
        </div>
        <div className={s.footer__inner_copyright}>
          &copy; 2021 GWEI Finance. All rights reserved
        </div>

        <div className={s.footer__inner_links}>
          <a onClick={handlePrivacyModal}>Privacy policy</a>
          <a onClick={handleTermsModal}>Terms of Use</a>
        </div>

        <div className={s.footer__inner_madeby}>
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
