import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import path from 'path';
import {fileURLToPath} from 'url';

import pkg from './package.json' assert {type: 'json'};

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  external: [...Object.keys(pkg.peerDependencies || {}), ...Object.keys(pkg.dependencies || {})],
  plugins: [
    alias({
      entries: [{find: '@', replacement: path.resolve(__dirname, 'src')}],
    }),
    nodeResolve({extensions: ['.js', '.jsx', '.ts', '.tsx']}),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.build.json',
      declaration: true,
      declarationDir: 'dist',
      outDir: 'dist',
      sourceMap: true,
      rootDir: 'src',
      jsx: 'react-jsx',
    }),
  ],
};
