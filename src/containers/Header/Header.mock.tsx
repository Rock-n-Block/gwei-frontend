import { ReactElement } from 'react';

import { DiscordIcon, MediumIcon, TelegramIcon, TwitterIcon } from 'components/Icons';

interface SocialsI {
  href: string;
  icon: ReactElement;
  alt: string;
}

type SocialT = SocialsI[];

export const socials: SocialT = [
  {
    href: 'https://medium.com/@GweiFinance',
    icon: <MediumIcon />,
    alt: 'medium',
  },
  {
    href: 'https://twitter.com/gweifinance',
    icon: <TwitterIcon />,
    alt: 'twitter',
  },
  {
    href: 'https://discord.com/invite/qKCBSGJk82',
    icon: <DiscordIcon />,
    alt: 'discord',
  },
  {
    href: 'https://t.me/gweifinance',
    icon: <TelegramIcon />,
    alt: 'telegram',
  },
];
