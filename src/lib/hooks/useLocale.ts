import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';

i18n.use(initReactI18next);

export const useLocale = () => {
  const { i18n, t } = useTranslation('common');

  return {
    i18n,
    t
  };
};
