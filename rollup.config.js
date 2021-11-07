import babel from '@rollup/plugin-babel'
import del from 'rollup-plugin-delete'
import less from 'rollup-plugin-less'
import external from 'rollup-plugin-peer-deps-external'

import pkg from './package.json'

export default {
  input: pkg.source,
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'esm' },
  ],
  plugins: [
    external(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
    del({ targets: ['dist/*'] }),
    less({ output: 'dist/admin-components.css' }),
  ],
  external: Object.keys(pkg.peerDependencies || {}),
}
