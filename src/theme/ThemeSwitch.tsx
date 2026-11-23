import { useLocale } from '../i18n/LocaleContext';
import { MoonIcon, SunIcon } from '../layout/icons';
import { setThemePreference, type ThemePreference, useTheme, useThemePreference } from './theme';

const preferences: ThemePreference[] = ['light', 'dark', 'system'];

export function ThemeSwitch() {
  const preference = useThemePreference();
  const { t } = useLocale();

  return (
    <div className="segmented three" role="radiogroup" aria-label={t.theme.label}>
      {preferences.map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={preference === option}
          onClick={() => {
            setThemePreference(option);
          }}
        >
          {t.theme[option]}
        </button>
      ))}
    </div>
  );
}

export function ThemeToggle() {
  const theme = useTheme();
  const { t } = useLocale();
  const next = theme === 'dark' ? 'light' : 'dark';
  const label = next === 'dark' ? t.theme.useDark : t.theme.useLight;

  return (
    <button
      type="button"
      className="top-icon"
      aria-label={label}
      title={label}
      onClick={() => {
        setThemePreference(next);
      }}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
