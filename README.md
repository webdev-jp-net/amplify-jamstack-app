# AmplifyでデプロイするJamstackアプリケーション
AmplifyでデプロイするJamstackアプリケーションのサンプルリポジトリです。

## 初期設定

### 環境変数の設定

最初に`.example.env`をコピーして`.env`を設置してください。  
`MICROCMS_SERVICE`へmicroCMSのサービスIDを、`MICROCMS_KEY`へAPIキーを記載します。

### インストールコマンド

```bash:
npm ci
```

### アプリケーションの起動

```bash:
HTTPS=true npm run start
```

- ローカルサーバがhttps`3000`ポートで起動
- `src`配下で行った変更はローカルサーバへ即時反映

### ファイルを保存したタイミングでstyeleLintのfixもセットで実行

※開発マシンに負担がかかる場合は`npm run start`奨励

```bash:
HTTPS=true npm run watch
```

### microCMSからのデータ取得

```bash:
npm run get-data
```

- `curl`でmicroCMSのAPI GET
- APIから受け取ったJSONの整形
- microCMSのメディアへ登録されている画像を`curl`でダウンロード
- プロジェクト内で使用されている画像の一覧JSONを作成
  - アプリ起動時の`<link rel="preload">`で使用
