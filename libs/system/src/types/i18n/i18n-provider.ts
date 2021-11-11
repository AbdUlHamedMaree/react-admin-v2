import { Translate } from './translate';

export type I18nProvider = {
  translate: Translate;
  changeLocale: (locale: string, options?: unknown) => Promise<void>;
  getLocale: () => string;
  [key: string]: unknown;
};
