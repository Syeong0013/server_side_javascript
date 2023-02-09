var mysql = require('mysql');
var config = require('./db_config.json')

var conn = mysql.createConnection({
    host: 'localhost',
    // user, password가 없으면 연결 시 에러 발생
    user: 'root',
    password: '1234'
});
// var conn = mysql.createConnection('mysql://root:1234@localhost/study');

// 권장 연결 방식
conn.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log(conn);
    console.log('connected as id ' + conn.threadId);
});

// connect 안쓰고 query 로 연결 확립
conn.query('Select * FROM study.test', (err, results, fields) => {
    if(err) throw err;
    console.log(results);
});

var sql = 'SELECT * FROM study.test';
/*
 *  conn.query(sql, (err, rows, fields))
 *  err = error
 *  rows = 결과의 행
 *  fields = 컬럼 
 */

// 1번째 방식 : sql, callback
conn.query(sql, (err, results, fields) => {
    if(err){
        console.log(err);
    }else{
        console.log(results);
        console.log("===========");
        console.log(fields);
    }
});

// 2번째 방식: sql, values, callback
var sql = 'SELECT * FROM study.test WHERE `name` = ? AND `id` = ?';
conn.query(sql, ['관리자'], (err, results, fields) => {
    if(err){
        console.log(err);
    }else{
        console.log(results);
    }
});

// 3번째 방식: options, callback
var options = {
    sql: 'SELECT * FROM study.test WHERE `name` = ? AND `id`=?',
    timeout: 40000, // 40s
};
conn.query(options, ['관리자', '1'], (err, results, fields) => {
    if(err){
        console.log(err);
    }else{
        console.log(results);
        console.log("===========");
        console.log(fields);
    }
});


conn.end((err) => {
});
    
var pool  = mysql.createPool(config);
pool.query('Select * FROM study.test', (err, results, fields) => {
    // if(err) throw err;
    console.log(results);
});
    
pool.on('acquire', function (connection) {
    console.log('Connection %d acquired', connection.threadId);
});
pool.on('connection', function (conn) {
    console.log('Connection %d connection', conn.threadId);

    conn.query('SET SESSION auto_increment_increment=1')
});
pool.on('enqueue', function () {
    console.log('Waiting for available connection slot');
});
pool.on('release', function (connection) {
    console.log('연결 %d 반환', connection.threadId);
});

pool.getConnection(function(err, connection) {
    if (err) throw err; // 서버 종료 안되게 핸들링
    // 연결
    connection.query('Select * FROM test',function (error, results, fields) {
        console.log("쿼리 수행");
        // 연결 완료 시 반환
        connection.release();
        // release() 후에 쿼리 에러 처리 수행
        if (error) throw error;
        
        // 연결이 풀에 반환된 이후이므로 연결을 사용하면 안된다.
    });
    
    pool.end();
});
