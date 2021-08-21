/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */
const babelConfig = require('./babel.config')

module.exports = {
  ssr: false,
  target: 'static',
  head: {
    title: 'electron-chainlink-currencies-price',
    meta: [{ charset: 'utf-8' }]
  },
  loading: false,
  plugins: [
    { ssr: true, src: '@/plugins/icons.js' }

  ],
  buildModules: [
    '@nuxt/typescript-build'
  ],
  modules: [
    '@nuxtjs/vuetify'
  ],
  vuetify: {
    theme: {
      themes: {
        light: {
          primary: '#1867c0',
          secondary: '#b0bec5',
          accent: '#8c9eff',
          error: '#b71c1c'
        }
      }
    }
  },
  build: {
    babel: babelConfig,
    extend (config, { isDev, isClient }) {
      if (isClient && !isDev) {
        config.optimization = {
          splitChunks: {
            minSize: 16000,
            maxSize: 25000
          }
        }

        config.performance = {
          maxEntrypointSize: 1280000,
          maxAssetSize: 1280000
        }
      }
    }
  }
}
