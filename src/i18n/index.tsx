import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { useDatabase } from '@/providers/DatabaseProvider';
import { allTranslations, Lang, Translations } from '@/i18n/translations';

export type { Lang };

type I18nContextValue = {
  language: Lang;
  setLanguage: (lang: Lang) => Promise<void>;
  t: (key: string, params?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

/** Résout une clé "section.field" dans l'objet de traduction. */
function resolve(obj: Record<string, unknown>, key: string): string {
  const parts = key.split('.');
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur && typeof cur === 'object') {
      cur = (cur as Record<string, unknown>)[p];
    } else {
      return key;
    }
  }
  return typeof cur === 'string' ? cur : key;
}

function buildT(lang: Lang) {
  return (key: string, params?: Record<string, string | number>): string => {
    const translations = allTranslations[lang] as unknown as Record<string, unknown>;
    const fallback = allTranslations['fr'] as unknown as Record<string, unknown>;
    let str = resolve(translations, key);
    if (str === key) str = resolve(fallback, key); // fallback FR
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        str = str.replace(`{${k}}`, String(v));
      }
    }
    return str;
  };
}

export function I18nProvider({ children }: PropsWithChildren) {
  const db = useDatabase();
  const [language, setLanguageState] = useState<Lang>('fr');

  useEffect(() => {
    db.getFirstAsync<{ value: string }>(
      "SELECT value FROM settings WHERE key = 'language'"
    ).then((row) => {
      if (row?.value && row.value in allTranslations) {
        setLanguageState(row.value as Lang);
      }
    });
  }, [db]);

  const setLanguage = useCallback(
    async (lang: Lang) => {
      await db.runAsync(
        "INSERT OR REPLACE INTO settings (key, value) VALUES ('language', ?)",
        lang
      );
      setLanguageState(lang);
    },
    [db]
  );

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => buildT(language)(key, params),
    [language]
  );

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}
