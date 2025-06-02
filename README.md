# shared

[![Test Coverage](https://img.shields.io/badge/coverage-38.11%25-yellow.svg)](https://github.com/ummgoban/shared)

ummgoban 공통 패키지입니다.

- ummgoban 도메인에서 공용으로 사용하는 type, utils, http client, hook 등을 관리합니다.
- 사장님앱, 고객앱에서만 사용되는 각 코드는 해당 프로젝트에서 관리합니다.

# install

```bash
yarn add @ummgoban/shared
```

# exports

- `@ummgoban/shared`
- `@ummgoban/shared/lib`
- `@ummgoban/shared/network`
- `@ummgoban/shared/react`

# dev

## create .env

```txt
# .env
NPM_TOKEN=ghp_...
```

## test

```bash
yarn test          # 테스트 실행
yarn test:watch    # 테스트 실시간 감시 모드
yarn test:coverage # 테스트 커버리지 보고서 생성
```

## 테스트 커버리지

현재 프로젝트의 테스트 커버리지는 38.11%입니다. 커버리지 보고서는 `coverage` 디렉토리에서 확인할 수 있습니다.

```bash
yarn test:coverage # 커버리지 보고서 생성 후 coverage/index.html 확인
```

커버리지 보고서에서 제외된 파일:
- `**/index.ts` 파일들
- 테스트 파일들 (`*.spec.ts`, `*.test.ts`)
- 타입 정의 파일들 (`*.d.ts`)

## dev

```bash
yarn dev
```

## lint

```bash
yarn lint
```

## format

```bash
yarn format
```

# publish

- `package.json`의 버전을 증가시킵니다. (`v[x].[y].[z]` 또는 `v[x].[y].[z]-[alpha|candy|rc].[n]`)
- `main` 브랜치에 머지 후 `git tag`로 버전을 생성한 후 `git push`를 실행합니다.

# ummgoban productions

- apps
  - [client](https://github.com/ummgoban/client-app)
  - [admin](https://github.com/ummgoban/admin-client-app)
