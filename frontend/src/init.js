import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index.js'

import leoProfanity from 'leo-profanity';



const ruDict = leoProfanity.getDictionary('ru');
leoProfanity.add(ruDict);

i18next 
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;