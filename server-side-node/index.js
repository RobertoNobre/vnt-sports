const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));


app.use('/', router);


//inicia o servidor
app.listen(port);
console.log('API funcionando!');

function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
        host     : '',
       //port     : 3306,
        user     : 'u363572247_rn',
        password : '',
        database : 'u363572247_vnt'
    });
  
    connection.query(sqlQry, function(error, results, fields){
        if(error) 
          res.json(error);
        else
          res.json(results);
        connection.end();
        console.log('executou!');
    });
  }