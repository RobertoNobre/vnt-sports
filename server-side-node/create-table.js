const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : '',
 //port     : 3306,
  user     : '',
  password : '',
  database : ''
});

function createTable(conn){
    const sqlUsers = "CREATE TABLE IF NOT EXISTS users (\n"+
    "id int NOT NULL AUTO_INCREMENT,\n"+
    "name varchar(150) NOT NULL,\n"+
    "email varchar(50) NOT NULL,\n"+
    "password varchar(50) NOT NULL,\n"+
    "city varchar(50) NOT NULL,\n"+
    "ride_group varchar(50) NOT NULL,\n"+
    "days_week varchar(50) NOT NULL,\n"+
    "PRIMARY KEY (ID));";
    
    const sqlPosts = "CREATE TABLE IF NOT EXISTS posts (\n"+
    "id int NOT NULL AUTO_INCREMENT,\n"+
    "title varchar(50) NOT NULL,\n"+
    "text varchar(150) NOT NULL,\n"+
    "id_aluno int NOT NULL,\n"+
    "PRIMARY KEY (ID));";

    const sqlAlbums = "CREATE TABLE IF NOT EXISTS albums (\n"+
    "id int NOT NULL AUTO_INCREMENT,\n"+
    "title varchar(50) NOT NULL,\n"+
    "id_aluno int NOT NULL,\n"+
    "PRIMARY KEY (ID));";

    const sqlPhotos = "CREATE TABLE IF NOT EXISTS photos (\n"+
    "id int NOT NULL AUTO_INCREMENT,\n"+
    "title varchar(50) NOT NULL,\n"+
    "id_album int NOT NULL,\n"+
    "PRIMARY KEY (ID));\n";
    
    conn.query(sqlUsers, function (error, results, fields){
        if(error) return console.log(error);
        console.log('tabela users criada!');
        //addRows(conn)
    });
    conn.query(sqlPosts, function (error, results, fields){
        if(error) return console.log(error);
        console.log('tabela posts criada!');
        //addRows(conn)
    });
    conn.query(sqlAlbums, function (error, results, fields){
        if(error) return console.log(error);
        console.log('tabela albums criada!');
        //addRows(conn)
    });
    conn.query(sqlPhotos, function (error, results, fields){
        if(error) return console.log(error);
        console.log('tabela photos criada!');
        //addRows(conn)
    });

    conn.end();
}

connection.connect(function(err){
    if(err) return console.log(err);
    console.log('conectou!');
    createTable(connection);
})