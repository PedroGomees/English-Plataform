import dotenv from 'dotenv';
import mysql from 'mysql2';
dotenv.config({ path: './.env' });


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


const userController = {
    async findAll() {
      try {
        const [rows] = await db.promise().query('SELECT * FROM usuarios');
        return rows; // Agora retorna os usuários corretamente
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw new Error('Erro ao carregar usuários');
      }
    },
  
    async findAll() {
      try {
        const [rows] = await db.promise().query('SELECT * FROM usuarios');
        return rows; // Agora retorna os usuários corretamente
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw new Error('Erro ao carregar usuários');
      }
    },
    
    async findOne(email) {
      try {
        const [results] = await db.promise().query('SELECT id, email, senha,role FROM USUARIOS WHERE email = ?', [email]);
        console.log[results]
        if (results.length === 0) {
          return null; // Retorna null se não encontrar o usuário
        }
    
        return results[0]; // Retorna o primeiro usuário encontrado
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return null; // Retorna null em caso de erro
      }
    },
  
   /* async delete(req, res) {
      try {
        const { id } = req.params;
        await db.promise().query('DELETE FROM usuarios WHERE id = ?', [id]);
  
        res.json({ message: 'Usuário deletado com sucesso' });
      } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({ message: 'Erro ao deletar usuário' });
      }
    }*/
  };
  
  export default userController;