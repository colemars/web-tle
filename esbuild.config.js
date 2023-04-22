const esbuild = require('esbuild')
const NodeModulesPolyfillPlugin = require('@esbuild-plugins/node-modules-polyfill').NodeModulesPolyfillPlugin

esbuild.build({
  entryPoints: ['dist/tle.js'],
  bundle: true,
  platform: 'node',
  outfile: 'dist/main.bundle.js',
  plugins: [NodeModulesPolyfillPlugin()],
})