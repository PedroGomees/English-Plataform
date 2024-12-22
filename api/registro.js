import express from 'express';
import path from 'path';
const router = express.Router()

// Rota formulario

router.get('/',(req,res)=>{
    res.render('registro',{titulo:"Cadastro"})
})

router.post('/save', (req, res) => {
    const name = req.body.name;

    if (!name) {
        return res.status(400).send("O nome do funcionário é obrigatório.");
    }

    const insertQuery = 'INSERT INTO funcionario (nome) VALUES (?)';
    conn.query(insertQuery, [name], (err, results) => {
        if (err) {
            return res.status(500).send("Erro ao cadastrar funcionário");
        }
        res.redirect('/funcionarios/cadastro');
    });
});

export default router;
