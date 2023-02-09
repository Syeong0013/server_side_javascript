var str = ";;Hello ;;world";

// var str1 = str.replace("a", "d");
// console.log(str1);      //dabbcc

// var str2 = str.replaceAll("a", "d");
// console.log(str2);      //ddbbcc

// str.replace("a", function(a, b, c){
//     console.log(a);     //a
//     console.log(b);     //0
//     console.log(c);     //aabbcc
// });

// str.replace(/(\w+)/, function(a, b, c, d){
//     console.log(a);     //a
//     console.log(b);     //a
//     console.log(c);     //0
//     console.log(d);     //aabbcc
// });

// str.replace(/\w+/, function(a, b, c, d){
//     console.log(a);     //a
//     console.log(b);     //a
//     console.log(c);     //0
//     console.log(d);     //aabbcc
// });

// var str = ";;aHello ;;world";
// str.replace(/[\;\.\>\(\)\"\a]+(\w+)/g, function(a, b, c, d){
//     console.log(a);     
//     console.log(b);    
//     console.log(c);     
//     console.log(d);     
//     console.log('---------');    
// });

// var map = {
//     "&": "&amp;",
//     "<": "&lt;",
//     ">": "&gt;",
//     "(": "&#40;",
//     ")": "&#41;",
//     '"': '&quot;',
//     "'": "&#x27;",
//     "/": "&#x2F;"
// };

// function escapeHtml(str) {
//     return String(str).replace(/[&<>()"'\/]/g, (str) => {
//         return map[str];
//     });
// }

// var str = "&<Hello>()\"\'Wor/ld";
// console.log(str);
// console.log(escapeHtml(str));

//쿼리문 이스케이핑
var sql = "SELECT * FROM study.test WHERE id = :id AND name = :name";
var values = {
    "id": "1",
    "name": "홍길동"
}
sql = sql.replace(/\:(\w+)/g, (value, columns) => {
    if(values.hasOwnProperty(columns)){
        return values[columns];
    }
    return value;
});

console.log(sql);