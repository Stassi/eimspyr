import { defineConfig } from 'rollup'
import ts from 'rollup-plugin-ts'

const rollupConfig = defineConfig({
  external: ['node:buffer', 'node:dgram'],
  input: 'src/index.ts',
  output: {
    file: 'lib/sourcemeter.mjs',
    format: 'es',
    sourcemap: true,
  },
  plugins: [ts()],
})

export default rollupConfig
