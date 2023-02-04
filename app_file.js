var express = require('express');   // express 객체 리턴
var app = express();    // 어플리케이션 객체 리턴
var bodyParser = require('body-parser');    // post body 값을 가져오기 위한 미들웨어 설정
app.use(bodyParser.urlencoded({extended: false}));

// fileSystem 제어 모듈
var fs = require('fs');

// veiw 설정
app.set('views', './views_file');
app.set('view engine', 'jade');

// jade 태그 정렬
app.locals.pretty = true;

app.listen(3000, () => {
    console.log("Connected, 3000 port");
});

app.get('/topic/new', (req, res) => {
    res.render('form');
});

app.get('/topic', (req, res)  => {
    fs.readdir('data', (err, files) => {
        if(err){
            res.status(500).send('Server Error');
        }
        res.render('view', {topics: files});
    });
});

app.post('/topic', (req, res) => {
    // 파일 저장 방식 ( 좋지 않지만 공부용으로 잠시 사용 ) title -> 제목 / description -> 내용
    // fs.wirteFile(file, data[option], callback)
    fs.writeFile('data/' + req.body.title, req.body.description, (err) => {
        if(err){
            res.status(500).send('Server Error 발생');
        }
        // 비동기 방식이므로 성공 결과는 여기 위치해야함 
        // send의 특징: send가 실행되면 다음 코드는 실행되지 않는다. return 과 비슷한 것인가?
        // title이 null 이면 에러

        // redirect 
        res.redirect('/topic/' + req.body.title);
    });
});

// 글에 대한 라우팅
app.get('/topic/:title', (req, res) => {
    var title = req.params.title;
    fs.readdir('data', (err, files) => {
        if(err){
            res.status(500).send('Server Error 발생');
        }
        fs.readFile('data/' + title, 'utf-8', (err, data) => {
            if(err){
                res.status(500).send('Server Error 발생');
            }
            // res.send(data);
            res.render('view', {title:title ,description: data, topics: files});
        })
    });
});