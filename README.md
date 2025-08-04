# shared

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

## test

```bash
yarn test
yarn test:watch
yarn test:coverage
```

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

## 수동 배포

1. `package.json`의 버전을 증가시킵니다. (`v[x].[y].[z]` 또는 `v[x].[y].[z]-[alpha|candy|rc].[n]`)
2. `yarn build` 후 `yarn publish:local`를 실행합니다.

## 자동 배포

1. 개발이후 pull request를 생성합니다.
2. pull request가 머지되면 github action이 실행됩니다.
3. github action이 실행되면 `release: v[x].[y].[z]`로 pull request 가 생성됩니다.
4. `release: v[x].[y].[z]` pull request가 머지되면 release tag가 생성되고 publish가 실행됩니다.

# ummgoban productions

- apps
  - [client](https://github.com/ummgoban/client-app)
  - [admin](https://github.com/ummgoban/admin-client-app)
