import {Platform, NativeModules} from 'react-native';
import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import ptBR from './ptBR/ptBR.json';
import en from './en/en.json';

function getLocale() {
  if (Platform.OS === 'android') {
    return NativeModules.I18nManager.localeIdentifier;
  } else {
    return (
      NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0]
    );
  }
}

export const resources = {
  ['pt_BR']: {
    translation: ptBR,
  },
  ['en_US']: {
    translation: en,
  },
  // iOS que retorna este tipo
  ['en_BR']: {
    translation: en,
  },
};

if (!i18next.isInitialized) {
  i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: getLocale(),
    debug: true,
    resources,
  });
}
