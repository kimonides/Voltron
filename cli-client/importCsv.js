
function importCsv(filename, table) {
    const { client } = require('./config.js');
    const csv = require('csv-parser');
    const fs = require('fs');
    var i = 1;
    const query = {
        text: `INSERT INTO ` + table + ` 
        VALUES ` ,
        values: []
    }

    fs.createReadStream(filename)
        .pipe(csv({
            separator: ';'
        }))
        .on('data', (row) => {

            for (const index in row)
                query.values.push(row[index]);

            columns = Object.keys(row).length;

            query.text += '(';
            for (var j = i; j < i + columns; j++) {
                query.text += '$' + j;
                if (j == (i + columns - 1)) query.text += ')';
                else query.text += ',';
            }
            i = j;
            query.text += ',';
        })
        .on('end', () => {
            query.text = query.text.slice(0, -1);
            query.text += 'ON CONFLICT DO NOTHING'
            client.query(query, (err, res) => {
                if (err) throw err;
                csvRows = (i - 1) / columns;
                console.log('Imported: ' + res.rowCount + ' rows' + '(' + (csvRows - res.rowCount) + ' duplicate keys weren\'t imported)');
                client.query('select count(*) from actual_total_load;', (err, res) => {
                    if (err) throw err;
                    console.log('Total rows in DB: ' + res.rows[0]['count'] + ' rows');
                    disconnect(client);
                })
            })
        });
}