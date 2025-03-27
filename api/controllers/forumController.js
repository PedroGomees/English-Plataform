
import dotenv from 'dotenv';
import mysql from 'mysql2';
dotenv.config({ path: './.env' });


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

db.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("MYSQL Connected POST");
    }
});

// Criar um desafio (apenas professora pode postar)
export const postDesafio = (req, res) => {
    const { titulo, descricao } = req.body;
    const user = req.user; // Pegando usuário autenticado

    if (user.role !== 'admin') {
        return res.status(403).json({ error: 'Apenas professores podem criar desafios.' });
    }

    const query = 'INSERT INTO desafios (titulo, descricao) VALUES (?, ?)';
    db.query(query, [titulo, descricao], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao criar desafio.' });
        }
        res.status(201).json({ message: 'Desafio criado com sucesso!', desafioId: result.insertId });
    });
};

// Responder a um desafio (apenas alunos autenticados)
export const responderDesafio = (req, res) => {
    const { id } = req.params; // ID do desafio
    const { resposta } = req.body;
    const user = req.user;

    if (user.tipo !== 'aluno') {
        return res.status(403).json({ error: 'Apenas alunos podem responder desafios.' });
    }

    const query = 'INSERT INTO respostas (desafio_id, usuarios_id, resposta) VALUES (?, ?, ?)';
    db.query(query, [id, user.id, resposta], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao enviar resposta.' });
        }
        res.status(201).json({ message: 'Resposta enviada com sucesso!' });
    });
};

// Listar respostas de um desafio
export const listarRespostas = (req, res) => {
    const { id } = req.params; // ID do desafio
    const user = req.user;

    let query;
    let params;

    if (user.tipo === 'professora') {
        query = 'SELECT * FROM respostas WHERE desafio_id = ?';
        params = [id];
    } else {
        query = 'SELECT * FROM respostas WHERE desafio_id = ? AND usuario_id = ?';
        params = [id, user.id];
    }

    db.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar respostas.' });
        }
        res.status(200).json({ respostas: results });
    });
};
