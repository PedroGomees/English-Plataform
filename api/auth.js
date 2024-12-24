import express from 'express';
import path from 'path';
import authController from './controllers/auth.js';
const router = express.Router()

router.post('/registro',(req,res)=>{
    console.log("Rota sendo chamda")
    authController.register
    console.log(req.body);
    
})





export default router;


