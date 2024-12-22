import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config({path:'./.env'})
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
        console.log("MYSQL Connected");
    }
})
export default db;

