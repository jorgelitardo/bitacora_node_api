const mysql = require('mysql');

const db = mysql.createPool({
  connectionLimit : 10,
  host:'gestoresambientales.com.ec',
  user: 'gestore4',
  password: '9NB#4JBv[ek72j',
  database: 'gestore4_base_contable'
})

db.getConnection(function(err) {
  if (err) {
    console.error('error connecting: ' + err);
    return;
  }
  console.log('connected as id ' + db.id);
});
module.exports = db;
