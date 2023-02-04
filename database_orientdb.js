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

// db.record.get('#22:0').then((record) => {
//     console.log('Loaded Record: ', record);
// });

// SELECT
var sql = 'SELECT * FROM topic WHERE @rid=:rid';
// WHERE 조건 들어가면 db.query()의 두번째 인자로 파라미터를 넘겨줌
var param = {
        params: {   // params의 이름은 약속임
            rid: '#22:0'
        }
};
db.query(sql, param).then((results) => {
    console.log(results);
});

// INSERT -> 추가된 레코드
var sql = "INSERT INTO topic(title, description) VALUES(:title, :desc)";
var param = {
    params: {
        title: 'Java',
        desc: 'java is...'
    }
}
db.query(sql, param).then((results) => {
    console.log(results);
});

// UPDATE -> 수정된 행의 갯수
var sql = "UPDATE topic SET title=:title WHERE @rid=:rid";
var param = {
        params: {
            title: 'Java Update',
            rid: '#24:0'
        }
}
db.query(sql, param).then((results) => {
    console.log(results);
});

// DELETE   -> 삭제된 행의 갯수
var sql = "DELETE FROM TOPIC WHERE @rid=:rid";
var param = {
        params:{
            rid: '#24:0'
        }
}
db.query(sql, param).then((results) => {
    console.log(results);
});