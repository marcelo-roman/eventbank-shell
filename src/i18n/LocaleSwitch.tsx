import { locales } from './locale';
import { useLocale } from './LocaleContext';

const labels = { en: 'EN', 'pt-BR': 'PT' };
const names = { en: 'English', 'pt-BR': 'Português' };

export function LocaleSwitch() {
  const { locale, t, setLocale } = useLocale();

  return (
    <div className="segmented" role="radiogroup" aria-label={t.language}>
      {locales.map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          lang={option}
          aria-label={names[option]}
          aria-checked={option === locale}
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
