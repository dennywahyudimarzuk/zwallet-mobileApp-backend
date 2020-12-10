# <a href="https://z-wallet-rizky.netlify.app" align="center">Zwallet API</a>

RESTful API zwallet built with Express JS and MySQL

## Tools
- Node Js
- Express JS
- MySQL
______________________________________________________________________________________
## How to use
```
$ npm install
```
```
$ npm start or yarn start
```
_______________________________________________________________________________________
## Docs API
https://documenter.getpostman.com/view/11198446/TVRpz54X
_______________________________________________________________________________________
## Structure Table in MySQL
Users
```
+-----------+--------------+------+-----+---------------------+-------------------------------+
| Field     | Type         | Null | Key | Default             | Extra                         |
+-----------+--------------+------+-----+---------------------+-------------------------------+
| id        | int(11)      | NO   | PRI | NULL                | auto_increment                |
| name      | varchar(255) | NO   |     | NULL                |                               |
| email     | varchar(255) | NO   |     | NULL                |                               |
| password  | varchar(100) | NO   |     | NULL                |                               |
| pin       | char(6)      | NO   |     | NULL                |                               |
| photo     | varchar(100) | NO   |     | NULL                |                               |
| phone     | varchar(16)  | NO   |     | NULL                |                               |
| balance   | int(11)      | NO   |     | NULL                |                               |
| verified  | tinyint(1)   | NO   |     | 0                   |                               |
| createdAt | timestamp    | NO   |     | current_timestamp() |                               |
| updatedAt | timestamp    | NO   |     | current_timestamp() | on update current_timestamp() |
+-----------+--------------+------+-----+---------------------+-------------------------------+
```
Transfer
```
+-------------+--------------+------+-----+---------------------+----------------+
| Field       | Type         | Null | Key | Default             | Extra          |
+-------------+--------------+------+-----+---------------------+----------------+
| id          | int(11)      | NO   | PRI | NULL                | auto_increment |
| amount      | int(11)      | NO   |     | NULL                |                |
| date        | timestamp    | NO   |     | current_timestamp() |                |
| note        | varchar(255) | NO   |     | NULL                |                |
| id_sender   | int(11)      | NO   |     | NULL                |                |
| receiver    | varchar(255) | NO   |     | NULL                |                |
| id_receiver | int(11)      | NO   |     | NULL                |                |
| createdAt   | timestamp    | NO   |     | current_timestamp() |                |
+-------------+--------------+------+-----+---------------------+----------------+
```
Topup
```
+-----------+--------------+------+-----+---------------------+-------------------------------+
| Field     | Type         | Null | Key | Default             | Extra                         |
+-----------+--------------+------+-----+---------------------+-------------------------------+
| sequence  | int(11)      | NO   |     | NULL                |                               |
| title     | varchar(255) | NO   |     | NULL                |                               |
| updatedAt | timestamp    | NO   |     | current_timestamp() | on update current_timestamp() |
+-----------+--------------+------+-----+---------------------+-------------------------------+
```

