import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import mysql from 'mysql2';
import bcrypt from 'bcryptjs';
dotenv.config({path:'./.env'})
// Conexão com o banco de dados
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});
db.connect((error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("MYSQL Connected POST");
    }
})
const authController = {
    // Função de registro
    register: async(req, res) => {
       
        const telefone= req.body.telefone;
        const senha = req.body.senha;
        const nome = req.body.name;
        const senhaConfirmada = req.body.senhaConfirmada; 
        const email = req.body.email;
    compararSenha()
     
        // Comparando as senhas
        function compararSenha(){
            console.log("Comparando senha")
        if (senha !== senhaConfirmada) {
            console.log("Senhas não coincidem");
            return res.render('registro', {
                message: "As senhas não são iguais"
            });
        }}
        


        // Verificando se o email já existe
        db.query('SELECT email FROM usuarios WHERE email = ?', [email], async (error, results) => {
            if (error) {
                console.log("Erro ao verificar email: ", error);
                return res.render('registro', { message: 'Erro ao verificar email' });
            }

            if (results.length > 0) {
                console.log("Email já existe");
                return res.render('registro', {
                    message: 'Esse email já está em uso'
                });
            }

            // Criptografando a senha
          /*  let hashedSenha;
            try {
                hashedSenha = await bcrypt.hash(senha, 8);
                console.log("Senha criptografada:", hashedSenha);
            } catch (err) {
                console.log("Erro ao criptografar senha:", err);
                return res.render('registro', { message: 'Erro ao processar senha' });
            }*/

            // Inserir o usuário no banco de dados
            db.query('INSERT INTO usuarios (nome, email, senha, telefone) VALUES (?, ?, ?, ?)', 
                [nome, email, hashedSenha, telefone], (error, results) => {
                    if (error) {
                        console.log("Erro ao cadastrar usuário:", error);
                        return res.render('registro', {
                            message: 'Erro ao cadastrar usuário'
                        });
                    }

                    console.log("Usuário cadastrado com sucesso!");
                    return res.render('registro', {
                        message: 'Cadastro realizado com sucesso!'
                    });
                });
        });
    }
};

export default authController;
