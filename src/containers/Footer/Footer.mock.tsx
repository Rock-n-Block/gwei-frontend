import { ReactElement } from 'react';

import { InstagramIcon, TelegramIcon, TwitterIcon, YoutubeIcon } from 'components/Icons';

interface SocialsI {
  href: string;
  icon: ReactElement;
  alt: string;
}

type SocialT = SocialsI[];

export const socials: SocialT = [
  {
    href: 'https://twitter.com/gweifinance',
    icon: <InstagramIcon />,
    alt: 'instagram',
  },
  {
    href: 'https://twitter.com/gweifinance',
    icon: <TwitterIcon />,
    alt: 'twitter',
  },
  {
    href: 'https://twitter.com/gweifinance',
    icon: <YoutubeIcon />,
    alt: 'youtube',
  },
  {
    href: 'https://twitter.com/gweifinance',
    icon: <TelegramIcon />,
    alt: 'telegram',
  },
];
