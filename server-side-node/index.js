const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 8080; //porta padrão
const mysql = require('mysql');
const Promise = require('bluebird');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var db_config = {    
};

var connection = mysql.createConnection(db_config);

var queryAsync = Promise.promisify(connection.query.bind(connection));


var handleDisconnect = function() {
    connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                    // the old one cannot be reused.
  
    connection.connect(function(err) {              // The server is either down
      if(err) {                                     // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
      }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        handleDisconnect();                         // lost due to either server restart, or a
      } else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
      }
    });
  }

// do something when app is closing
// see http://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits
process.stdin.resume()
process.on('exit', handleDisconnect);
//definindo as rotas
const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

router.patch('/clientes/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const nome = req.body.nome.substring(0,150);
    const cpf = req.body.cpf.substring(0,11);
    execSQLQuery(`UPDATE Clientes SET Nome='${nome}', CPF='${cpf}' WHERE ID=${id}`, res, connection);
});

    app.use('/', router);

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    });

    app.get('/users', function(req, res, next) {
        var connection = mysql.createConnection(db_config);
        var queryAsync = Promise.promisify(connection.query.bind(connection));

        var numRows;
        var queryPagination;
        var numPerPage = parseInt(req.query.size, 10) || 1;
        var page = parseInt(req.query.page, 10) || 0;
        var numPages;
        var skip = page * numPerPage;
        // Here we compute the LIMIT parameter for MySQL query
        var limit = skip + ',' + numPerPage;
        queryAsync('SELECT count(*) as numRows FROM users')
        .then(function(results) {
        totalElements = results[0].numRows;
        totalPages = Math.ceil(totalElements / numPerPage);
        console.log('number of pages:', totalPages);
        })
        .then(() => queryAsync(
            'SELECT users.*, COUNT(albums.id) albums, COUNT(posts.id) posts, COUNT(photos.id) photos '+
            'FROM users ' +
            'LEFT JOIN albums ON albums.id_aluno = users.id '+ 
            'LEFT JOIN photos ON photos.id_album = albums.id '+ 
            'LEFT JOIN posts ON posts.id_aluno = users.id '+ 
            'GROUP BY users.id LIMIT ' + limit))
        .then(function(results) {
            var responsePayload = {
            results: results
            };
            if (page < totalPages) {
            responsePayload.pagination = {
                pageNumber: page,
                pageSize: numPerPage,
                totalElements: totalElements,
                totalPages: totalPages
            }
            }
            else responsePayload.pagination = {
            err: 'queried page ' + page + ' is >= to maximum page number ' + totalPages
            }
            res.json(responsePayload);
            connection.end();
        })
        .catch(function(err) {
            console.error(err);
            res.json({ err: err });
        });
    });

    app.post('/users', function (req, res, next) {
        const name = req.body.name.substring(0,150);
        const email = req.body.email.substring(0,50);
        const city = req.body.city.substring(0,50);
        const ride_group = req.body.ride_group.substring(0,50);
        const days_week = req.body.days_week.substring(0,50);

        execSQLQuery(`INSERT INTO users
        (name, email, city, ride_group, days_week) 
        VALUES('${name}','${email}', '${city}', '${ride_group}', '${days_week}')`, res);
    });
  
    app.delete('/users/:id', function (req, res, next) {
        execSQLQuery('DELETE FROM users WHERE id=' + parseInt(req.params.id), res, db_config);
    });
  
  module.exports = app;


//inicia o servidor
app.listen(port);
console.log('API funcionando!');

function execSQLQuery(sqlQry, res, db_config){
    var connection = mysql.createConnection(db_config);
    connection.query(sqlQry, function(error, results, fields){
        if(error) 
          res.json(error);
        else
          res.json(results);
        connection.end();
        console.log('executou!');
    });
  }