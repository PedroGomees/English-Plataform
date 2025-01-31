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
        console.log("MYSQL Connected LOGIN");
    }
});

const authController = {
    // Função de login
    login: async (req, res) => {
        const { email, senha } = req.body;

        try {
            // Verifica se o email existe no banco
            const [results] = await db.promise().query('SELECT * FROM usuarios WHERE email = ?', [email]);

            if (results.length === 0) {
                return res.render('login', { message: 'Email ou senha incorretos' });
            }

            const usuario = results[0];

            // Compara a senha informada com a senha armazenada no banco (criptografada)
            const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

            if (!senhaCorreta) {
                return res.render('login', { message: 'Email ou senha incorretos' });
            }

            // Cria uma sessão para o usuário logado
            req.session.user = {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
            };

            console.log("Usuário logado:", req.session.user);

            return res.redirect('/dashboard'); // Redireciona para o dashboard após login
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            return res.render('login', { message: 'Erro ao realizar login' });
        }
    }
};

export default authController;
