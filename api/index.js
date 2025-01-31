import express from 'express';
import path from 'path';
import session from "express-session"
const router = express.Router()
import userController from './controllers/userController.js';


//Rota para pagina inicial
router.get('/',(req,res)=>{
    res.render('home',{titulo:"Página inicial"})
})

import authRouter from './auth.js';
router.use("/auth",authRouter);

import registroRouter from './registro.js';
router.use("/registro", registroRouter);

import userRouter from './user.js';
router.use("/user", userRouter);
app.get("/session",(req,res)=>{
    req.session.treinamento = "Formação node.js"
    req.session.ano = 2019
    req.session.email = "pedrogomes@gmail.com"
    })
        

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


