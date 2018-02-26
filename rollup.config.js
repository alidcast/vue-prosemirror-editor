import resolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import vue from 'rollup-plugin-vue'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify-es'
import filesize from 'rollup-plugin-filesize'
import pkg from './package.json'

const version = process.env.VERSION || pkg.version

let globals = {}
let external = []
;('model transform state view keymap inputrules history commands schema-basic ' +
  'schema-list dropcursor menu example-setup gapcursor').split(' ').forEach(name => {
  globals['prosemirror-' + name] = 'PM.' + name.replace(/-/g, '_')
  external.push('prosemirror-' + name)
})

export default {
  input: `src/index.js`,
  output: {
    file: `dist/index.js`,
    format: 'cjs',
    globals,
    exports: 'named'
  },
  external,
  name: `vueProse`,
  plugins: [
    json(),
    resolve({
      preferBuiltins: false
    }),
    vue({
      compileTemplate: true
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    uglify(),
    filesize()
  ],
  banner: `
    /**
    * Vue Prosemirror v${version}
    * (c) ${new Date().getFullYear()} Studbits
    * @license MIT
    */
   `
}
