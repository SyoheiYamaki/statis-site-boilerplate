# 静的サイトを制作する開発環境

## 静的サイトとは

サーバーサイドでは特に処理を行わず、ブラウザからのリクエストに対して、そのままファイルをレスポンスするサイトのことです。

## 誰が静的サイトをつくるのか

マークアップエンジニアや、Web制作会社のような発注先の作業者が静的サイトを実装する想定です。
  
実装者は、ローカルファイルに対してマークアップやスタイルを実装していくと、ウェブサイトが出来上がることを期待しているものとします。

## システムの要件

### 1ディレクトリで完結

ビルド対象のソースファイルは、`src` ディレクトリ、 ビルド後のリソースは `public` ディレクトリにあって、それぞれ1ディレクトリで完結しています。

### マルチブラウザ対応

css や、 JavaScriptのマルチブラウザ対応は、publicビルド時に自動補完されている。

### 簡易ビルド

デバッグ時は、 `src` ディレクトリのリソースを参照している。

### BrowserSync

デバッグ時は、頻繁にコードを変更するのBrowserSyncを使って、ソースコード変更を検知してブラウザがオートリロードする。

### inline展開

サイト固有のcss、JavaScriptは、htmlにインライン展開されている。

### SourceMap

デバッグ時のcssは、SourceMapに対応してしている。

### デバッグビルド

ビルド待ちが開発の負担になる。  
  
デバッグ時のcss, JavaScriptはマルチブラウザ対応のビルドは行わない。

### lintチェック

publicビルド時にlintチェックを行う。

- stylelint->prettier

- eslint->prettier

## シンプルなコーディング環境を目指しました

### 開発環境に込めたメッセージ

- 開発プラットフォームやエディタ、さらに言語さえも実装者にとっては、押し付けられるものでしかなく、ビルド環境を構築した側と、ウェブ製作者の理想は必ずしも一致しないと仮説を立てました。

- 実装や設計に関しては、ただひたすらウェブ制作者に移譲するほうが良い。

- しかし、ソースコードレベルでは、ブレを少なくする様に適度に標準化されたコードを求めるようにします。

### モジュールバンドラーは使わない

- モジュール化されたJavaScriptをバンドルするようなシステムは、ソースコードと画面を対応させるのが難しいと思う方がいるかもしれません。

- 作業を行える人材をスケールさせるために、求められる技術水準が高度なモジュールバンドラーは採用しません。

### テンプレートエンジンは使わない

- 標準なHTMLの方が、ネット上の情報など、そのまま使える事が多いです。`Haml` `Slim` `Pug` は、コードが短くなり便利ですが調べながらの開発だと、かえって負担になる場合があります。

- HTMLは、エディタ側でコード補完が充実してきているので、マークアップの工数には影響が少ないと考えています。

### 主役はHTMLファイル

- ライブラリはCDNを使います。HTMLのhead要素を参照すれば、どんなライブラリが使われているか分かるようにします。

- HTMLファイルを見ればどんな内容のサイトなのか分かるようにする

## 構成ファイル

### ディレクトリ構造

```  
/  
├ build  
│ └ inline.js  
├ public  
│ └ img  
│ 　 └ .gitkeep  
├ src  
│ ├ css  
│ │ └ .gitkeep  
│ ├ img  
│ │ └ .gitkeep  
│ ├ js  
│ │ ├ .gitkeep  
│ │ ├ index.js  
│ │ └ plugin.js  
│ ├ lib  
│ │ └ .gitkeep  
│ ├ scss  
│ │ ├ .gitkeep  
│ │ └ index.scss  
│ └ index.html  
├ .babelrc  
├ .eslintrc.json  
├ .gitignore  
├ .stylelintrc.js  
├ package.json  
└ postcss.config.js  
```		

### HTML

#### HTML5 Boilerplate

長期に渡ってメンテナンスされていて、信頼できるボイラープレートなので、デフォルトのテンプレートとして採用しました。  
	
>  https://html5boilerplate.com/

#### index.html

<details>  
<summary>コード</summary>
```html  
<!doctype html>
<html class="no-js" lang="ja">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="manifest" href="site.webmanifest">
    <link rel="apple-touch-icon" href="icon.png">
    <!-- Place favicon.ico in the root directory -->
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap-reboot.min.css">
    <style>.hello-world{color:#00f}</style>
  </head>
  <body>
    <!--[if lte IE 9]>
      <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>  
    <![endif]-->  
    <!-- Add your site or application content here -->
    <p class="hello-world">Hello UUUM! This is HTML5 Boilerplate.</p>
    <script src="//cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script>
    <script src="//code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script>// Add your jQuery plugin implements here...</script>
    <script>// Add your javascript implements here.</script>
    <!-- Google Analytics: change UA-XXXXX-Y to be your site's ID. -->
    <script>
      window.ga = function () { ga.q.push(arguments) }; ga.q = []; ga.l = +new Date;
      ga('create', 'UA-XXXXX-Y', 'auto'); ga('send', 'pageview')
    </script>
    <script src="//www.google-analytics.com/analytics.js" async defer></script>
  </body>
</html>
```  
</details>

#### reboot.css

#### inline-source

`<script>` `<link>` のタグ属性に `inline` を含ませると、`src` や `href` で指定されたコードがインライン展開されます。  
	
> https://github.com/popeindustries/inline-source

#### inline.js

HTMLファイル 中の `inline` 属性を処理するスクリプトです。  
	
```js  
const { inlineSource } = require("inline-source");
const fs = require("fs");
	
const dir_in = "./src/";
const dir_out = "./public/";
// ファイル名の一覧
const filenames = fs.readdirSync(dir_in);
	
var fileList = filenames.filter(function(file) {
  return /.*\.html$/.test(file); //絞り込み
});  
function setInline(target) {
  inlineSource(dir_in + target, {
    compress: false
  }).then(html => {
    fs.writeFileSync(dir_out + target, html);
  });  
}  
fileList.forEach(function(name) {
  setInline(name);
});  
```  

このスクリプトを実行すると、以下のように記述されたタグは、コードがインライン展開されます。

#### JavaScript

```html  
<script inline src="./js/plugin.js"></script>  
```

#### css

```html  
<link rel="stylesheet" href="./css/index.css" inline>  
```

#### 参考

- [https://lifetime-support.com/2018/07/25/html5-template/](https://lifetime-support.com/2018/07/25/html5-template/)
- [https://coliss.com/articles/build-websites/operation/work/html5-template-for-2018.html/](https://coliss.com/articles/build-websites/operation/work/html5-template-for-2018.html/)
- [https://coliss.com/articles/build-websites/operation/css/new-reset-rebootcss.html](https://coliss.com/articles/build-websites/operation/css/new-reset-rebootcss.html)

### JS

#### plugin.js

jQueryプラグインを使ったスクリプトの実装を行います。

#### index.js

jQueryプラグインに依存しないスクリプトの実装を行います。

### Scss

#### index.scss

個別のスタイル実装を行います。 コンパイルされて `/src/css` へ `.css` が生成されます。

### 各種画像

HTML, Scss, JavaScriptから参照する画像を配置します。各ファイルのパスは、 `index.html` がある階層を `/` として、絶対パスで指定します。

### Altjsは使わない

コーダーの必要スキルを引き下げるために、JavaScript以外のスクリプトは要求しません。

## npm-scripts

以下が、組み上げたnpm-scriptsです。  

```json  
{  
    "inline": "node ./build/inline.js",  
    "build:img": "cpx \"./src/img/**/*\" ./public/img",  
    "build:html": "run-s babel sass postcss inline",  
    "build": "run-p build:*",  
    "postcss": "postcss src/css --dir src/css",  
    "sass": "node-sass -r src/scss  -o src/css --source-map-embed --output-style expanded",  
    "babel": "babel src/js --out-dir src/lib",  
    "watch:sass": "node-sass -r src/scss  -o src/css --source-map-embed --output-style expanded -w",  
    "watch:babel": "babel src/js --watch --out-dir src/lib",  
    "lint:sass": "stylelint 'src/scss/**/*.scss' --fix",  
    "lint:js": "eslint src/js/**/*.js --fix",  
    "lint": "run-p lint:*",  
    "sync": "browser-sync start -s './src' -w 'src/*.html' 'src/css/*.css' 'img/*' 'src/lib/*.js'",  
    "start": "run-p sync watch:*"
  }  
}  
```

### 単一責任原則

npm-scriptsで割り当てられるCLIタスクは、長いワンライナーを割り当てると保守が難しくなります。  
  
単一の機能をとして一つ一つ追加していきます。

> [https://qiita.com/liply/items/cccc6a7b703c1d3ab04f](https://qiita.com/liply/items/cccc6a7b703c1d3ab04f)

### ビルドタスクランナーは使わない

`gulp` , `grunt` などのタスクランナーは、使用せずに `npm-scripts` を組み合わせて複雑な処理を実現します。   
  
`npm-run-all` パッケージを使うと組み合わせるのが容易になります。

### npm-run-all

 複数の `npm-scripts` をパラレルまたはシーケンシャルに実行するためのCLIツールです。古くはタスクランナーが担っていた、ウェブ制作における煩雑な作業を `npm-run-all` を使うことによって、自動化する事ができます。

> https://www.npmjs.com/package/npm-run-all

#### シーケンシャルな処理

task1が終了を待って、task2が処理されます。  
   
`run-s task1 task2`

#### パラレルな処理

task1とtask2が同時に実行されます。  
    
`run-p task1 task2`  
	

## マルチブラウザ対応

マルチブラウザ対応は自動化して、実装者の関心事から外します。

### Babel

Babel とは、新しい機能を使って書いた JavaScript のコードを、以前のバージョンの書き方に変換してくれるツールです。  

今回は、Bavel v7.1.0 を採用しています。

#### @babel/preset-env

必要なときだけpolyfillを追加してくれる便利なプラグインです。
	
polyfillのために潜在的に必要なimportを書いたり、polyfill用のパッケージをインストールする手間を解決してくれます。
	
また、指定したブラウザやバージョンに無い機能のみpolyfillが導入されるので、不要なpolyfillはインストールされません。
	
ブラウザの指定方法は、[Browserslist]([https://github.com/browserslist/browserslist](https://github.com/browserslist/browserslist)) 準拠です。

#### @babel/polyfill

必要な polyfill が揃ったパッケージ。  
  
`@babel/preset-env` によって、自動インストール・インポートされます。

#### インストール

```bash  
$ npm i --save-dev @babel/core @babel/cli @babel/preset-env  
$ npm i --save @babel/polyfill  
```

#### .babelrc

babelの設定ファイルです。  
	
 `@babel/preset-env` をbabelに組み込んだり、対応するブラウザの指定を設定します。  
	
`targets` に指定する対応ブラウザバージョンの書き方は、[Browserslist](https://github.com/browserslist/browserslist)のクエリと互換性があります。  
	
クエリが表すブザラウザは、[browserl.ist](https://browserl.ist/?q=%3E+1%25)でチェック出来ます。  
	  
	
```json  
{  
  "presets": [  
    [  
      "@babel/env",  
      {  
        "targets": "> 1%, not dead",  
        "useBuiltIns": "usage"  
      }  
    ]  
  ]  
}
```  
	
> https://babeljs.io/docs/en/usage

#### 参考

- [https://qiita.com/ryuone/items/13f5d450c3865709ba10](https://qiita.com/ryuone/items/13f5d450c3865709ba10)
- [https://babeljs.io/docs/en/babel-preset-env](https://babeljs.io/docs/en/babel-preset-env)
- [https://www.npmjs.com/package/babel-preset-env](https://www.npmjs.com/package/babel-preset-env)
- [https://dackdive.hateblo.jp/entry/2018/01/18/100000](https://dackdive.hateblo.jp/entry/2018/01/18/100000)
- [https://www.key-p.com/blog/staff/archives/105449](https://www.key-p.com/blog/staff/archives/105449)
- [http://akabeko.me/blog/2017/03/babel-preset-env/](http://akabeko.me/blog/2017/03/babel-preset-env/)
- [https://qiita.com/shisama/items/88080011bbc69e3e620b](https://qiita.com/shisama/items/88080011bbc69e3e620b)
- [https://babeljs.io/docs/en/next/usage](https://babeljs.io/docs/en/next/usage)

### Autoprefixer

cssをマルチベンダー対応にするために、ベンダープレフィックスを自動付与するツールです。  
  
sassがcssへコンパイルされた後に実行します。   
  
Autoprefierは、PostCSSの中のモジュールです。

> https://github.com/postcss/autoprefixer

#### インストール

```bash  
$ npm i —save-dev postcss-cli autoprefixer  
```

#### postcss.config.js

```js  
module.exports = {  
  plugins: [  
    require("autoprefixer")({  
      browsers: ["last 2 versions"],  
      grid: true  
    }),  
    require("cssnano")({  
      preset: ["default"]  
    })  
  ],  
  map: false  
};  
```

#### 参考

- [http://cly7796.net/wp/css/try-using-autoprefixer-with-postcss/](http://cly7796.net/wp/css/try-using-autoprefixer-with-postcss/)
- [https://ics.media/entry/17376#postcss-autoprefixer](https://ics.media/entry/17376#postcss-autoprefixer)
	

## 一貫したコーディングスタイルの徹底

stylelint , ESLintで構文チェック、Prettierではコード整形を行います。

### stylelint

Stylelint は、構文エラーや規約に沿ったコーディングがされているかを検証する強力なツールです。  
  
Stylelintが scssシンタックスに対応出来るように、 `stylelint-scss` をインストールします。  
  
また、規約に関しては、 `stylelint-config-sass-guidelines` を採用しました。  
  
理由は、メンテナン状況や、ドキュメントが読みやすく整備されているからです。

以上、 `stylelint-scss` 、`stylelint-config-sass-guidelines` は、 `.stylelintrc.js` に記述して使います。

> https://sass-guidelin.es/

#### Prettier

- stylelint-prettier

	Prettierをstylelintと統合して実行します。

- stylelint-config-prettier

	stylelint上のコードフォーマット(整形)に関するルールを無効にします。  
	Prettierとstylelintと競合を回避して、Prettierが優先されるようになります。

#### stylelint-scss

	scssシンタックスに対応するルールをstylelintに追加するプラグインです。

#### インストール

```bash  
$ npm i —save-dev stylelint stylelint-scss stylelint-config-sass-guidelines prettier stylelint-prettier stylelint-config-prettier
```

#### .stylelintrc.js

```js  
module.exports = {
  plugins: [
    "stylelint-scss",
    "stylelint-prettier"
  ],
  extends: [
    "stylelint-config-sass-guidelines",
    "stylelint-config-prettier"
  ],
  rules: {
    "prettier/prettier": true
  }
}
```

### ESLint

ESLintは、Javascriptの静的解析ツールです。  
  
問題があるパターンや、ガイドラインに準拠していないコードを指摘します。  
  
JavaScriptは動的で型付が緩い言語なので、開発者がJavaScriptを実行することなく問題を発見し、エラーを防ぐために有効です。

#### Prettier

- eslint-plugin-prettier

	PrettierをESLintと統合して実行します。

- eslint-config-prettier

	ESLint上のコードフォーマット(整形)に関するルールを無効にします。  
	  
	PrettierとESLintと競合を回避して、Prettierが優先されるようになります。

#### インストール

```bash
$ npm i --save-dev eslint prettier eslint-plugin-prettier eslint-config-prettier
```

#### 初期設定

ルールは、standardスタイルを選択しました。  
	
```bash  
$ npx eslint --init  
```  
  
初期化実行後に、 `.eslintrc.json` が生成されます。

#### .eslintrc.json

```json  
{  
    "extends": [  
        "standard",  
        "prettier"  
    ],  
    "plugins": [  
        "prettier"  
    ],  
    "rules": {  
        "prettier/prettier": "error"  
    }  
}  
```

#### 参考

- https://qiita.com/khsk/items/0f200fc3a4a3542efa90

## BrowserSync

BrowserSyncとは、コーディングを行うと、自動でブラウザリロードを行ってくれるツールです。  
  
作業とデバッグを交互にテンポを良く行うために有効です。  
  
BrowserSyncを起動させる時のオプションを説明します。

```  
"browser-sync start -s './src' -w 'src/*.html' 'src/css/*.css' 'img/*' 'src/js/*.js'"  
```

### npm-scripts

```  
"sync": "browser-sync start -s './src' -w 'src/*.html' 'src/css/*.css' 'img/*' 'src/js/*.js'",
```

### browser-sync start

BrowserSyncを起動します。

### -s オプション

起動したローカルサーバーのルートディレクトリを指定します。

### -w オプション

監視するファイルを指定します。

監視に指定されたファイルを更新すると、ブラウザがリロードします。
