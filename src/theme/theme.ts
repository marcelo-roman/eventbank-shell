import { useSyncExternalStore } from 'react';

export type ThemePreference = 'system' | 'light' | 'dark';
export type Theme = 'light' | 'dark';

const storageKey = 'eventbank.theme';
const themeColors: Record<Theme, string> = { light: '#f6f7f9', dark: '#1b1e24' };
const listeners = new Set<() => void>();
const media = window.matchMedia('(prefers-color-scheme: dark)');

function readPreference(): ThemePreference {
  try {
    const stored = window.localStorage.getItem(storageKey);
    return stored === 'light' || stored === 'dark' ? stored : 'system';
  } catch {
    return 'system';
  }
}

function storePreference(next: ThemePreference): void {
  try {
    if (next === 'system') {
      window.localStorage.removeItem(storageKey);
      return;
    }
    window.localStorage.setItem(storageKey, next);
  } catch {
    return;
  }
}

let preference = readPreference();
let theme = resolve();

function resolve(): Theme {
  if (preference !== 'system') {
    return preference;
  }
  return media.matches ? 'dark' : 'light';
}

function apply(): void {
  theme = resolve();
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColors[theme]);
  listeners.forEach((listener) => {
    listener();
  });
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

media.addEventListener('change', () => {
  if (preference === 'system') {
    apply();
  }
});
apply();

export function setThemePreference(next: ThemePreference): void {
  preference = next;
  storePreference(next);
  apply();
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, () => theme);
}

export function useThemePreference(): ThemePreference {
  return useSyncExternalStore(subscribe, () => preference);
}
