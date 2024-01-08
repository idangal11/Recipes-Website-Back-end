var mysql = require('mysql2');
require("dotenv").config();

// spooncular_apiKey = 0607f6387b1d4b758e2a1dde3bd7ff54
// PORT = 3000
// host = localhost
// user = root
// password_db = Q6rh3bbenami
// db = idan_db
// bcrypt_saltRounds = 10

const config={
connectionLimit:4,
  host: process.env.host,//"localhost"
  user: process.env.user,//"root"
  password: process.env.password_db,
  database: process.env.db
}
const pool = new mysql.createPool(config);
const connection =  () => {
  return new Promise((resolve, reject) => {
  pool.getConnection((err, connection) => {
    if (err) reject(err);
    console.log("MySQL pool connected: threadId " + connection.threadId);
    const query = (sql, binding) => {
      return new Promise((resolve, reject) => {
         connection.query(sql, binding, (err, result) => {
           if (err) reject(err);
           resolve(result);
           });
         });
       };
       const release = () => {
         return new Promise((resolve, reject) => {
           if (err) reject(err);
           console.log("MySQL pool released: threadId " + connection.threadId);
           resolve(connection.release());
         });
       };
       resolve({ query, release });
     });
   });
 };
const query = (sql, binding) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, binding, (err, result, fields) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
module.exports = { pool, connection, query };







