const { Client } = require('pg');
require('dotenv').config();

const client = new Client({connectionString: process.env.connection_string});

client.connect().then(()=>{
    console.log('Database is up');
})
.catch((err)=>{
    console.log(err);
});

module.exports = {client};