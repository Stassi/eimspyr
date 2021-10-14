import commonjs from '@rollup/plugin-commonjs'
import { defineConfig } from 'rollup'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import ts from 'rollup-plugin-ts'

const rollupConfig = defineConfig({
  input: 'src/index.ts',
  output: {
    file: 'lib/valping.mjs',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    commonjs(),
    json(),
    nodeResolve({ preferBuiltins: true }),
    terser(),
    ts(),
  ],
})

export default rollupConfig
