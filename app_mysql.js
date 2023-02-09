var express = require('express');   // express 객체 리턴
var app = express();    // 어플리케이션 객체 리턴
var bodyParser = require('body-parser');    // post body 값을 가져오기 위한 미들웨어 설정
app.use(bodyParser.urlencoded({extended: false}));

// fileSystem 제어 모듈
var fs = require('fs');

// db 연결
var mysql = require('mysql');
var config = require('./db_config.json')
var conn = mysql.createConnection(config);

// veiw 설정
app.set('views', './views_mysql');
app.set('view engine', 'jade');

// jade 태그 정렬
app.locals.pretty = true;

app.listen(3000, () => {
    console.log("Connected, 3000 port");
});


app.get('/topic/add', (req, res) => {
    var sql = 'SELECT id, title, description FROM study.board';
    conn.query(sql, (err, results, fields) => {
        res.render('add', {topics: results});
    });
});

app.post('/topic/add', (req, res) => {
    var title = req.body.title;
    var des = req.body.description;
    var sql = 'INSERT INTO study.board(title, description) VALUES(?, ?)';

    conn.query(sql, [title, des], (err, results, fields) => {
        if(err){
            console.log(err);
            res.status(500).send('관리자에게 문의하시길 바랍니다.');
        }else{
            res.redirect('/topic/' + results.insertId);
        }
    });

});

app.get('/topic/:id/edit', (req, res) => {
    var sql = 'SELECT id, title, description FROM study.board';
    
    conn.query(sql, (err, results, fields) => {
        if(err){
            console.log(err);
            res.status(500).send('관리자에게 문의하십시오.');
        }else{
            var id = req.params.id;
            var sql = 'SELECT id, title, description FROM study.board WHERE ?? = ?';
            conn.query(sql, ['id', id], (err, topic, fields) => {
                if(err){
                    console.log(err);
                    res.status(500).send('관리자에게 문의하십시오.');
                }else{
                    res.render('edit', {topics: results, topic: topic[0]});
                }
            });
        }
    });
    
    var id = req.params.id;
    
});

app.post('/topic/:id/edit', (req, res) => {
    var sql = 'UPDATE study.board SET title = ?, description = ? WHERE id = ?';
    var id = req.params.id;
    var title = req.body.title;
    var desc = req.body.description;

    conn.query(sql, [title, desc, id], (err, results, fields) => {
        res.redirect('/topic/' + id);
    });
});

app.get('/topic/:id/delete', (req, res) => { 
    var sql = 'SELECT id, title, description FROM study.board';
    
    conn.query(sql, (err, results, fields) => {
        if(err){
            console.log(err);
            res.status(500).send('관리자에게 문의하십시오.');
        }else{
            var id = req.params.id;
            var sql = 'SELECT id, title, description FROM study.board WHERE ?? = ?';
            conn.query(sql, ['id', id], (err, topic, fields) => {
                res.render('delete', {topics: results, topic: topic[0]});
            });
        }   
    });
});
app.post('/topic/:id/delete', (req, res) => {
    var id = req.params.id;
    var sql = 'DELETE FROM study.board WHERE id = ?';

    conn.query(sql, id, (err, results, fields) => {
        res.redirect('/topic');
    });
});

app.get(['/topic', '/topic/:id'], (req, res) => {
    var sql = 'SELECT id, title, description FROM study.board';
    conn.query(sql, (err, results, fields) => {
        var id = req.params.id;
        if(id){
            var sql = 'SELECT id, title, description FROM study.board WHERE ?? = ?';
            conn.query(sql, ['id', id], (err, topic, fields) => {
                if(err){
                    console.log(err);
                    res.status(500).send('관리자에게 문의하시길 바랍니다.');
                }
                if(topic){
                    res.render('view', {topics: results, topic: topic[0]});
                }
            });
        }else{
            res.render('view', {topics: results});
        }
    });
});
