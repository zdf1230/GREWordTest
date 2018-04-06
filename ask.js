exports.Ask = function(a, b) {
    const dbPath = 'resources/app/GRE.db'

    var fs = require('fs');
    var SQL = require('sql.js');
    var filebuffer = fs.readFileSync(dbPath);
    var wordArray = new Array();

    // Load the db
    var db = new SQL.Database(filebuffer);

    // Prepare an sql statement
    var stmt = db.prepare("SELECT * FROM `GRE_utf8` WHERE _id <= :to AND _id >= :from;");

    // Bind values to the parameters and fetch the results of the query
    var result = stmt.getAsObject({':from' : a, ':to' : b});

    wordArray.push(result);
    while (stmt.step()) {
        wordArray.push(stmt.getAsObject());
    }

    stmt.free();

    return wordArray;
};
