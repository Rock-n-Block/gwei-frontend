export * from './connect';

export type TNullable<T> = T | null;
export type TOptionable<T> = T | undefined;

export interface IModalProps {
  className?: string;
  visible: boolean;
  onClose: () => void;
}

export interface TokensInfoI {
  symbol0: string;
  symbol1: string;
  balance0: string;
  balance1: string;
}
