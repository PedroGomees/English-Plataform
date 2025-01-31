import express from 'express';
import path from 'path';
import userController from './controllers/userController.js'; 

const router = express.Router();



router.get("/",(req,res)=>{
    res.render('login',{título:"login"})
})
router.get('/admin', async (req, res) => {
    try {
        const users = await userController.findAll();

        res.render('admin', { users }); 
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).send('Erro ao carregar a página de admin');
    }
});

router.get('/admin/user/:id', userController.findOne);
router.delete('/admin/user/:id', userController.delete);

export default router;