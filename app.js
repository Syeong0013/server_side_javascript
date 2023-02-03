// 원리가 있는 것이 아니라 이렇게 선언하라. 라는 규약임
var express = require('express');
var app = express();

// public 폴더 아래에 있는 리소스를 정적으로 사용할 수 있음.
app.use(express.static('public'));

// Express는 GET 방식을 기본적으로 제공하지만 POST는 제공하지않음
// Post 사용 시 선언해주어야하는 것들 미들웨어 설정
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// get => 명칭: 라우터, 하는 일: 라우팅
/* 
    라우팅?
    사용자 - 라우터 - 컨트롤러
    get('/')의 인자(경로)를 받아 컨트롤러와 매칭해주는 행위
*/
app.get('/', (req, res) => {
    res.send('Hello Page');
});

app.get('/login', (req, res) => {
    res.send('<b>Login Page</b>');
});

app.get('/dynamic', (req, res) => {
    var time = Date();
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        Hello, Dynamic
        ${time}
    </body>
    </html>`);
});

app.get('/route', (req, res) => {
    res.send('image : <img src="배경화면.jpg" />');
});

// get() 미 설정 시, Error 발생 
app.listen(3000, () => {
    console.log("통신 성공");
});

// Template 기능
app.set('view engine', 'jade');
app.set('views', './views');    //생략해도 기본값으로 세팅되어있음

app.get('/template', (req, res) => {
    res.render('index', {time: Date(), title: 'Jade Page'});
    // jade 파일은 정적 리소스이므로 수정 후 재구동 필요 x
});

// jade 파일 소스 예쁘게 정렬하는 코드
app.locals.pretty = true;  

// 쿼리스트링의 정보는 req에 들어옴
app.get('/topic', (req, res) => {
    var topics = ['js', 'nodejs', 'express'];
//    res.send(req.query);    // {"id" :"2"}
    res.send(topics[req.query.id]);
    //res.render('topic');
});

// 시멘틱 url
app.get('/topic/:num/:mode', (req, res) => {
//    res.send(req.parmas);   // error
    res.send(req.params.num + ", " + req.params.mode);
});

///////////////////////////////////////////////////////
// 간단한 웹 앱 (데이터베이스가 아닌 파일 저장)
