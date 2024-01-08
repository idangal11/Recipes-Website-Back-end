-- DROP TABLE IF EXISTS idan_db.Users_Favorites;
-- DROP TABLE IF EXISTS idan_db.Personal_Recipes;
-- DROP TABLE IF EXISTS idan_db.User_Recipe_History;
-- DROP TABLE IF EXISTS idan_db.Recipe_Likes;
-- DROP TABLE IF EXISTS idan_db.Family_Recipes;
DROP TABLE IF EXISTS idan_db.users; 


CREATE TABLE IF NOT EXISTS idan_db.users (
    user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
);
INSERT INTO mediphone.users (username,firstname,lastname,country,password,email)
VALUES(

'username:idani',
'firstname:idan',
'lastname:gal',
'israel',
'password:123'
'email:idan@',
);

-- CREATE TABLE idan_db.Users_Favorites (
--     user_id INT NOT NULL,
--     recipe_id INT NOT NULL,
--     PRIMARY KEY (user_id, recipe_id),
--     FOREIGN KEY (user_id) REFERENCES idan_db.users(user_id)
--         ON DELETE NO ACTION
--         ON UPDATE NO ACTION
-- );

-- CREATE TABLE idan_db.Personal_Recipes (
--   recipe_id INT AUTO_INCREMENT PRIMARY KEY,
--   user_id INT NOT NULL,
--   title VARCHAR(255) NOT NULL,
--   readyInMinutes INT,
--   image VARCHAR(255),
--   popularity INT,
--   vegan BOOLEAN,
--   vegetarian BOOLEAN,
--   glutenFree BOOLEAN,
--   instruction JSON,
--   ingredients JSON,
--   servings INT,
--   FOREIGN KEY (user_id) REFERENCES idan_db.users (user_id)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION
-- );

-- CREATE TABLE idan_db.User_Recipe_History (
--   user_id INT NOT NULL,
--   recipe_id INT NOT NULL,
--   timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   PRIMARY KEY (user_id, recipe_id),
--   FOREIGN KEY (user_id) REFERENCES idan_db.users(user_id)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION
-- );

-- -- CREATE TABLE idan_db.Recipe_Likes (
-- --   id INT PRIMARY KEY AUTO_INCREMENT,
-- --   user_id INT NOT NULL,
-- --   recipe_id INT NOT NULL,
-- --   timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
-- --   FOREIGN KEY (user_id) REFERENCES idan_db.users (user_id)
-- --     ON DELETE NO ACTION
-- --     ON UPDATE NO ACTION
-- -- );

-- CREATE TABLE idan_db.Family_Recipes (
--   recipe_id INT PRIMARY KEY AUTO_INCREMENT,
--   user_id INT NOT NULL,
--   recipe_name VARCHAR(255) NOT NULL,
--   owner_name VARCHAR(255) NOT NULL,
--   special_time VARCHAR(255) NOT NULL,
--   ingredients TEXT NOT NULL,
--   instructions TEXT NOT NULL,
--   picture BLOB,
--   FOREIGN KEY (user_id) REFERENCES idan_db.users(user_id)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION
-- );
