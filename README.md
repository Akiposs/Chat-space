#DB設計

## Usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false, unique: true|
|passwaord|string|null: false|

### Association
- has_many :members
- has_many :rooms, through: :members
- has_many :messages 
- has_many :pictures


## roomsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :members
- has_many :users, through: :members
- has_many :messages
- has_many :pictures



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
|picture|text|null: false|
|user_id|integer|null: false, foreign_key: true|
|room_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :room
