var express = require('express');   // express 객체 리턴
var app = express();    // 어플리케이션 객체 리턴
var bodyParser = require('body-parser');    // post body 값을 가져오기 위한 미들웨어 설정
app.use(bodyParser.urlencoded({extended: false}));

// fileSystem 제어 모듈
var fs = require('fs');

// DB 설정
var OrientDB = require('orientjs');

var server = OrientDB({
    host: 'localhost',
    port: 2424,
    username: 'root',
    password: '1234',
    useToken: true
});

var db = server.use({
    name: 'o3',
    username: 'root',
    password: '1234',
    useToken: true
});

// veiw 설정d
app.set('views', './views_orientdb');
app.set('view engine', 'jade');

// jade 태그 정렬
app.locals.pretty = true;

app.listen(3000, () => {
    console.log("Connected, 3000 port");
});

// topic/:id 보다 아래에 위치하면 인터셉트 당함
app.get('/topic/add', (req, res) => {
    var sql = "SELECT FROM topic";
    db.query(sql).then((topics) => {
        if(topics.length === 0){
            res.status(500).send('No Data.');
        }
        res.render('add', {topics: topics});
    });
});

app.post('/topic/add', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;

    var sql = "INSERT INTO topic(title, description, author) VALUES (:title, :description, :author)";
    db.query(sql, {
        params: {
            title: title,
            description: description,
            author: author
        }
    }).then((result) => {
        res.redirect('/topic/' + encodeURIComponent(result[0]['@rid']));
    });
});

app.get('/topic/:id/edit', (req, res) => {
    var sql = "SELECT FROM topic";
    
    db.query(sql).then((topics) => {
        var id = req.params.id;
        var sql = 'SELECT FROM topic WHERE @rid=:rid';
        db.query(sql, {
            params: {
                rid: id
            }
        }).then((topic) => {
            res.render('edit', {topics: topics, topic: topic[0]});
        });
    });
});

app.post('/topic/:id/edit', (req, res) => {
    var sql = "UPDATE topic SET title=:t, description=:d, author=:a WHERE @rid=:rid";
    var id = req.params.id;
        db.query(sql, {
            params: {
                rid: id,
                t: req.body.title,
                d: req.body.description,
                a: req.body.author,
            }
        }).then((re) => {
            if(re > 0)
            res.redirect('/topic/' + encodeURIComponent(id));
        });
});

app.get('/topic/:id/delete', (req, res) => {
    var sql = "SELECT FROM topic";
    
    db.query(sql).then((topics) => {
        var id = req.params.id;
        var sql = 'SELECT FROM topic WHERE @rid=:rid';
        db.query(sql, {
            params: {
                rid: id
            }
        }).then((topic) => {
            res.render('delete', {topics: topics, topic: topic[0]});
        });
    });
});

app.post('/topic/:id/delete', (req, res) => {
    var sql = "DELETE FROM topic WHERE @rid=:rid";
    db.query(sql, {
        params: {
            rid: req.params.id
        }
    }).then((topic) => {
        res.redirect('/topic');
    });
});

app.get(['/topic', '/topic/:id'], (req, res)  => {
    var sql = "SELECT FROM topic";
    db.query(sql).then((re) => {
        var id = req.params.id;
        if(id){
            var sql = 'SELECT FROM topic WHERE @rid=:rid';
            db.query(sql, {params: {rid:id}}).then((topic) => {
                res.render('view', {topics: re, topic: topic[0]});
            });
        }else{
            res.render('view', {topics: re});
        }
    });
});
