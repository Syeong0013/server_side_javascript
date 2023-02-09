var mysql = require('mysql');
var config = require('./db_config.json')

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234'
});

// conn.query('INSERT INTO study.test SET ?', {name: '홍순이'}, function (error, results, fields) {
//     if (error) throw error;
//     console.log(results.insertId);
// });

// conn.query('UPDATE study.test SET name = ? WHERE id = ?', ['홍길순1', '1'], function (error, results, fields) {
//     if (error) throw error;
//     console.log('affected ' + results.affectedRows + ' rows');
//     console.log('changed ' + results.changedRows  + ' rows');
// });

// conn.query('DELETE FROM study.test WHERE id = 4', function (error, results, fields) {
//     if (error) throw error;
//     console.log('update ' + results.affectedRows + ' rows');
// });

var options = {
    sql: `
        SELECT * 
        FROM STUDY.TEST1
        LEFT JOIN STUDY.TEST
        ON TEST1.TID = TEST.ID    
    `
    , nestTables: true
};
conn.query(options, function (error, results, fields) {
    if (error) throw error;
    console.log(results);
});