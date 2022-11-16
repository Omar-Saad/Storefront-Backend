/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL NOT NULL ,
  user_id INT NOT NULL,
  status VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);