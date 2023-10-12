const Pool = require("pg").Pool;


const pool = new Pool({
    user: 'postgres',
    password: 'test',
    host: 'localhost',
    port: 5433,
    database: 'perntodo'
});


module.exports = pool;
