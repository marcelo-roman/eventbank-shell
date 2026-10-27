import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { detectLocale, type Locale, storeLocale } from './locale';
import { LocaleContext, type LocaleState } from './LocaleContext';
import { messages } from './messages';

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(detectLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const state = useMemo<LocaleState>(
    () => ({
      locale,
      t: messages[locale],
      setLocale: (next) => {
        storeLocale(next);
        setLocale(next);
      },
    }),
    [locale],
  );

  return <LocaleContext value={state}>{children}</LocaleContext>;
}
