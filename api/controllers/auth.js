import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import mysql from 'mysql2';
import bcrypt from 'bcryptjs';

// Conexão com o banco de dados
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

db.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("MYSQL Connected POST");
    }
});

const authController = {
    // Função de registro
    register: async (req, res) => {
        const telefone = req.body.telefone;
        const senha = req.body.senha;
        const nome = req.body.name;
        const senhaConfirmada = req.body.senhaConfirmada;
        const email = req.body.email;
        console.log(req.body);
        // Função para comparar as senhas
        if (senha !== senhaConfirmada) {
            return res.render('registro', {
                message: "As senhas não são iguais"
            });
        }

        // Verificando se o email já existe
        try {
            const [results] = await db.promise().query('SELECT email FROM usuarios WHERE email = ?', [email]);

            if (results.length > 0) {
                console.log("Email já existe");
                return res.render('registro', {
                    message: 'Esse email já está em uso'
                });
            }

            // Criptografando a senha
            let hashedSenha;
            try {
                hashedSenha = await bcrypt.hash(senha, 8);
                console.log("Senha criptografada:", hashedSenha);
            } catch (err) {
                console.log("Erro ao criptografar senha:", err);
                return res.render('registro', { message: 'Erro ao processar senha' });
            }

            // Inserir o usuário no banco de dados
            await db.promise().query('INSERT INTO usuarios (nome, email, senha, telefone) VALUES (?, ?, ?, ?)', 
                [nome, email, hashedSenha, telefone]);

            console.log("Usuário cadastrado com sucesso!");
            return res.render('registro', {
                message: 'Cadastro realizado com sucesso!'
            });

        }catch (error) {
            console.log("Erro ao verificar email ou cadastrar usuário:", error);
            return res.render('registro', { message: 'Erro ao verificar email ou cadastrar usuário' });
        }
        db.query('INSERT INTO usuarios SET ?',{nome: nome, email: email, telefone: telefone, senha: hashedSenha},(error,results)=>{
        if(error){
            console.log(error)

        }else{
            console.log(results)
          res.rende('register',{
            message: 'Usuário registado'
          })
        } 
        })

    }}


export default authController;
