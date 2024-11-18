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

import svelte from '@astrojs/svelte'

import partytown from '@astrojs/partytown'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
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
  output: 'server',

  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),

  integrations: [react(), svelte(), mdx(), sitemap(), partytown()]
})
