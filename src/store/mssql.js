let ConnectionPool = require('tedious-connection-pool');
let Request = require('tedious').Request;
let _ = require('lodash');

let poolConfig = {
    min: 2,
    max: 4,
    log: true
};

let connectionConfig = {
    userName: 'sa',
    password: 'Yukon900',
    server: 'localhost',
    options: {
        database: 'DemoData1'
    }
};

//create the pool
let pool = new ConnectionPool(poolConfig, connectionConfig);

pool.on('error', function (err) {
    console.error(err);
});

const sqlFormat = (sql, dataArray) => {
    if (_.isArray(dataArray)) {
        while (sql.search(/\?/i) != -1) {
            sql = sql.replace(/\?/i, dataArray.shift());
        }
    }
    return sql;
}



const query = (sql, value) => {
    return new Promise((resolve, reject) => {
        pool.acquire(function (err, connection) {
            if (err) {
                return reject(err);
            }
            let request = new Request(sqlFormat(sql, value), function (err, rowCount) {
                if (err) {
                    console.error(err);
                    return reject(err);
                }
                // console.log('rowCount: ' + rowCount);
                connection.release();
            });
            request.on('row', function (columns) {
                return resolve(columns[0].value);
            });
            connection.execSql(request);
        });
    });
}

pool.query = query;
// console.log(pool)

module.exports = pool;


