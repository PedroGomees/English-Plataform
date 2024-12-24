import express from 'express';
import path from 'path';
const router = express.Router()

// Rota formulario

router.get('/',(req,res)=>{
    res.render('registro',{titulo:"Cadastro"})
})


export default router;
