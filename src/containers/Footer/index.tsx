import { FC, useState } from 'react';

import { FooterModal } from 'components';

import { PrivacyText, socials, TermsText } from './Footer.mock';

import s from './Footer.module.scss';

const Footer: FC = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const handlePrivacyModal = () => setIsPrivacyOpen(!isPrivacyOpen);
  const handleTermsModal = () => setIsTermsOpen(!isTermsOpen);

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
      >
        {PrivacyText}
      </FooterModal>
      <FooterModal
        isOpen={isTermsOpen}
        handleClose={handleTermsModal}
        title={
          <h2 className="title">
            Terms <span>&</span> Conditions
          </h2>
        }
      >
        {TermsText}
      </FooterModal>
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
          <div onClick={handlePrivacyModal}>Privacy policy</div>
          <div onClick={handleTermsModal}>Terms of Use</div>
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
