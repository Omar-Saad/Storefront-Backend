/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS products (
  id SERIAL NOT NULL ,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);