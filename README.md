# Storefront Backend API

This is the backend API for the Storefront project.In which users can create an account, login, and view products, add products to their cart.

## Technologies used
- Node.js
- Express
- Typescript
- Jasmine (testing)
- Postgres (database)


## How to use
1 - Clone the repository\
2 - Run `npm install`\
3 - Crete new database in postgres and add the credentials to the .env file\
4 - Run `db-migrate db:crete store_db` to crete new database\
5 - Run `db-migrate db:crete store_test_db` to crete new database for testing\
6 - Run `db-migrate up` to run the migrations\
7 - Run `npm run build` to compile typscript files\
8 - Run `npm run start` to start the server\
9 - Now you can use the API on `http://localhost:3000`

## How to run jasmine tests
1 - Run the command `npm run test`

## Tables in the database
- users

| Column | Type | 
| ------ | ------ |
| id | integer |
| first_name | varchar |
| last_name | varchar |
| password | varchar |

- products

| Column | Type |
| ------ | ------ |
| id | integer |
| name | varchar |
| price | integer |
| category | varchar |

- orders

| Column | Type |
| ------ | ------ |
| id | integer |
| user_id | integer |
| status | varchar |

- order_products

| Column | Type |
| ------ | ------ |
| id | integer |
| order_id | integer |
| product_id | integer |
| quantity | integer |



## API Endpoints : Documentation

Base URL: `http://localhost:3000`

### Users

| Method | Endpoint | Description |
| ------ | ------ | ------ |
| POST | /users/create | Create a new user | add first_name, last_name, password in the body and the token will be returned 
| POST | /users/signin | Login a user | add first_name, password in the body and the token will be returned
| GET | /users | Get all users | add token in the header 'Authorization' : 'your token'
| GET | /users/:id | Get a user | add token in the header

### Products

| Method | Endpoint | Description |
| ------ | ------ | ------ |
| POST | /products/create | Create a new product | add name, price, quantity in the body and the token in the header
| GET | /products | Get all products
| GET | /products/:id | Get a product

### Orders

| Method | Endpoint | Description |
| ------ | ------ | ------ |
| POST | /orders/create | Create a new order | add token in the header
| GET | /orders | Get all orders | add token in the header
| GET | /orders/:user_id | Get user order | add token in the header

### Order Products

| Method | Endpoint | Description |
| ------ | ------ | ------ |
| POST | /order_products/create | Create a new order product | add token in the header
| GET | /order_products | Get all products of orders | add token in the header
| GET | /order_products/:id | Get an order products | add token in the header

## Environment Variables

You need to create a .env file in the root directory and add the following variables:

| Variable | Description | Value |
| ------ | ------ |
| POSTGRES_HOST | Database host | 127.0.0.1
| POSTGRES_DB | Database name | store_db
| POSTGRES_TEST_DB | Database name for testing | store_test_db
| POSTGRES_USER | Database user | 'your user'
| POSTGRES_PASSWORD | Database password | 'your password'
| POSTGRES_PORT | Database port | 5432
| SALT_ROUNDS | Salt rounds for hashing | 10
| JWT_SECRET | Secret | 'your secret'
| BCRYPT_PASSWORD | Password for bcrypt | 'your password'
| ENV | Environment | 'dev' or 'test'









