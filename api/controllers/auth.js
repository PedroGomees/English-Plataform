import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// Conexão com o banco de dados (usando Pool)
const db = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

const authController = {
    //FAZER CADASTRO
    register: async (req, res) => {
        const { telefone, senha, senhaConfirmada, name: nome, email } = req.body;
        console.log(req.body);

        // VERIFICAÇÃO DE SENHAS.
        if (senha !== senhaConfirmada) {
            return res.render('registro', {
                message: "As senhas não são iguais"
            });
        }

        try {
            //VER SE O EMAIL JÁEXISTE.
            const [results] = await db.query('SELECT email, verificationToken FROM usuarios WHERE email = ?', [email]);

            if (results.length > 0) {
                console.log("Email já existe");
                return res.render('registro', {
                    message: 'Esse email já está em uso'
                });
            }

            // Criptografa a senha
            const hashedSenha = await bcrypt.hash(senha, 8);
            console.log("Senha criptografada:", hashedSenha);

            // Token pro email ( verificar )
            const verificationToken = crypto.randomBytes(32).toString('hex');

            // Insere o novo usuário no banco de dados
            await db.query(
                'INSERT INTO usuarios (nome, email, senha, telefone, verificationToken, verified) VALUES (?, ?, ?, ?, ?, ?)', 
                [nome, email, hashedSenha, telefone, verificationToken, false]
            );

            // Configura transporte de e-mail
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: { 
                    user: process.env.EMAIL_USER, 
                    pass: process.env.EMAIL_PASS 
                }
            });

            const link = `http://localhost:3001/verify/${verificationToken}`;
            await transporter.sendMail({
                from: `"Plataforma" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: "Verifique seu e-mail",
                html: `<p>Clique no link para verificar seu e-mail: <a href="${link}">${link}</a></p>`
            });

            console.log("Usuário cadastrado com sucesso! Email de verificação enviado.");
            return res.render('registro', {
                message: 'Cadastro realizado! Verifique seu e-mail.'
            });

        } catch (error) {
            console.error("Erro ao registrar usuário:", error);
            return res.status(500).json({ error: "Erro ao registrar usuário", details: error.message });
        }
        
    }
};

export default authController;
