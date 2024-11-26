import { getCollection } from 'astro:content'
import { getConstants } from '@/consts'
import rss from '@astrojs/rss'

export async function GET(context) {
  const currentLocale = 'de'
  const constants = getConstants(currentLocale)

  let posts = await getCollection('posts', ({ id }) => id.startsWith('de/'))

  posts = posts.sort((a, b) => new Date(b.data.pubDate) - new Date(a.data.pubDate)).slice(0, 3)

  return rss({
    title: constants.SITE_TITLE,
    description: constants.SITE_DESCRIPTION,
    site: context.site,
    customData: '<language>de-DE</language>',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: `/de/posts/${post.slug.split('/').pop()}/`,
      pubDate: post.data.pubDate,
      content: post.body,
      customData: post.data.customData
    }))
  })
}
