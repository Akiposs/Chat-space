#DB設計

## Usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false, unique: true|
|passwaord|string|null: false|

### Association
- has_many :users_rooms
- has_many :rooms, through: :users_rooms
- has_many :messages 


## roomsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :users_rooms
- has_many :users, through: :users_rooms
- has_many :messages


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|room_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :room
- belongs_to :user


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|message|text|null: false|
|user_id|integer|null: false, foreign_key: true|
|room_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :room

## picturesテーブル

|Column|Type|Options|
|------|----|-------|
|picture|text|null: false|
|user_id|integer|null: false, foreign_key: true|
|room_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :room
