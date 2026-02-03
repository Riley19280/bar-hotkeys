import { supportedLocales } from '@/i18n/supportedLocales'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next'

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend((language, namespace) => import(`./locales/${language}/${namespace}.json`)))
  .init({
    debug: false,
    supportedLngs: supportedLocales,
    ns: [
      'features',
      'interface',
      'tips',
      'units',
    ],
    defaultNS: 'units',
    // if you see an error like: "Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz"
    // set returnNull to false (and also in the i18next.d.ts options)
    // returnNull: false,
  })

i18next.loadNamespaces('units')
