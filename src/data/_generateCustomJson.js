const fs = require('fs');

/**
 * 外部JSONを読込
 *
 * @desc _getDataがmicroCMSのAPIからcurlで取得したJSONの内容を読み込んでいます
 *
 * @param {string} file ファイル名の文字列
 */
const getArticleJson = file => {
  const jsonObject = JSON.parse(fs.readFileSync(`src/data/${file}`, 'utf8'));
  // contents を取り出す
  const { contents } = jsonObject;

  // データをID(数値化)昇順で並べる
  return contents.sort((x, y) => +x.id - +y.id);
};

/**
 * 画像ダウンロードを実行するsh生成
 *
 * @desc microCMSのサービス内メディアから、
 * 記事へ登録されている画像を
 * [画像API](https://document.microcms.io/image-api/introduction)経由でフォーマットしてダウンロードするシェル
 * _getMedia.shを生成します。
 *
 * @param contents 写真を含むJSON
 * @return {string} 画像の数だけのcurl
 */
const generateGetMedia = ({ contents, imgApiOption, path, key }) => {
  // JSONをループして、_getMedia.shへ書込む画像ダウンロードのcurlの本文を生成
  const imageList = contents.map(item => {
    const file = item.image.url;
    const name = file && `${path}${item[key]}.webp`;

    // コピーライトフィールドが存在している場合は画像に合成する
    let copyright = '';
    if (item.copyright)
      copyright =
        '&txt=' + encodeURIComponent(item.copyright) + '&txt-size=20&txt-color=fff&txt-pad=40';

    // メディアの画像情報がある場合のみcurlの行を生成して追加
    return file && `curl -L --create-dirs -o "${name}" "${file}${imgApiOption}${copyright}"`;
  });

  // 改行区切りの文字列へ変換して返す
  return imageList.join('\n');
};

/**
 * 改行文字区切りの配列を作成
 *
 * @desc microCMSの複数行入力可能なテキストエリアの値が\n改行なので、
 * 改行区切りで配列に変換して返します。convertedArticleJsonから呼び出すユーティリティ関数です。
 *
 * @param {string} textarea
 * @returns {Array} 配列
 *
 * @example convertedArray('text text text\ntext text text')
 * // return ['text text text','text text text']
 */
const convertedArray = textarea => textarea.split('\n');

/**
 * 改行文字を<br />へ変換したHTMLを作成
 *
 * @desc microCMSの複数行入力可能なテキストエリアの値が\n改行なので、
 * <br />タグに変換して返します。convertedArticleJsonから呼び出すユーティリティ関数です。
 *
 * @param {string} textarea
 * @returns {string} HTML
 *
 * @example convertedArray('text text text\ntext text text')
 * // return 'text text text<be />text text text'
 */
const convertedHtml = textarea => textarea.replace(/\n/g, '<br />');

/**
 * 配列を文字列へ変換
 *
 * @desc microCMSのセレクトで単一選択された値が1つのstring要素のみ持つ配列になっているため、
 * 文字列に変換して返します。convertedArticleJsonから呼び出すユーティリティ関数です。
 *
 * @param {Array} array
 * @returns {string} 文字列
 *
 * @example convertedString(['text'])
 * // return 'text'
 */
const convertedString = array => array[0];

/**
 * 記事情報のjsonを取扱いやすい形式に整形
 *
 * @desc APIから受け取ったmicroCMSの書式になっているJSONを取り扱いやすい形式に整形します
 *
 * - 本文の改行をbrタグに変換。
 * - 写真情報を削除。写真は記事のIDを名称としてダウンロードされるので、メディアでの置き場所を表す値は不要になるため。
 *
 * @param contents 記事情報のJSON
 * @returns {Array} 整形済のJSON
 */
const convertedArticleJson = contents => {
  // 冗長な配列やfieldIdを削除し整形する
  return contents.map(content => {
    // 本文の改行をbrタグに変換
    const body = convertedHtml(content.body);

    // 合成
    const result = Object.assign({}, content, {
      body,
    });

    // 写真情報を削除
    delete result.image;

    // 更新日時の情報を削除
    delete result.createdAt;
    delete result.updatedAt;
    delete result.publishedAt;
    delete result.revisedAt;

    return result;
  });
};

/**
 * @desc _getDataがmicroCMSのAPIからcurlで取得したJSONをもとに、以下を実行します
 *
 * 1. 画像ダウンロードを実行するsh生成
 * 2. 施設情報のjsonを取扱いやすい形式に整形
 * 3. 施設リストに登場している都道府県のjsonを生成
 * 4. 各施設ごとの最寄り順リストを生成
 */
const initial = () => {
  const articleJson = getArticleJson('article.json');

  // 画像ダウンロードを実行するsh生成
  const getMedia = generateGetMedia({
    contents: articleJson,
    imgApiOption: '?fit=clamp&w=750',
    path: 'src/images/article/',
    key: 'id',
  }); // 記事内の写真 ... 画像の切り抜きや歪みなしに幅750pxのエリアへフィットさせる

  fs.writeFileSync('src/data/getMedia.sh', ['#!/bin/sh', getMedia].join('\n')); // shファイルとして保存

  // 記事情報のjsonを取扱いやすい形式に整形
  const convertedContent = convertedArticleJson(articleJson);
  fs.writeFileSync('src/data/articleList.json', JSON.stringify(convertedContent)); // jsonファイルとして保存
};

initial();
