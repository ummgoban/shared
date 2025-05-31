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
- `@ummgoban/shared/api-client`
- `@ummgoban/shared/utils`
- `@ummgoban/shared/types`

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
