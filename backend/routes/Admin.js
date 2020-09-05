const router = require('express').Router();
const { client } = require('../database.js');
const { errorHandler } = require('../errorHandler');
const formidable = require('formidable');

router.route('/ActualTotalLoad').post((req,res) => {
    const token = req.headers['x-observatory-auth'];
    const form = new formidable.IncomingForm({
        uploadDir: __dirname + '/tmp', 
        keepExtensions: true
    });
    form.parse(req, function(err, fields, files) {
        if (err) 
        {
            console.log('some error', err);
        } 
        else if (!files.file) 
            console.log('no file received');
        else 
        {
            const filepath = files.file.path;
            importCsv(filepath,'actual_total_load',token,res);
        }
    });
});

router.route('/AggregatedGenerationPerType').post((req,res) => {
    const token = req.headers['x-observatory-auth'];
    const form = new formidable.IncomingForm({
        uploadDir: __dirname + '/tmp', 
        keepExtensions: true
    });
    form.parse(req, function(err, fields, files) {
        if (err) 
        {
            console.log('some error', err);
        } 
        else if (!files.file) 
            console.log('no file received');
        else 
        {
            const filepath = files.file.path;
            importCsv(filepath,'aggregated_generation_per_type',token,res);
        }
    });
});

router.route('/DayAheadTotalLoadForecast').post((req,res) => {
    const token = req.headers['x-observatory-auth'];
    const form = new formidable.IncomingForm({
        uploadDir: __dirname + '/tmp', 
        keepExtensions: true
    });
    form.parse(req, function(err, fields, files) {
        if (err) 
        {
            console.log('some error', err);
        } 
        else if (!files.file) 
            console.log('no file received');
        else 
        {
            const filepath = files.file.path;
            importCsv(filepath,'day_ahead_total_load_forecast',token,res);
        }
    });
});



router.route('/users/').post((req,res) => {
    const token = req.headers['x-observatory-auth'];
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const quota = req.body.requestsPerDayQuota;

    if(!username || !password || !email || !quota || password==='')
    {
        res.status(400).send('Arguments missing!');
        return;
    }
    const query = {
        text: 'select * from create_user($1,$2,$3,$4,$5)',
        values: [username, password, email, quota,token]
    }
    
    client.query(query,(err,queryResult)=>{
        if(err) errorHandler(err,res);
        else
            res.status(200).json( {username: username, password: password, email : email , quota:quota} );
    })

});

router.route('/users/:username').get((req,res) => {
    const token = req.headers['x-observatory-auth'];
    const query = {
        text : `select * from get_user($1,$2)`,
        values: [req.params.username,token]
    }
    client.query(query,(err,queryResult)=>{
        if (err){
            if(err.message == 'not admin') res.status(401).send('Not Admin');
            else throw err;
        }
        if(queryResult.rowCount==0) res.status(403).send('No data');
        else res.status(200).json(queryResult.rows);
    })
});

router.route('/users/:username').put((req,res) => {
    const token = req.headers['x-observatory-auth'];
    const username = req.params.username;
    const password = req.body.password;
    const email = req.body.email;
    const quota = req.body.requestsPerDayQuota;

    if(!username || !password || !email || !quota || password==='' )
    {
        res.status(400).send('Arguments missing!');
        return;
    }
    const query = {
        text : `select * from update_user($1,$2,$3,$4,$5)`,
        values: [username,password,email,quota,token]
    }
    client.query(query,(err,queryResult)=>{
        if (err){
            if(err.message == 'not admin') res.status(401).send('Not Admin');
            else errorHandler(err,res);
        }
        if(queryResult.rowCount==0) res.status(403).send('No data');
        else res.status(200).json(queryResult.rows);
    })
});


function importCsv(filepath,dataset,token,res)
{
    const fs = require('fs');
    const query = {
        text : `select * from import_csv($1,$2,$3)`,
        values : [dataset,filepath,token]
    };

    client.query(query,(err,queryResult)=>{
        if (err){
            if(err.message == 'not admin') res.status(401).send('Not Admin');
            else throw err;
        }
        else
            res.status(200).json( { totalRecordsInFile: queryResult.rows[0]['file_rows'], totalRecordsImported : queryResult.rows[0]['inserted'], totalRecordsInDatabase : queryResult.rows[0]['table_rows'] } );
    })
}




module.exports = router;