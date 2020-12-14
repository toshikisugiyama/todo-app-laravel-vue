# Todoアプリ

## Herokuで公開しています
https://todo-app-2020-toshikisugiyama.herokuapp.com
- [Terraformはこちら](https://github.com/toshikisugiyama/todo-app-laravel-vue-terraform-heroku)

## EC2とRDSの構成のTerraformはこちらです
- [Terraform-EC2-RDS](https://github.com/toshikisugiyama/Terraform-EC2-RDS)

## アプリの起動
### コンテナの起動
```
make up
```

### パッケージのインストール
```
make npm-i
make composer-i
```

### 監視
```
make watch

// もしくは

make serve
make watch-poll
```

http://localhost:3000 にアクセス