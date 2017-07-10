import { Language } from './intl.enum'
import { translations as en } from './translations/en'
import { translations as fr } from './translations/fr'

export interface IntlState {
  currentLanguage: Language
  fallbackLanguage: Language
  translations: Map<Language, Map<string, string>>
}

const translations = new Map<Language, Map<string, string>>()

translations.set(Language.ENGLISH, en)
translations.set(Language.FRENCH, fr)

export const state: IntlState = {
  currentLanguage: Language.ENGLISH,
  fallbackLanguage: Language.ENGLISH,
  translations,
}
