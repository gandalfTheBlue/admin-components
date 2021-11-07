import babel from '@rollup/plugin-babel'
import del from 'rollup-plugin-delete'
import less from 'rollup-plugin-less'
import external from 'rollup-plugin-peer-deps-external'

import pkg from './package.json'

export default {
  input: pkg.source,
  output: [{ file: pkg.module, format: 'esm' }],
  plugins: [
    external(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
    del({ targets: ['dist/*'] }),
    less({ insert: true, output: 'dist/index.css' }),
  ],
  external: Object.keys(pkg.peerDependencies || {}),
}
