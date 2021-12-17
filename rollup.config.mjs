import { defineConfig } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import ts from 'rollup-plugin-ts'

const rollupConfig = defineConfig([
  {
    external: ['node:process', 'node:util'],
    input: 'src/cli.ts',
    output: {
      file: 'lib/cli.cjs',
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [commonjs(), nodeResolve(), ts()],
  },
  {
    external: ['node:buffer', 'node:dgram'],
    input: 'src/index.ts',
    output: [
      {
        file: 'lib/eimspyr.cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'lib/eimspyr.mjs',
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [nodeResolve(), ts()],
  },
])

export default rollupConfig
