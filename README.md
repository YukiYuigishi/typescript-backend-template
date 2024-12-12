# TypeScript backend template

## 環境設定

`.env.template` をコピーして `.env` ファイルを作成し、必要な環境変数を設定する。

   ```bash
   cp .env.template .env
   ```
## DB初期化方法

1. 依存関係をインストールする。

   ```bash
   pnpm install --frozen-lockfile
   ```

2. マイグレーションを実行するため、以下のコマンドを実行する。

   ```bash
   docker compose up db -d
   pnpm prisma migrate deploy
   ```
   テーブルを作成後、`prisma/seed.ts`が実行され初期データの流し込みが行われる。

3. 作成したコンテナを停止し、削除するために、以下のコマンドを実行する。

   ```bash
   docker compose down
   ```

## Prismaの使い方

[Fastifyのチュートリアル](https://fastify.dev/docs/latest/Guides/Getting-Started/)
[Fastify+Prismaのexample](https://github.com/prisma/prisma-examples/tree/latest/orm/fastify)

### Prismaスキーマの設定

`prisma/schema.prisma` を編集して、PostgreSQLのスキーマを定義することができる。
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model users {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```
スキーマの変更をマイグレーションする。
```bash
psql prisma migrate dev --name suitable_name
```
## その他コマンド類

| コマンド                                      | 説明                                                                                              |
|-----------------------------------------------|---------------------------------------------------------------------------------------------------|
| `psql prisma migrate dev --name suitable_name` | Prismaのマイグレーションを開発環境で実行し、指定した名前で新しいマイグレーションを作成する。         |
| `psql prisma migrate deploy`                  | Prismaのマイグレーションを本番環境に適用する。                                                    |
| `psql prisma studio`                          | Prisma Studioを起動し、データベースのデータをインタラクティブに操作する。                       |
| `pnpm run test`                               | テストを実行するためのコマンドですが、現在はエラーを出力して終了する（未設定）。                   |
| `pnpm run dev`                                | TypeScriptコードをコンパイルし、`dist/index.js`を実行して開発サーバーを起動する。                   |
| `pnpm run start`                              | コンパイル済みの`dist/index.js`を実行してアプリケーションを起動する。                             |
| `pnpm run build`                              | TypeScriptコードをコンパイルして、`dist`ディレクトリに出力する。                                 |
| `pnpm run lint`                               | `src`ディレクトリ内のコードを`biome`で静的解析し、問題がないかチェックする。                    |
| `pnpm run lint:fix`                           | `biome`を使用して、コードの静的解析結果に基づいて自動的に修正する。                              |
| `pnpm run format`                             | `biome`を使用して、コードを自動的にフォーマットする。                                           |
| `pnpm run psql`                               | `.env`ファイルを読み込み、`docker compose`を使って`db`コンテナを起動し、`psql`を実行してPostgreSQLに接続する。 |

