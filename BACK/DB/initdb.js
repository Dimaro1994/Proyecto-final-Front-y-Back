require('dotenv').config()

const { getConnection } = require('./DB')

async function main () {
  let connection
  try {
    connection = await getConnection()

    console.log('borrando tablas existentes')
    await connection.query('DROP TABLE IF EXISTS opinion')
    await connection.query('DROP TABLE IF EXISTS users')

    console.log('creando tablas')
    await connection.query(`
  CREATE TABLE users(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(15),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP    
  ) ;

   `)
    await connection.query(`
   CREATE TABLE opinion(
     id INTEGER PRIMARY KEY AUTO_INCREMENT,
     users_id INTEGER NOT NULL,
     text VARCHAR(300) NOT NULL,
     image VARCHAR(200),
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (users_id) REFERENCES users(id)
   ) ;
 
    `)
  } catch (error) {
    console.error(error)
  } finally {
    if (connection) connection.release()
    process.exit()
  }
};
main()
