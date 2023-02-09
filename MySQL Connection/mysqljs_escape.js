var mysql = require('mysql');
var config = require('./db_config.json')

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234'
});

var value = '관리자';
var sql = 'SELECT * FROM study.test WHERE NAME = ' + conn.escape(value);
conn.query(sql, (err, results, fields) => {
    if(err){
        console.log(err);
    }else{
        console.log(results);
    }
});

var post  = {id: 2, name: '홍길동'};
var query = conn.query('INSERT INTO study.test SET ?', post, function (error, results, fields) {
    if (error) throw error;
    // Neat!
});
console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'


var makeName = {toSqlString: function(){ return "'홍길순'"}};
var makeName1 = mysql.raw("'홍길순1'");
var sql = mysql.format('UPDATE study.test SET NAME = ? WHERE ID = ?', [makeName1, 1]);
console.log(sql); // UPDATE study.test SET name = '홍길순' WHERE id = 1

conn.query(sql, (err, re, fields) => {
    if(err) throw err;
});

var sql = 'SELECT * FROM study.test';
conn.query(sql, (err, results, fields) => {
    if(err){
        console.log(err);
    }else{
        console.log(results);
    }
});


// 사용자 escape func
var query = "SELECT * FROM study.test WHERE name=" + mysql.escape("홍길동");
console.log(query); // SELECT * FROM study.test WHERE name='홍길동'

conn.query(query, (err, results, fields) => {
    if(err){
        console.log(err);
    }else{
        console.log(results);
    }
});


// escape()
console.log(conn.escape(1));
console.log(conn.escape(1==1));
console.log(conn.escape(new Date()));
console.log(conn.escape(Buffer.from("abc")))
console.log(conn.escape('문자열'));
console.log(conn.escape(['1', '2']));
console.log(conn.escape([['a', 'b'], ['c', 'd']]));

console.log(conn.escape());
console.log(conn.escape(NaN));
console.log(conn.escape({toSqlString: function(){ return "a"}}));