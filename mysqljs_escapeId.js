var mysql = require('mysql');
var config = require('./db_config.json')

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    stringifyObject: true
});

// var sorter = 'name';
// var sql    = 'SELECT * FROM study.test ORDER BY ' + mysql.escapeId('test.' + sorter, true);
// conn.query(sql, function (error, results, fields) {
//     if (error) throw error;
//     console.log(sql);
//     console.log(results);
// });


// var sorter = 'date.2';
// var sql    = 'SELECT * FROM study.test ORDER BY ' + mysql.escapeId(sorter, true);
// // -> SELECT * FROM study.test ORDER BY `date.2`
// console.log(sql);

// var id = 1;
// var columns = ['id', 'name'];
// var query = conn.query('SELECT ?? FROM ?? WHERE id = ?', [columns, 'study.test', id], function (error, results, fields) {
//     if (error) throw error;
//     console.log(results);
// });

// console.log(query.sql); // SELECT `id`, `name` FROM `study`.`test` WHERE id = 1
// var userName = '홍길동';
// var sql = "SELECT * FROM ?? WHERE ?? = ?";
// var inserts = ['study.test', 'name', userName];
// sql = mysql.format(sql, inserts);
// console.log(sql);

conn.config.queryFormat = function (query, values) {
    if (!values){
        return query;
    } 
    return query.replace(/\:(\w+)/g, function (txt, key) {
        if (values.hasOwnProperty(key)) {
            return this.escape(values[key]);
        }
        return txt;

    }.bind(this));
};


var query = "UPDATE study.test SET name = :name WHERE id = :id";
var values =  { name: "홍길짱", id: "2" };

query.replace(/\:(\w+)/g, function (txt, key) {
    if (values.hasOwnProperty(key)) {
        return conn.escape(values[key]);
    }
    return txt;
    
}.bind(this));

conn.query("UPDATE study.test SET name = :name WHERE id = :id", { name: "홍길짱", id: "2" });


// var query = "UPDATE study.test SET name = :name WHERE id = :id";
// var values =  { name: "홍길짱", id: "2" };

// // /\:(\w+)/g -> :, 밑줄을 포함한 기본 라틴 알파벳의 모든 영숫자와 문자가 매치될때마다 수행
// query.replace(/\:(\w+)/g, function (txt, key) {
//     console.log(values[key]);
// });