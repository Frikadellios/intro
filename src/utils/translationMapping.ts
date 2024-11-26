type TranslationMap = Record<string, string>

const enTranslations: TranslationMap = {
  homepage: 'Homepage',
  blog: 'Blog'
}

const esTranslations: TranslationMap = {
  homepage: 'Homepage',
  blog: 'Blog'
}

const ukTranslations: TranslationMap = {
  homepage: 'Homepage',
  blog: 'Blog'
}

const ruTranslations: TranslationMap = {
  homepage: 'Homepage',
  blog: 'Blog'
}

const deTranslations: TranslationMap = {
  homepage: 'Homepage',
  blog: 'Blog'
}

const frTranslations: TranslationMap = {
  homepage: 'Homepage',
  blog: 'Blog'
}

const plTranslations: TranslationMap = {
  homepage: 'Homepage',
  blog: 'Blog'
}

const zhTranslations: TranslationMap = {
  homepage: '首页',
  blog: '文章'
}

const translationMappings: Record<string, TranslationMap> = {
  en: enTranslations,
  ru: ruTranslations,
  es: esTranslations,
  uk: ukTranslations,
  fr: frTranslations,
  de: deTranslations,
  pl: plTranslations,
  zh: zhTranslations
}

export function getTranslationByLanguage(key: string, locale: string): string {
  const translationMap = translationMappings[locale] || translationMappings.en
  return translationMap[key] || key
}
