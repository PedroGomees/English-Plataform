import express from 'express';
import { postDesafio, responderDesafio, listarRespostas } from './controllers/forumController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/roleAuth.js';

const router = express.Router();

router.get("/",(req,res)=>{
res.render("forum",{titulo:"Forum"})
})

// Criar desafio (somente professora)
router.post("/post", isAuthenticated, isAdmin, postDesafio);

// Responder um desafio (somente aluno autenticado)
router.post("/:id/responder", isAuthenticated, responderDesafio);

// Listar respostas (professora vê todas, aluno só as próprias)
router.get("/:id/respostas", isAuthenticated, listarRespostas);

export default router;