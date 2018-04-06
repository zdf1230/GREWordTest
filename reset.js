exports.ResetDB = function(a, b) {
    const dbPath = 'resources/app/GRE.db'

    var fs = require('fs');
    var SQL = require('sql.js');
    var filebuffer = fs.readFileSync(dbPath);

    // Load the db
    var db = new SQL.Database(filebuffer);

    // Prepare an sql statement
    var stmt = db.prepare("UPDATE `GRE_utf8` SET Score = :0 WHERE :a <= _id AND _id <= :b");

    // Run an update in which the function is used
    stmt.run({':a' : a, ':b' : b});

    stmt.free();

    var data = db.export();
    var buffer = new Buffer(data);
    fs.writeFileSync(dbPath, buffer);
}
