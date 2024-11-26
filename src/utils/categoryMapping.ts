type CategoryMap = Record<string, string>

const zhCategories: CategoryMap = {
  天干: 'life',
  地支: 'invest',
  五行: 'build'
}

const enCategories: CategoryMap = {
  life: 'life',
  invest: 'invest',
  build: 'build'
}

const plCategories: CategoryMap = {
  life: 'life',
  invest: 'invest',
  build: 'build'
}

const ukCategories: CategoryMap = {
  life: 'life',
  invest: 'invest',
  build: 'build'
}

const esCategories: CategoryMap = {
  life: 'life',
  invest: 'invest',
  build: 'build'
}

const frCategories: CategoryMap = {
  life: 'life',
  invest: 'invest',
  build: 'build'
}

const ruCategories: CategoryMap = {
  life: 'life',
  invest: 'invest',
  build: 'build'
}

const deCategories: CategoryMap = {
  life: 'life',
  invest: 'invest',
  build: 'build'
}

const categoryMappings: Record<string, CategoryMap> = {
  zh: zhCategories,
  es: esCategories,
  fr: frCategories,
  ru: ruCategories,
  uk: ukCategories,
  de: deCategories,
  pl: plCategories,
  en: enCategories
}

function createReverseMapping(categoryMap: CategoryMap): CategoryMap {
  const reverseMap: CategoryMap = {}
  for (const [key, value] of Object.entries(categoryMap)) {
    reverseMap[value] = key
  }
  return reverseMap
}

const reverseCategoryMappings: Record<string, CategoryMap> = {
  zh: createReverseMapping(zhCategories),
  fr: createReverseMapping(frCategories),
  pl: createReverseMapping(plCategories),
  de: createReverseMapping(deCategories),
  es: createReverseMapping(esCategories),
  uk: createReverseMapping(ukCategories),
  ru: createReverseMapping(ruCategories),
  en: createReverseMapping(enCategories)
}

export function getCategoryByLanguage(category: string, fromLang: string, toLang: string): string {
  const fromMapping = categoryMappings[fromLang]
  const toReverseMapping = reverseCategoryMappings[toLang]

  if (!fromMapping || !toReverseMapping) {
    console.warn(`Missing category mapping for: ${fromLang} or ${toLang}`)
    return category
  }

  const commonCategory = fromMapping[category] || category
  return toReverseMapping[commonCategory] || commonCategory
}

export function getEnglishCategory(category: string, fromLang: string): string {
  return getCategoryByLanguage(category, fromLang, 'en')
}

export function getSpainCategory(category: string, fromLang: string): string {
  return getCategoryByLanguage(category, fromLang, 'es')
}

export function getRussianCategory(category: string, fromLang: string): string {
  return getCategoryByLanguage(category, fromLang, 'ru')
}

export function getUkrainianCategory(category: string, fromLang: string): string {
  return getCategoryByLanguage(category, fromLang, 'uk')
}

export function getPollandCategory(category: string, fromLang: string): string {
  return getCategoryByLanguage(category, fromLang, 'pl')
}

export function getFranceCategory(category: string, fromLang: string): string {
  return getCategoryByLanguage(category, fromLang, 'fr')
}

export function getGermanCategory(category: string, fromLang: string): string {
  return getCategoryByLanguage(category, fromLang, 'de')
}

export function getChineseCategory(category: string, fromLang: string): string {
  return getCategoryByLanguage(category, fromLang, 'zh')
}
