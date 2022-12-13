#!/bin/sh

# 画像データ一覧を取得
LF=$'\n' # 改行文字

# 画像ファイル
components="src/components/*"
componentsList=`find $components -type f -name '*.webp' -or -name '*.png' -or -name '*.svg'`
for file in $componentsList; do
  jsonComponents+=",${LF}        \"${file#src/components/}\""
done
images="src/images/*"
imagesList=`find $images -type f -name '*.webp' -or -name '*.png' -or -name '*.svg'`
for file in $imagesList; do
  jsonData+=",${LF}        \"${file#src/images/}\""
done

# printfでJSON化
printf '{
    "components": [%s
    ],
    "images": [%s
    ]
}' "${jsonComponents#,}" "${jsonData#,}" > src/data/imageList.json
