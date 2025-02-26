import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import routes from './api/index.js';
import mysql from 'mysql2/promise';
import db from './config/db.js'
import session from "express-session"
dotenv.config({path:'./.env'})

const app = express()
const port = 3001

// Obter __dirname em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.engine('handlebars',engine({extname:'.handlebars',defaultLayout: 'main',
    partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine','handlebars');
app.set('views', path.join(__dirname, 'views'));

//Sessoes

app.use(session({
    secret:"frangoapassarinho", cookie:{maxAge:300000},
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
    
}))


// Estatico
app.use(express.static("public"));

// Parse
app.use(express.urlencoded({extended:true}));
//Garante os dados do form como json
app.use(express.json());


app.use(routes);
app.listen(port,()=>{
    console.log(`Server rodando na porta ${port}`)
})