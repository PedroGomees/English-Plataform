import express from 'express';
import path from 'path';
import userController from './controllers/userController.js'; 
import {isAdmin,isPremium } from '../middleware/roleAuth.js';
import {isAuthenticated} from '../middleware/authMiddleware.js'
const router = express.Router();
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




router.get('/', isAuthenticated, async (req, res) => {
    if (!req.session.user || req.session.user.role !== "admin") {
        return res.status(403).send("Acesso negado, rota apenas para ADM");
    }

    try {
        const users = await userController.findAll();
        res.render('admin', { users }); 
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).send('Erro ao carregar a página de admin');
    }
});

router.get('/user/:id', userController.findOne);
router.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    const deleteQuery = 'DELETE FROM usuarios WHERE id = ?';

    db.query(deleteQuery, [id], (err, results) => {
        if (err) {
            return res.status(500).send("Erro ao remover usuario");
        }
        res.redirect('/admin');
    });
});

export default router;