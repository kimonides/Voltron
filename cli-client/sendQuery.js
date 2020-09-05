const { client } = require('./config.js');
const { errorHandler } = require('./errorHandler');

function sendQuery(query,format)
{
    client.query(query,(err,queryResult)=>
    {
        if(err) errorHandler(err);
        else if(!queryResult.rowCount) console.log('No Data');
        else{
            if(format=='csv') jsonToCsv(queryResult);
            else console.log(queryResult.rows);
        }
        client.end();
    })
}


function jsonToCsv(data)
{
    const { Parser } = require('json2csv');
    var fields = [];
    data.fields.forEach(field=>fields.push(field.name) );
    
    try {
        const parser = new Parser({fields});
        const csv = parser.parse(data.rows);
        console.log(csv);
    } catch (err) {
        console.error(err);
    }
    
}

module.exports = {sendQuery};