// const mysql = require('mysql2')

// const pool = mysql.createPool({
//   host: '200.9.22.2',
//   user: 'senai-dev',
//   password: 'mensagemapagada99',
//   database: 'senai-dev',
//   waitForConnections: true,   // Espera por conexões disponíveis
//   connectionLimit: 10,        // Limite máximo de conexões no pool
//   queueLimit: 0               // Número máximo de conexões em espera (0 = ilimitado)
// })

// pool.getConnection((err, connection) => {
//   if (err) {
//     console.error('Error connecting: ' + err.stack)
//     return
//   }
//   console.log('Connected as id ' + connection.threadId)

//   // Libera a conexão de volta para o pool após o uso
//   connection.release()
// })

// module.exports = pool

// // Carregar o dotenv para acessar variáveis de ambiente
require('dotenv').config();

const mysql = require('mysql2');

// Criar um pool de conexões usando variáveis de ambiente
const pool = mysql.createPool({
  host: process.env.BHOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_DATABASE,
  waitForConnections: true,   // Espera por conexões disponíveis
  connectionLimit: 10,        // Limite máximo de conexões no pool
  queueLimit: 0               // Número máximo de conexões em espera (0 = ilimitado)
});

// Testar a conexão com o banco de dados
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);

  // Libera a conexão de volta para o pool após o uso
  connection.release();
});

// Exportar o pool para uso em outras partes do aplicativo
module.exports = pool;
