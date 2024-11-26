import type { SupportedLocale } from '@/consts'

export const supportedLanguages = ['de', 'en', 'es', 'zh', 'fr', 'pl', 'ru', 'uk']

export const languageNames: Record<string, string> = {
  en: 'English',
  zh: '中文',
  fr: 'Français',
  es: 'Español',
  ru: 'Русский',
  uk: 'Українська',
  de: 'German',
  pl: 'Polski'
}

export function getCurrentLocale(pathname: string): SupportedLocale {
  const segments = pathname.split('/').filter(Boolean)
  const locale = segments[0] as SupportedLocale
  const supportedLocales: SupportedLocale[] = ['de', 'en', 'es', 'zh', 'fr', 'pl', 'ru', 'uk']
  return supportedLocales.includes(locale) ? locale : 'en'
}

export function getBrandName(lang: SupportedLocale): string {
  const brandNames: Record<SupportedLocale, string> = {
    en: 'Devopsick',
    zh: 'Devopsick',
    de: 'Devopsick',
    es: 'Devopsick',
    fr: 'Devopsick',
    pl: 'Devopsick',
    ru: 'Devopsick',
    uk: 'Devopsick'
  }
  return brandNames[lang]
}

export function getSupportedLanguages(): string[] {
  return supportedLanguages
}

export function getLanguageNames(): Record<string, string> {
  return languageNames
}
