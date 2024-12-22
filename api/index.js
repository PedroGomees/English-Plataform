import express from 'express';
import path from 'path';
const router = express.Router()

//Rota para pagina inicial
router.get('/',(req,res)=>{
    res.render('home',{titulo:"Página inicial"})
})
import registroRouter from './registro.js';
router.use("/registro", registroRouter);

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


