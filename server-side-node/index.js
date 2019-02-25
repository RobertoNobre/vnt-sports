const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 8080; 
const mysql = require('mysql');
const Promise = require('bluebird');
const CryptoJS = require('crypto.js');
var jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**************** DATABASE ADDRESS ************/
var db_config = {  
    host     : '',
    user     : '',
    password : '',
    database : '',
    //port     : 3306, 
};
/**************** /DATABASE ADDRESS ************/

var connection = mysql.createConnection(db_config);

var handleDisconnect = function() {
    connection = mysql.createConnection(db_config);
    connection.connect(function(err) {              
      if(err) {                                     
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); 
      }                                     
    });                                     
    connection.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
        handleDisconnect();                         
      } else {                                      
        throw err;                                  
      }
    });
}

// do something when app is closing
// see http://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits
process.stdin.resume()
process.on('exit', handleDisconnect);

const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Welcome to VNT-Sports!' }));
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

    var numPerPage = parseInt(req.query.size, 10) || 1;
    var page = parseInt(req.query.page, 10) || 0;
    var skip = page * numPerPage;

    var limit = skip + ',' + numPerPage;
    queryAsync('SELECT count(*) as numRows FROM users')
    .then(function(results) {
        totalElements = results[0].numRows;
        totalPages = Math.ceil(totalElements / numPerPage);
        console.log('number of pages:', totalPages);
    })
    .then(() => queryAsync(
        'SELECT users.*, COUNT(albums.id) albums, '+
        '(SELECT COUNT(posts.id) FROM posts WHERE posts.id_aluno = users.id) posts, '+
        '(SELECT COUNT(photos.id) FROM photos WHERE albums.id_aluno = users.id AND photos.id_album = albums.id) photos '+
        'FROM users '+
        'LEFT JOIN albums ON albums.id_aluno = users.id '+
        ' GROUP BY users.id LIMIT ' + limit))
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
    var connection = mysql.createConnection(db_config);
    var queryAsync = Promise.promisify(connection.query.bind(connection));
    
    try {
        const username = req.body.username.substring(0,150);
        const name = req.body.name.substring(0,50);
        const city = req.body.city.substring(0,50);
        const ride_group = req.body.ride_group.substring(0,50);
        const email = req.body.email.substring(0,50);
        const added_by = parseInt(req.body.added_by);
        
        const daysWeek = `${req.body.sun == true ? 'Sun ': ''}`+
        `${req.body.mon == true ? 'Mon ': ''}`+
        `${req.body.tue == true ? 'Tue ': ''}`+
        `${req.body.wed == true ? 'Wed ': ''}`+
        `${req.body.thu == true ? 'Thu ': ''}`+
        `${req.body.fri == true ? 'Fri ': ''}`+
        `${req.body.sat == true ? 'Sat ': ''}`+
        ``;

        var password = '';
        if(req.body.password !== ""){
            password = CryptoJS.md5(req.body.password.substring(0,50))
        }else{
            password = ''
        }

        queryAsync(
            `INSERT INTO users(
                name, username, email, password, city, ride_group, days_week, added_by
            ) VALUES ('${name}','${username}','${email}','${password}',
                '${city}','${ride_group}','${daysWeek}','${added_by}')`)
        .then(function(results) {
            if(results){
                res.status(201).send({
                    results,
                    data: null, messages: ['Registrado com sucesso.']
                });
            }
            connection.end();
        })
        .catch(function(err) {
            var msg = err.sqlMessage;
            if(msg.substring(0, 9) == 'Duplicate'){
                msg= 'Email já existe';
            }
            res.status(400).send({
                data: null, failures: [msg], messages: []
            });
            connection.end();
        });
    } catch (error) {
        res.status(400).send({
            data: null, 
            failures: ["Verique o preenchimento dos campos Novamente"], 
            messages: []
        });
    }
    
});
  
app.delete('/users/:id', function (req, res, next) {
    execSQLQuery('DELETE FROM users WHERE id=' + parseInt(req.params.id), res, db_config);
});

    /********************* AUTH *************************/
    
app.post('/auth/signin', function (req, res, next) {
    var connection = mysql.createConnection(db_config);
    var queryAsync = Promise.promisify(connection.query.bind(connection));
    const email = req.body.usernameOrEmail.substring(0,150);
    const password =  CryptoJS.md5(req.body.password.substring(0,50));
    
    queryAsync(
        `SELECT id, name from users where email='${email}' and password='${password}'`)
    .then(function(results) {
        if(results.length>=1){
            var responsePayload = {
                data: {
                    accessToken: jwt.sign({ id: results[0] }, 'privateKey'),
                    tokenType: "Bearer"
                },
                failures: [],
                messages: []

            };
            res.json(responsePayload);
        }else{
            res.status(400).send({data: null, failures: ["Credênciais inválidas"], messages: []});
        }
        connection.end();
    })
});

    /************ ALBUMS/PHOTOS*******/
app.get('/albums/:id', function(req, res, next) {
    const id = parseInt(req.params.id);
    var connection = mysql.createConnection(db_config);
    var queryAsync = Promise.promisify(connection.query.bind(connection));

    queryAsync(
        'SELECT albums.title titleAlbum, photos.title titlePhoto from albums '+
        'INNER JOIN photos ON albums.id = photos.id_album '+ 
        'WHERE albums.id_aluno = '+ id)
    .then(function(results) {
        var responsePayload = {
            results: results
        };
        res.json(responsePayload);
        connection.end();
    })
    .catch(function(err) {
        console.error(err);
        res.json({ err: err });
    });
});

    /************ POSTS *******/
app.get('/posts/:id', function(req, res, next) {
    const id = parseInt(req.params.id);
    var connection = mysql.createConnection(db_config);
    var queryAsync = Promise.promisify(connection.query.bind(connection));

    queryAsync(
        'SELECT title, text from posts '+
        'WHERE posts.id_aluno = '+ id)
    .then(function(results) {
        var responsePayload = {
            results: results
        };
        res.json(responsePayload);
        connection.end();
    })
    .catch(function(err) {
        console.error(err);
        res.json({ err: err });
    });
});
  
module.exports = app;

app.listen(port);
console.log('API working!');

function execSQLQuery(sqlQry, res, db_config){
    var connection = mysql.createConnection(db_config);
    connection.query(sqlQry, function(error, results, fields){
        if(error) 
          res.json(error);
        else
          res.json(results);
        connection.end();
        console.log('done!');
    });
  }