import { defineConfig } from 'rollup'
import ts from 'rollup-plugin-ts'

const rollupConfig = defineConfig({
  input: 'src/index.ts',
  output: {
    file: 'lib/valping.mjs',
    format: 'es',
    sourcemap: true,
  },
  plugins: [ts()],
})

export default rollupConfig
