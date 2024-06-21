var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'qlda_angular'
});
db.connect( err => {
    if (err) throw err;
    console.log('Đã kết nối database');
})
module.exports = db;