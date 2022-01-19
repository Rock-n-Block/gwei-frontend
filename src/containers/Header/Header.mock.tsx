import { ReactElement } from 'react';

import { FacebookIcon, LinkedInIcon, TwitterIcon } from 'components/Icons';

interface SocialsI {
  href: string;
  icon: ReactElement;
  alt: string;
}

type SocialT = SocialsI[];

export const socials: SocialT = [
  {
    href: 'https://twitter.com/gweifinance',
    icon: <LinkedInIcon />,
    alt: 'linkedIn',
  },
  {
    href: 'https://twitter.com/gweifinance',
    icon: <FacebookIcon />,
    alt: 'facebook',
  },
  {
    href: 'https://twitter.com/gweifinance',
    icon: <TwitterIcon />,
    alt: 'twitter',
  },
];
