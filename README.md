# アプリ名

　Weather-Cloth
 
# 概要


 ## ユーザー登録・ログイン
 
 ユーザー登録ページで、ご自身のメールアドレス・ユーザー名・パスワード・目的を入力し、登録する事が出来ます。ログインした後でも、ユーザー設定ページで変更する事が可能です。


 ## ユーザー登録する際の使用目的に応じた明日の洋服を提示します。
 
 ユーザーの使用目的と明日の9時の天気に応じて、オススメの洋服の写真とコメントを表示します。


 ## 現在地のリアルタイムの天気、明日9時、明後日9時の天気を表示します。
 
 現在の位置情報に応じて、現在の天気・明日9時・明後日9時の天気の気温とマークを表示します。もし位置情報の取得に失敗しましたら、東京の天気を表示します。


 ## 着た服の投稿が可能です。
 
 投稿ページで、自分の着た写真とコメントを投稿する事が出来ます。


 ## 投稿に対して、コメントと検索が可能です。

検索欄に入力し検索をかけると、投稿記事を検索する事が出来ます。また、投稿ページを押して頂き、投稿ページに飛び、投稿に対してコメントする事が出来ます。


# 制作背景(意図)


  普段、明日の服装を考えるのが大変だったり、何を着ていけばわからない人達に向けて、少しでも負担を減らしたいために、このアプリを作成しました。また、一つ提示されただけでは、ワンパターンだったり、ピンと来ない可能性があリます。なので、他ユーザーの服を参考にできるように投稿機能も実装しました。
  
# DEMO

 ## ユーザー情報に応じて気温・服装・コメントを表示した際の画面
 
 
 [![Image from Gyazo](https://i.gyazo.com/0dc4072dc834da13262329a55c916b60.png)](https://gyazo.com/0dc4072dc834da13262329a55c916b60)
 
 
 ## 自分が着た画像を投稿した際の画面
 
 
 [![Image from Gyazo](https://i.gyazo.com/606057b5c4ad7f5ef88a1a70cb52ed35.png)](https://gyazo.com/606057b5c4ad7f5ef88a1a70cb52ed35)
 
 
 ## 投稿に対してコメントをした際の画面
 
 
 [![Image from Gyazo](https://i.gyazo.com/ecc1dbde34bcc8262174163343fbd0a0.png)](https://gyazo.com/ecc1dbde34bcc8262174163343fbd0a0)

# 実装予定の内容

  ## カテゴリー検索機能
  
  投稿する際にも、カテゴリーの欄を追加し、投稿する際にカテゴリーも合わせて投稿する事が出来ます。投稿ページには、写真とテキストだけではなく、カテゴリーも表示されるようにしたいと思っています。検索する際にも、カテゴリーを入力すると、入力したカテゴリーに応じた投稿が表示されるようにしたいです。
  
  
  ## いいね機能
  
  ユーザーが良いと思った投稿に対してお気に入りに追加できるようにし、マイページでもお気に入りの投稿を表示できるようにしたいと思っています。


# DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false,unique:true|
|password|string|nill :false|
|purpose|string|nill :false|

### Association
- has_many :posts
- has_many :buyers


## postsテーブル
|Column|Type|Options|
|------|----|-------|
|post_id|bigint||
|text|string||
|image|string||
### Association
- belongs_to :user


## commentsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|bigint|null: false|
|posts_id|bigint|null: false|
|text|string||
### Association
- belongs_to :user
- belongs_to :post


## cloths
|Column|Type|Options|
|------|----|-------|
|cloth|string||
|text|string||

