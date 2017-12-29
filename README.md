# nuxtとnodeのexpressを使う(dbはmongodb)
- frontendとapiディレクトリを作成してfrontからapiを叩いてデータを取得する
# api
- 構成
```
- api - app - controllers
            - models
            - routes
      - config
      server.js
```
## db設定
- config/database.config.jsファイル作成
```
module.exports = { url: `mongodb://localhost:27017/easy-notes` }
```
- mongodbの設定をしていない場合はインストール等が必要。
- apiディレクトリにあるサーバー(今作っている)が呼び出されるのでcros設定をする。https://qiita.com/tomoya_ozawa/items/feca4ffc6217d585b037
-
```
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
```
- 上で定義したdbの設定をserver.jsで要求する
## model設定
- models/node.model.jsを作成
```
var mongoose = require('mongoose')
var NoteSchema = mongoose.Schema({
  title: String,
  content: String
  }, {
    timestamps: true
    })
module.exports = mongoose.model('Note', NoteSchema)
```
- collection(テーブルのようなもの)の型を設定
## routesを作成
- 指定のコントローラを要求しappに対してメソッドを割り当てる(コントローラは後から作成)
```
module.exports = (app) => {
  var notes = require('../controllers/note.controller.js')
  app.post('/notes', notes.create)
  app.get('/notes', notes.findAll)
  app.get('/notes/:noteId', notes.findOne)
  app.put('/notes/:noteId', notes.update)
  app.delete('/notes/:noteId', notes.delete)
}

```
## controller作成

- controllers/note.controller.jsを作成
- routesで使っているメソッドをここで定義する
- controllers/note/controller.jsを参照して作成
- crudで使えるようにかくメソッドを定義して扱うようにしています

# frontend
- 構成。https://ja.nuxtjs.org/guide/directory-structure
- nuxtjsに準じています。generateコマンドで作成したのでデフォルトの状態です。https://ja.nuxtjs.org/guide/installation

- https://html5experts.jp/potato4d/24346/
- 上のリンクを参考にしているのでほぼ同じです

> Nuxt.js project
## how to

``` bash
# api起動
$ cd api
$ node server.js
#
$ cd frontend
$ npm run dev
```

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
