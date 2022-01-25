/* eslint-disable no-console */
import { SHOW_LOGS } from 'config';

export const clog = (text: string, ...data: unknown[]): void => {
  if (SHOW_LOGS) {
    console.log(text, ...data);
  }
};

export const clogGroup = (name: string, end?: boolean): void => {
  if (SHOW_LOGS) {
    if (end) {
      console.groupEnd();
      return;
    }
    console.group(name);
  }
};

export const clogError = (...errors: unknown[]): void => {
  if (SHOW_LOGS) console.error(...errors);
};
