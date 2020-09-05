const { client } = require('./database.js');
const { errorHandler } = require('./errorHandler');

function sendQuery(query,res,format)
{
    client.query(query,(err,queryResult)=>
    {
        if(err) errorHandler(err,res);
        else if(!queryResult.rowCount) res.status(403).send('No Data');
        else{
            if(format=='csv') jsonToCsv(queryResult,res);
            else res.json(queryResult.rows);
        }
    })
}


function jsonToCsv(data,res)
{
    const { Parser } = require('json2csv');
    var fields = [];
    data.fields.forEach(field=>fields.push(field.name) );
    
    try {
        const parser = new Parser({fields});
        const csv = parser.parse(data.rows);
        res.contentType('text/csv');
        res.status(200).send(csv);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {sendQuery};