type TagMap = Record<string, string>

const zhTags: TagMap = {
  沉思: 'reflect',
  观阅: 'media',
  行走: 'roam',
  风险: 'risk',
  策略: 'strategy',
  配置: 'allocation',
  创新: 'innovation',
  模式: 'model',
  管理: 'management'
}

const esTags: TagMap = {
  reflect: 'reflect',
  media: 'media',
  roam: 'roam',
  risk: 'risk',
  strategy: 'strategy',
  allocation: 'allocation',
  innovation: 'innovation',
  model: 'model',
  management: 'management'
}

const ruTags: TagMap = {
  reflect: 'reflect',
  media: 'media',
  roam: 'roam',
  risk: 'risk',
  strategy: 'strategy',
  allocation: 'allocation',
  innovation: 'innovation',
  model: 'model',
  management: 'management'
}

const ukTags: TagMap = {
  reflect: 'reflect',
  media: 'media',
  roam: 'roam',
  risk: 'risk',
  strategy: 'strategy',
  allocation: 'allocation',
  innovation: 'innovation',
  model: 'model',
  management: 'management'
}

const frTags: TagMap = {
  reflect: 'reflect',
  media: 'media',
  roam: 'roam',
  risk: 'risk',
  strategy: 'strategy',
  allocation: 'allocation',
  innovation: 'innovation',
  model: 'model',
  management: 'management'
}

const deTags: TagMap = {
  reflect: 'reflect',
  media: 'media',
  roam: 'roam',
  risk: 'risk',
  strategy: 'strategy',
  allocation: 'allocation',
  innovation: 'innovation',
  model: 'model',
  management: 'management'
}

const plTags: TagMap = {
  reflect: 'reflect',
  media: 'media',
  roam: 'roam',
  risk: 'risk',
  strategy: 'strategy',
  allocation: 'allocation',
  innovation: 'innovation',
  model: 'model',
  management: 'management'
}

const enTags: TagMap = {
  reflect: 'reflect',
  media: 'media',
  roam: 'roam',
  risk: 'risk',
  strategy: 'strategy',
  allocation: 'allocation',
  innovation: 'innovation',
  model: 'model',
  management: 'management'
}

const tagMappings: Record<string, TagMap> = {
  zh: zhTags,
  es: esTags,
  ru: ruTags,
  fr: frTags,
  pl: plTags,
  uk: ukTags,
  de: deTags,
  en: enTags
}

function createReverseMapping(tagMap: TagMap): TagMap {
  const reverseMap: TagMap = {}
  for (const [key, value] of Object.entries(tagMap)) {
    reverseMap[value] = key
  }
  return reverseMap
}

const reverseTagMappings: Record<string, TagMap> = {
  zh: createReverseMapping(zhTags),
  es: createReverseMapping(esTags),
  de: createReverseMapping(deTags),
  fr: createReverseMapping(frTags),
  uk: createReverseMapping(ukTags),
  ru: createReverseMapping(ruTags),
  pl: createReverseMapping(plTags),
  en: createReverseMapping(enTags)
}

export function getTagByLanguage(tag: string, fromLang: string, toLang: string): string {
  const fromMapping = tagMappings[fromLang]
  const toReverseMapping = reverseTagMappings[toLang]

  if (!fromMapping || !toReverseMapping) {
    console.warn(`Missing tag mapping for: ${fromLang} or ${toLang}`)
    return tag
  }

  const commonTag = fromMapping[tag] || tag
  return toReverseMapping[commonTag] || commonTag
}

export function getEnglishTag(tag: string, fromLang: string): string {
  return getTagByLanguage(tag, fromLang, 'en')
}

export function getRussianTag(tag: string, fromLang: string): string {
  return getTagByLanguage(tag, fromLang, 'ru')
}

export function getSpainTag(tag: string, fromLang: string): string {
  return getTagByLanguage(tag, fromLang, 'es')
}

export function getFranceTag(tag: string, fromLang: string): string {
  return getTagByLanguage(tag, fromLang, 'fr')
}

export function getUkraineTag(tag: string, fromLang: string): string {
  return getTagByLanguage(tag, fromLang, 'uk')
}

export function getPollandTag(tag: string, fromLang: string): string {
  return getTagByLanguage(tag, fromLang, 'pl')
}

export function getGermanTag(tag: string, fromLang: string): string {
  return getTagByLanguage(tag, fromLang, 'de')
}

export function getChineseTag(tag: string, fromLang: string): string {
  return getTagByLanguage(tag, fromLang, 'zh')
}
