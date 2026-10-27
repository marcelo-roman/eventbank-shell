import './LocaleSwitch.css';
import { locales } from './locale';
import { useLocale } from './LocaleContext';

const labels = { en: 'EN', 'pt-BR': 'PT' };
const names = { en: 'English', 'pt-BR': 'Português' };

export function LocaleSwitch() {
  const { locale, t, setLocale } = useLocale();

  return (
    <div className="locale-switch" role="group" aria-label={t.language}>
      {locales.map((option) => (
        <button
          key={option}
          type="button"
          lang={option}
          aria-label={names[option]}
          aria-pressed={option === locale}
          onClick={() => {
            setLocale(option);
          }}
        >
          {labels[option]}
        </button>
      ))}
    </div>
  );
}
