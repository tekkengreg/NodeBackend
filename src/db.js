const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../db/paint.db')
const db = new sqlite3.Database(dbPath);

// db.serialize(function() {
  // db.run("CREATE TABLE lorem (info TEXT)");

//   var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//   for (var i = 0; i < 10; i++) {
//       stmt.run("Ipsum " + i);
//   }
//   stmt.finalize();

  // db.each("SELECT * FROM colors", function(err, row) {
  //     console.log(row.id + ": " + row.info);
  // });
// });

module.exports = db;
