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
  
    async findOne(req, res) {
      try {
        const { id } = req.params;
        const [rows] = await db.promise().query('SELECT * FROM usuarios WHERE id = ?', [id]);
  
        if (rows.length === 0) {
          return res.status(404).json({ message: 'Usuário não encontrado' });
        }
  
        res.json(rows[0]);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ message: 'Erro ao buscar usuário' });
      }
    },
  
    async delete(req, res) {
      try {
        const { id } = req.params;
        await db.promise().query('DELETE FROM usuarios WHERE id = ?', [id]);
  
        res.json({ message: 'Usuário deletado com sucesso' });
      } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({ message: 'Erro ao deletar usuário' });
      }
    }
  };
  
  export default userController;