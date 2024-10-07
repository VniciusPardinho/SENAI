// const express = require('express');
// const pool = require('../database');
// const path = require('path');
// const app = express();
// const port = 8080;

// // Serve the 'index.html' file from the root
// app.get('/api-tester', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/index.html'));
// });

// // Middleware para servir arquivos estáticos
// app.use(express.static(path.join(__dirname)));

// // Middleware para analisar JSON no corpo das requisições
// app.use(express.json());

// // Rota para obter todas as tarefas
// app.get('/tasks', (req, res) => {
//   pool.query('SELECT * FROM tasks', (err, results) => {
//     if (err) {
//       console.error('Erro: ', err);
//       return res.status(500).send('Erro');
//     }

//     res.json(results);
//   });
// });

// // Rota para criar uma nova tarefa
// app.post('/tasks', (req, res) => {
//   const { titulo, descricao, status = 'pendente' } = req.body; // status padrão é "pendente"

//   // Verifica se o título foi fornecido
//   if (!titulo) {
//     return res.status(400).json({ error: 'O título é obrigatório.' });
//   }

//   // Inserir nova tarefa no banco de dados
//   const sql = 'INSERT INTO tasks (titulo, descricao, status) VALUES (?, ?, ?)';
//   pool.query(sql, [titulo, descricao, status], (err, result) => {
//     if (err) {
//       console.error('Erro ao criar tarefa:', err);
//       return res.status(500).json({ error: 'Erro ao criar tarefa.' });
//     }

//     // Retornar a nova tarefa criada
//     const newTask = {
//       id: result.insertId, // ID gerado automaticamente
//       titulo,
//       descricao,
//       status,
//     };

//     res.status(201).json(newTask); // Retorna a tarefa criada com status 201
//   });
// });

// // Iniciar o servidor
// app.listen(port, () => {
//   console.log(`Servidor rodando em http://localhost:${port}`);
// });
const express = require('express');
const pool = require('../database'); // Importa a conexão com o banco de dados
const path = require('path');
const app = express();
const port = 8080;

// Middleware para analisar JSON no corpo das requisições
app.use(express.json());

// Middleware para servir arquivos estáticos (ex: index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Serve o arquivo 'index.html' quando a rota '/api-tester' for acessada
app.get('/api-tester', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Rota para obter todas as tarefas
app.get('/tasks', (req, res) => {
  pool.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      console.error('Erro: ', err);
      return res.status(500).send('Erro ao buscar tarefas');
    }
    res.json(results); // Retorna a lista de tarefas como JSON
  });
});

// Rota para criar uma nova tarefa
app.post('/tasks', (req, res) => {
  const { titulo, descricao, status = 'pendente' } = req.body; // status padrão é "pendente"

  // Verifica se o título foi fornecido
  if (!titulo) {
    return res.status(400).json({ error: 'O título é obrigatório.' });
  }

  // Inserir nova tarefa no banco de dados
  const sql = 'INSERT INTO tasks (titulo, descricao, status) VALUES (?, ?, ?)';
  pool.query(sql, [titulo, descricao, status], (err, result) => {
    if (err) {
      console.error('Erro ao criar tarefa:', err);
      return res.status(500).json({ error: 'Erro ao criar tarefa.' });
    }

    // Retornar a nova tarefa criada
    const newTask = {
      id: result.insertId, // ID gerado automaticamente
      titulo,
      descricao,
      status,
    };

    res.status(201).json(newTask); // Retorna a tarefa criada com status 201
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
