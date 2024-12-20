import express from 'express';
import path from 'path';
const router = express.Router()

//Rota para pagina inicial
router.get('/',(req,res)=>{
    res.render('home',{titulo:"Página inicial"})
})

export default router;