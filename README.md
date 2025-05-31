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
- `@ummgoban/shared/react`
- `@ummgoban/shared/types`
- `@ummgoban/shared/utils`
- `@ummgoban/shared/http`
- `@ummgoban/shared/http/error`
- `@ummgoban/shared/http/api-client`

# dev

## create .env

```txt
# .env
NPM_TOKEN=ghp_...
```

## test

```bash
yarn test
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

- `package.json`의 버전을 증가시킵니다. (`v[x].[y].[z]` 또는 `v[x].[y].[z]-[alpha|candy|rc].[n]`)
- `main` 브랜치에 머지 후 `git tag`로 버전을 생성한 후 `git push`를 실행합니다.
