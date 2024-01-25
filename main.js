const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { Pool } = require('pg');
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const app = express();
const port = 3000;

app.use(express.json());

// Configurações de conexão com o banco de dados PostgreSQL lidas do arquivo .env
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.get('/', (req, res) => {
    res.send(
        {
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
        }
    );
})

// Endpoint para listar produtos
app.get('/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products;');
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
});

// Endpoint para salvar produtos
app.post('/products', async (req, res) => {
    const { name, price } = req.body;

    // Verifica se os dados foram fornecidos corretamente
    if (!name || !price) {
        return res.status(400).json({ mensagem: 'Nome e preço são obrigatórios.' });
    }

    const novoProduto = {
        id: uuidv4(),
        name,
        price,
    };

    try {
        // Insere o novo produto no banco de dados
        await pool.query('INSERT INTO products(id, name, price) VALUES($1, $2, $3)', [
            novoProduto.id,
            novoProduto.name,
            novoProduto.price,
        ]);

        res.status(201).json(novoProduto);
    } catch (error) {
        console.error('Erro ao salvar produto:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});