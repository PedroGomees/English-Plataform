import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './api/index.js';

const app = express()
const port = 3000

// Obter __dirname em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Configuração para handlebars
app.engine('handlebars',engine({extname:'.handlebars',defaultLayout: 'main',
    partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine','handlebars');
app.set('views', path.join(__dirname, 'views'));

// Estatico
app.use(express.static("public"));

app.use(routes);
app.listen(port,()=>{
    console.log(`Server rodando na porta ${port}`)
})