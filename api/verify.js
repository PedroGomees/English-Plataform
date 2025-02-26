import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2'; 
dotenv.config();
const router = express.Router()

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

router.get('/:token', async (req, res) => {
    const { token } = req.params;

    // Verificando se o token existe no banco
    db.query('SELECT * FROM usuarios WHERE verificationToken = ?', [token], async (err, results) => {
        if (err) {
            return res.status(500).send('Erro no servidor.');
        }

        if (results.length === 0) {
            return res.status(400).send('Token inválido ou expirado.');
        }
      
        const user = results[0]; 
        console.log(results[0]);

        // Atualizando o usuário
        db.query('UPDATE usuarios SET verified = ?, verificationToken = ? WHERE id = ?', 
            [true, 0, user.id], 
            (err, results) => {
                if (err) {
                    return res.status(500).send(`Erro ao atualizar usuário: ${err.message}`);
                }
          
                res.send("E-mail verificado com sucesso!");
            }
        );
    });
});


export default router