#!/bin/sh

# microCMSからデータを取得
# microCMSサービスIDを引数から受け取る（AmplifyのpreBuild想定）
service="$1"
# 引数がない場合は.envファイルの環境変数からmicroCMSサービスIDを取得（ローカル環境想定）
if [ "$1" = "" ]; then
source .env
service="$MICROCMS_SERVICE"
fi
# microCMS API KEYを引数から受け取る（AmplifyのpreBuild想定）
key="$2"
# 引数がない場合は.envファイルの環境変数からmicroCMS API KEYを取得（ローカル環境想定）
if [ "$2" = "" ]; then
key="$MICROCMS_KEY"
fi

# 記事情報のJSONを取得
curl -L --create-dirs -o "src/data/article.json" "https://$service.microcms.io/api/v1/article" -H "X-MICROCMS-API-KEY: $key"
