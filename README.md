# webpages

## ディレクトリ構成
### src
- css
  * `index.scss`をコンパイルして、`index.css` が生成される。`index.css`は未圧縮で、ソースマップが埋め込まれている。
  * `$ npm run build` が実行されると、`index.css`は、ベンダープレフィックスが付与・圧縮されて、コメント・ソースマップが除去されて本番環境用のコードになる。
  * 本番環境用のコードになった`index.css`は、`public/index.html`でインライン展開される。
  * `public/index.html`にインライン展開されるので、`index.css`、`index.css`は、`.gitignore`に含めている。
- js
	* `public/index.html` でインライン展開される。
- scss
	* `index.scss`がコンパイルされて、`src/css/index.css`が生成される。

### img
* 画像を配置する。
* コーディング作業で編集する`index.html`と、本番環境で使われる`public/index.html`からは、画像の相対パスが同様。

### public

- js,cssがインライン展開された `index.html` が生成される。

## 環境インストール

nodeのバージョンを、*v8.11.4*にしておく。

```
$ npm i
```

## コーディング作業開始

```
$ npm start
```

1. ローカルサーバーが立ち上がり、ブラウザーが`http://localhost:3002/`を自動起動する。
1. `src/`にある`.html`, `.css`, `.js`を変更(保存)すると、ブラウザーが自動更新する。
1. `src/img`にある画像も変更があれば、ブラウザーが自動更新する。
1. `.css`, `.js`は、ビルド時に`.html`にインライン展開されます。*相対パス*指定をしていないと、ビルドが失敗します。
1. 画像は、絶対パス指定でも問題ないですが、`.html`にかくサブリソースは、*相対パス*に統一していると良いでしょう。
1. `.scss`を変更すると、`.css`へ自動コンパイルされる。

## Lintチェック

```
$ npm run fix:scss
```

`.scss`からLintエラーをなくすようにお願いします。

## リリースビルド
```
$ npm run build
```
- `.js`, `.css`がインライン展開された`index.html`が生成される。
- `src/img/*`と`public/img/*`が同期されます。
- ciでビルドが行われることを想定して、`public/**/*.html`、`public/img/**/*`、`src/css/**/*.css`を`.gitignore` に指定した。
- 結果、ciでビルドされた後の本番公開用ファイルは、`public/`配下の`.html`と`public/img/`配下の画像ファイルになります。
- `src/css/.gitkeep`、`src/img/.gitkeep`、`public/img/.gitkeep`は、残しておかないとciでビルドで行われるときに不具合が起こるので、消さないでください。
