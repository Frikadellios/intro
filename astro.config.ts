// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config'

import cloudflare from '@astrojs/cloudflare'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'

import postCssOklabPolyfill from '@csstools/postcss-oklab-function'
import tailwindcss from '@tailwindcss/vite'
import legacy from '@vitejs/plugin-legacy'
import autoprefixer from 'autoprefixer'
import cssDiscardComments from 'postcss-discard-comments'
import Inspect from 'vite-plugin-inspect'
import lightningcss from 'vite-plugin-lightningcss'

import partytown from '@astrojs/partytown'
import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
import icon from 'astro-icon'
import pagefind from 'astro-pagefind'
import robotsTxt from 'astro-robots-txt'
import rehypeExternalLinks from 'rehype-external-links'
import AutoImport from 'unplugin-auto-import/astro'
import { remarkModifiedTime } from './src/utils/remark-modified-time.mjs'

import { SITE } from './src/consts.ts'
import { Locales, baseLocale } from './src/consts.ts'
const sitemapLocales = Object.fromEntries(Locales.map((_, i) => [Locales[i], Locales[i]]))

// https://astro.build/config
export default defineConfig({
  experimental: {
    contentCollectionCache: true
  },
  site: SITE || 'localhost:4321',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: baseLocale,
    locales: Locales,
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true
    }
  },
  vite: {
    build: {
      minify: true,
      cssMinify: 'lightningcss',
      chunkSizeWarningLimit: 3000 // Increase the limit to 3000 kB
    },
    css: {
      postcss: {
        plugins: [postCssOklabPolyfill({ preserve: true }), autoprefixer(), cssDiscardComments({ removeAll: true })]
      }
    },
    server: {
      fs: {
        allow: ['../..']
      }
    },
    ssr: {
      external: ['node:buffer', 'three']
    },
    plugins: [
      lightningcss({
        browserslist: ['>= 0.25%', 'last 2 versions', 'maintained node versions', 'Firefox ESR', 'not dead'] // Correctly set browser queries
      }),
      tailwindcss(),
      legacy({
        targets: ['>= 0.25%', 'last 2 versions', 'maintained node versions', 'Firefox ESR', 'not dead']
      }),
      Inspect({
        build: false,
        outputDir: '.vite-inspect'
      })
    ]
  },
  output: 'hybrid',
  image: { service: passthroughImageService() },
  adapter: cloudflare({
    imageService: 'cloudflare',
    mode: 'directory',
    functionPerRoute: true,
    routes: {
      strategy: 'auto'
    },
    platformProxy: {
      enabled: true
    }
  }),
  prefetch: {
    prefetchAll: true
  },
  markdown: {
    remarkPlugins: [remarkModifiedTime],
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true
    },
    gfm: true,
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          content: { type: 'text', value: ' ↗' },
          target: '_blank',
          rel: ['nofollow', 'noreferrer']
        }
      ]
    ]
  },
  integrations: [
    sitemap({
      entryLimit: 10000,
      i18n: {
        filter: (page) => page.secret !== true,
        defaultLocale: baseLocale,
        locales: sitemapLocales
      }
    }),
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        theme: 'github-dark-dimmed',
        wrap: true
      },
      gfm: true
    }),
    robotsTxt({
      sitemap: 'https://www.devopsick.com/sitemap-0.xml',
      host: 'devopsick.com'
    }),
    AutoImport({
      defaultExportByFilename: false,
      include: [/\.[tj]sx?$/, /\.md$/],
      packagePresets: ['detect-browser-es'],
      imports: ['react', 'react-router', 'react-i18next'],
      viteOptimizeDeps: true,
      injectAtEnd: true,
      dirs: ['./src/utils/*.ts', './src/hooks'],
      dts: '.astro/auto-imports.d.ts'
    }),
    pagefind(),
    icon({
      include: {
        tabler: ['*'],
        mdi: ['*'],
        'material-symbols': ['*'],
        flagpack: ['*'],
        'flat-color-icons': ['*']
      }
    }),
    partytown({
      config: {
        forward: ['dataLayer.push']
      }
    }),
    react(),
    svelte()
  ]
})
