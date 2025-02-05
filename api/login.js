import express from 'express';
import bcrypt from 'bcryptjs';
import userController from './controllers/userController.js'; 

const router = express.Router();

// Página de login
router.get("/", (req, res) => {
    res.render('login', { título: "login" });
});

// Autenticação de login
router.post("/authenticate", async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Buscar usuário pelo e-mail
        const user = await userController.findOne(email);
        
        if (!user) {
            return res.redirect("/login"); // Usuário não encontrado
        }

        // Comparar senha com hash salvo
        const correct = bcrypt.compareSync(senha, user.senha);

        if (correct) {
            req.session.user = {
                id: user.id,
                email: user.email
            };
            console.log(req.session.user); // Retorna a sessão do usuário
            res.redirect('/')
        } else {
            return res.redirect("/login"); // Senha incorreta
        }
    } catch (error) {
        console.error("Erro ao autenticar usuário:", error);
        return res.status(500).send("Erro interno no servidor.");
    }
});

export default router;
