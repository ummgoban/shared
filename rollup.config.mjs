import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';
import path from 'path';
import {fileURLToPath} from 'url';

import pkg from './package.json' assert {type: 'json'};

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 공통 플러그인 설정 (TypeScript 제외)
const createCommonPlugins = () => [
  alias({
    entries: [{find: '@', replacement: path.resolve(__dirname, 'src')}],
  }),
  nodeResolve({
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    browser: true,
    preferBuiltins: false,
  }),
  commonjs(),
  json(),
];

// 메인 패키지용 TypeScript 플러그인
const createMainTypescriptPlugin = () =>
  typescript({
    tsconfig: './tsconfig.build.json',
    declaration: true,
    declarationDir: 'dist',
    outDir: 'dist',
    sourceMap: true,
    rootDir: 'src',
    jsx: 'react-jsx',
    exclude: ['**/*.{spec,test}.{ts,tsx}'],
  });

// 외부 의존성 설정
const external = [
  ...Object.keys(pkg.peerDependencies || {}),
  ...Object.keys(pkg.dependencies || {}),
  'axios',
  'react',
  'react-native',
];

// 메인 패키지 설정
const mainConfig = {
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
  external,
  plugins: [...createCommonPlugins(), createMainTypescriptPlugin()],
};

export default [mainConfig];
