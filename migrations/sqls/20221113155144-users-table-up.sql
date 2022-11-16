/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS users (
  id SERIAL NOT NULL ,
  first_name VARCHAR(255) NOT NULL,
last_name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);