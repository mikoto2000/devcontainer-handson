---
title: "シリーズ: コンテナで構築する開発環境 - Vol.1 Docker 入門"
author: mikoto2000
date: 2026/1/9
---

# 前提条件

- Vol.0 開発環境構築 を完了していること


# Docker コンテナ概要

この章では、開発環境として Docker コンテナを利用する際に知っておくべき基本的な概念を説明します。


## Docker コンテナとは

「Docker コンテナ = 使い捨てのアプリケーション実行環境」と考えてください。
Docker イメージと言われるテンプレートからコンテナを起動し、その中でアプリケーションを実行します。


## Docker イメージとは

「Docker イメージ = コンテナの設計図」と考えてください。
プログラムでいうところのクラスのようなもので、イメージからコンテナを起動（インスタンス化）します。


TODO: 図 ![](./images/docker-image-and-container.png)


# Docker コンテナを使ってみる

本シリーズの最終目標は Dev container を使った開発環境構築ですが、その前提として Docker コンテナの基本的な使い方を学びます。

## Web サーバコンテナを動かしてみる

Apache HTTP Server コンテナを使って、Web サーバコンテナを動かしてみましょう。

### Apache HTTP Server コンテナの起動

```sh
docker run httpd:latest
```

次のような実行結果が表示されたと思います。これで Apache HTTP Server コンテナが起動します。

```sh
AH00558: httpd: Could not reliably determine the server's fully qualified domain name, using 172.17.0.2. Set the 'ServerName' directive globally to suppress this message
AH00558: httpd: Could not reliably determine the server's fully qualified domain name, using 172.17.0.2. Set the 'ServerName' directive globally to suppress this message
[Fri Jan 09 10:39:26.403849 2026] [mpm_event:notice] [pid 1:tid 1] AH00489: Apache/2.4.66 (Unix) configured -- resuming normal operations
[Fri Jan 09 10:39:26.403951 2026] [core:notice] [pid 1:tid 1] AH00094: Command line: 'httpd -D FOREGROUND'
[Fri Jan 09 10:42:08.567335 2026] [mpm_event:notice] [pid 1:tid 1] AH00491: caught SIGTERM, shutting down
```

ただし、コンテナ環境は隔離された状態なので、ホスト OS からはアクセスできません。
いったん Ctrl + C でコンテナを停止しましょう。


### ポートフォワーディングでアクセスできるようにする

ホスト OS からコンテナにアクセスするために、ポートフォワーディングを設定します。
ポートフォワーディング設定を行うことで、ホスト OS の特定のポートへのアクセスをコンテナ内の特定のポートに転送できます。

```sh
docker run -p 8080:80 httpd:latest
```

- `-p 8080:80`: ホスト OS のポート 8080 をコンテナ内のポート 80 に転送する設定

このように、ポートフォワーディング設定をすることで、ホストのポート 8080 から コンテナのポート 80(Apache HTTP Server) にアクセスできるようになります。
Web ブラウザで `http://localhost:8080` にアクセスしてみましょう。
`It works!` と表示されたら成功です。


### ボリュームマウントでコンテンツを変更できるようにする

ポートフォワーディング設定でコンテナにアクセスできるようになりましたが、
このままではコンテナに手元の資材を持ち込むことができません。
それでは開発環境として不便ですので、ボリュームマウントという仕組みを使い、
手元の資材をコンテナに持ち込めるようにしましょう。

```sh
docker run -p 8080:80 -v "$(pwd):/usr/local/apache2/htdocs" httpd:latest
```

- `$(pwd)`: カレントディレクトリの絶対パスに展開される
- `-v "$(pwd)"/usr/local/apache2/htdocs"`: カレントディレクトリをコンテナ内の `/usr/local/apache2/htdocs` ディレクトリにマウントする設定

コンテナを起動したら、再度 Web ブラウザで `http://localhost:8080` にアクセスしてみましょう。
`It works!` の代わりに、カレントディレクトリのファイル一覧が表示されます。
これでカレントディレクトリをコンテナ上の Apache HTTP Server が参照していることが確認できました。

せっかくなのでファイルを作成し、 Apache HTTP Server から参照できることを確認してみましょう。
カレントディレクトリに `index.html` ファイルを作成し、以下の内容を記述します。

```html
It's my created file!
```

ファイルが作成出来たら、再度 Web ブラウザで `http://localhost:8080` にアクセスしてみましょう。
`It's my created file!` と表示されます。


- TODO:Dockerfile


# Docker Compose を使ってみる

## 複数サービスの定義

- TODO:複数サービスの定義
- TODO:ポートフォワーディング
- TODO:ボリュームマウント

# 参考資料

- [httpd - Official Image | Docker Hub](https://hub.docker.com/_/httpd)

