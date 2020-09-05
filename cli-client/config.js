const { Client } = require('pg');


var connectionString = "postgres://postgres:1234@localhost:5432/tl";

const client = new Client({ connectionString: connectionString });

client.connect()
    .then(() => { console.log('Connected to DB') })
    .catch((err) => { console.log(err); });

module.exports = { client };