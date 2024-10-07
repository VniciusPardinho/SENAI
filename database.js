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

const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.BHOST || '200.9.22.2', // Usa a variável de ambiente, se definida, ou um valor padrão
  user: process.env.DB_USER || 'senai-dev',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || '',
  waitForConnections: true,   // Espera por conexões disponíveis
  connectionLimit: 10,        // Limite máximo de conexões no pool
  queueLimit: 0               // Número máximo de conexões em espera (0 = ilimitado)
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);

  // Libera a conexão de volta para o pool após o uso
  connection.release();
});

module.exports = pool;

