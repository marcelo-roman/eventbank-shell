import { createContext, useContext } from 'react';
import { type Locale } from './locale';
import { type Messages } from './messages';

export interface LocaleState {
  locale: Locale;
  t: Messages;
  setLocale: (locale: Locale) => void;
}

export const LocaleContext = createContext<LocaleState | null>(null);

export function useLocale(): LocaleState {
  const state = useContext(LocaleContext);
  if (!state) {
    throw new Error('useLocale must be used inside LocaleProvider.');
  }
  return state;
}
