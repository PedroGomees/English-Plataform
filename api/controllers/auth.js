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
        const { telefone, senha, senhaConfirmada, name: nome, email } = req.body;
        console.log(req.body);

        // Verifica se as senhas são iguais
        if (senha !== senhaConfirmada) {
            return res.render('registro', {
                message: "As senhas não são iguais"
            });
        }

        try {
            // Verifica se o e-mail já existe no banco
            const [results] = await db.promise().query('SELECT email FROM usuarios WHERE email = ?', [email]);
            console.log(results);
            if (results.length > 0) {
                console.log("Email já existe");
                return res.render('registro', {
                    message: 'Esse email já está em uso'
                });
            }

            // Criptografa a senha
            const hashedSenha = await bcrypt.hash(senha, 8);
            console.log("Senha criptografada:", hashedSenha);

            // Insere o novo usuário no banco de dados
            await db.promise().query(
                'INSERT INTO usuarios (nome, email, senha, telefone) VALUES (?, ?, ?, ?)', 
                [nome, email, hashedSenha, telefone]
            );

            console.log("Usuário cadastrado com sucesso!");
            return res.render('registro', {
                message: 'Cadastro realizado com sucesso!'
            });

        } catch (error) {
            console.error("Erro ao registrar usuário:", error);
            return res.render('registro', { message: 'Erro ao registrar usuário' });
        }
    }
};

export default authController;
