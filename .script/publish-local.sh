#!/bin/bash
# 로컬에서 배포시 tag, release를 생성하지 않음
# 직접 version을 수정하고 publish를 실행
# tag와 release를 직접 생성

sh .script/pre-install.sh

yarn npm publish --access=public

sh .script/post-install.sh
