import express from 'express';
import path from 'path';
import session from "express-session"
const router = express.Router()
import userController from './controllers/userController.js';
import {isAuthenticated} from '../middleware/authMiddleware.js'
import {isAdmin,isPremium } from '../middleware/roleAuth.js';


//Rota para pagina inicial
router.get('/',(req,res)=>{
    res.render('home',{titulo:"Página inicial"})
})

//Rota de autenticação
import authRouter from './auth.js';
router.use("/auth",authRouter);

//Rota de registro
import registroRouter from './registro.js';
router.use("/registro", registroRouter);

//Rota de usuarios
import userRouter from './admin.js';
router.use("/admin", userRouter);


        
//Rota de login
import loginRouter from "./login.js"
router.use("/login",loginRouter);

//Rota de verificação
import verifyRouter from "./verify.js"
router.use("/verify", verifyRouter);

//Rota plataforma

import plataformaRouter from "./plataforma.js"
router.use("/plataforma",plataformaRouter);
// Importando rotas

/*import agendamentoRouter from './agendamento.js';
import aulasRouter from './aulas.js';
import registroRouter from './registro.js';
import perguntasRouter from './perguntas.js';
import exerciciosRouter from './exercicios.js';
import materiaisRouter from './materiais.js';
import perfilRouter from './perfil.js'
// Usar outras rotas

router.use("/agendamento", agendamentoRouter);
router.use("/aulas", aulasRouter);
router.use("/registro", registroRouter);
router.use("/perguntas",perguntasRouter);
router.use('/exercicios',exerciciosRouter);
router.use("/materiais", materiaisRouter);
router.use("/perfil", perfilRouterRouter);*/

export default router;


