■アプリ名
　Weather-Cloth
■概要
 ・ユーザー登録
 
 ・ユーザー登録に応じた明日の洋服を提示
 
 ・現在地のリアルタイムの天気、明日9時、明後日9時の天気を表示
 
 ・着た服の投稿
  
 ・投稿に対して、コメントと検索が可能
  
■制作背景(意図)
  普段、明日の服装を考えるのが面倒だったり、何を着て行けばわからない人達に向けて、少しでも負担を減らしたいために、このアプリを作りました。また、一つ提示されただけでは、ワンパターンだったり、ピンと来ない可能性があるので、投稿機能をつけ他ユーザーの服を参考にできるように投稿機能も実装しました。
  
■　DEMO
 ・ユーザー情報に応じて気温・服装・コメント
 https://gyazo.com/0dc4072dc834da13262329a55c916b60
 ・商品投稿
 https://gyazo.com/606057b5c4ad7f5ef88a1a70cb52ed35

■　実装予定の内容
  ・カテゴリー検索機能
  ・いいね機能
  

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

