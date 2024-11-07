const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const port = 3000;
var path = require('path');
const { error } = require('console');
const app = express();

var login = 'admin';
var password = 'admin';

app.use(session({ secret: 'minhaChave' }));

app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('/views', path.join(__dirname, 'views'));

app.get('/',  (req, res) => {
    if(req.session.login){
        res.render('menu');
        console.log('O meu usuário logado é: '+ req.session.login)
    } else{ res.render('index'); }
});

app.post('/', (req, res) => {
    
    if(req.body.login == login && req.body.password == password){
        req.session.login = login;
        res.render('menu');
    } else{ res.render('index', { error: 'Credenciais inválidas'}) }
})

app.get('/menu', (req, res) => {
    if (req.session.login) {
        res.render('menu');
    } else {
        res.redirect('/');
    }
});

app.post('/menu', (req, res) => {
    const pages = req.body.page;

    switch(pages){
        case 'cadastro':
            res.render('cadastro');
            break;
        case 'gestao':
            res.render('gestao');
            break;
        case 'relatorios':
            res.render('relatorios');
            break;
        case 'agendamento':
            res.render('agendamento');
            break;
        case 'pre-triagem':
            res.render('pre-triagem');
            break;
        case 'bolsas':
            res.render('bolsas');
            break;
        default:
            res.status(404).send('Erro ao entrar na página')
    }
})

app.get('/bolsas', (req, res) => {
    
})

app.listen(port, () => {
    console.log('Servidor rodando na porta 3000')
    console.log('http://localhost:3000')
})  