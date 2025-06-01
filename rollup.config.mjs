import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import path from 'path';
import {fileURLToPath} from 'url';

import pkg from './package.json' assert {type: 'json'};

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 외부 의존성 설정
const external = [...Object.keys(pkg.peerDependencies || {})];

// 기본 플러그인
const basePlugins = [
  alias({
    entries: [{find: '@', replacement: path.resolve(__dirname, 'src')}],
  }),
  nodeResolve({extensions: ['.js', '.jsx', '.ts', '.tsx']}),
  commonjs(),
];

// 메인 번들 설정
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
  plugins: [
    ...basePlugins,
    typescript({
      tsconfig: './tsconfig.build.json',
      declaration: true,
      sourceMap: true,
      rootDir: 'src',
      jsx: 'react-jsx',
      exclude: ['**/*.{spec,test}.{ts,tsx}'],
    }),
  ],
};

// 서브패키지 설정
const subpackages = [
  {
    name: 'react',
    input: 'src/react/index.ts',
  },
  {
    name: 'http',
    input: 'src/http/index.ts',
  },
  {
    name: 'http/api-client',
    input: 'src/http/api-client/index.ts',
  },
  {
    name: 'http/error',
    input: 'src/http/error/index.ts',
  },
  {
    name: 'lib',
    input: 'src/lib/index.ts',
  },
  {
    name: 'lib/utils',
    input: 'src/lib/utils/index.ts',
  },
  {
    name: 'lib/types',
    input: 'src/lib/types/index.ts',
  },
];

// 서브패키지 설정 생성
const subpackageConfigs = subpackages.map(({name, input}) => ({
  input,
  output: [
    {
      file: `dist/${name}/index.js`,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: `dist/${name}/index.esm.js`,
      format: 'esm',
      sourcemap: true,
    },
  ],
  external: [...external, '@ummgoban/shared'],
  plugins: [
    ...basePlugins,
    typescript({
      tsconfig: `./tsconfig.build.${name.replace('/', '.')}.json`,
      declaration: false,
      sourceMap: true,
      rootDir: 'src',
      jsx: 'react-jsx',
      exclude: ['**/*.{spec,test}.{ts,tsx}'],
    }),
  ],
}));

// 모든 설정 내보내기
export default [...subpackageConfigs];
